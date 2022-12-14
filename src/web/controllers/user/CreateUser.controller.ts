import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { UserInputModel } from "src/common/inputModels";
import { UserViewModel } from "src/common/viewModels";
import { IControllerCommand } from "@web/interfaces";
import { IServiceCommand } from "@domain/interfaces";
import { CreateUser } from "@application/services";
import { ValidationError } from "@domain/errors";

type HttpRequest  = CreateUser.Input
type HttpResponse = CreateUser.Output

@ApiTags('User')
@Controller('api/v1/user')
export class CreateUserController implements IControllerCommand<HttpRequest, HttpResponse> {

    constructor (
        @Inject('createUser') private readonly createUser : IServiceCommand<CreateUser.Input, CreateUser.Output>
    ) {}

    @Post()
    @ApiBody({ type: UserInputModel })
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({ description: 'User created', type: UserViewModel })
    @ApiBadRequestResponse({ description: 'Validation Error' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async handle(@Body() request: UserInputModel): Promise<HttpResponse | Error> {
        try {
            const userCreated = await this.createUser.execute(request)
            return userCreated
        } catch (error) {
            if (error instanceof ValidationError) throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException('Error on user create', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}