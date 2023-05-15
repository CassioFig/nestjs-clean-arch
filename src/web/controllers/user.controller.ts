import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Inject, Post, Body, HttpException, HttpStatus } from "@nestjs/common";
import { UseCaseProxy } from "@main/factories/application/use-case-proxy";
import { ApplicationModule } from "@main/factories/application";
import { UserInputModel } from "@shared/inputModels";
import { UserViewModel } from "@shared/viewModels";
import { ValidationError } from "@domain/errors";
import { UseCase } from "@application/use-case";

@ApiTags('user')
@Controller('api/v1/user')
@ApiBadRequestResponse({ description: 'Validation Error' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class UserController {
    constructor(
        @Inject(ApplicationModule.CREATE_USER_PROXY)
        private readonly _createUserProxy: UseCaseProxy<UseCase<UserInputModel, UserViewModel>>
    ) {}

    @Post()
    @ApiBody({ type: UserInputModel })
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ description: 'User created', type: UserViewModel })
    async handleCreateUser(@Body() request: UserInputModel): Promise<UserViewModel | Error> {
        try {
            const userCreated = await this._createUserProxy.getInstance().run(request)
            return userCreated
        } catch (error) {
            if (error instanceof ValidationError) throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException('Error on user create', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}