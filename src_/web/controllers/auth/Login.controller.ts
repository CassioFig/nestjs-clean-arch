import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { LoginInputModel } from "@shared/inputModels";
import { IControllerCommand } from "@web/interfaces";
import { IServiceCommand } from "@domain/interfaces";
import { LoginViewModel } from "@shared/viewModels";
import { ValidationError } from "@domain/errors";
import { Login } from "@application/services";

type HttpRequest  = Login.Input
type HttpResponse = Login.Output

@ApiTags('Auth')
@Controller('api/v1/login')
export class LoginController implements IControllerCommand<HttpRequest, HttpResponse> {
    constructor (
        @Inject('login') private readonly login : IServiceCommand<Login.Input, Login.Output>
    ) {}

    @Post()
    @ApiBody({ type: LoginInputModel })
    @ApiOperation({ summary: 'Login' })
    @ApiOkResponse({ description: 'Login success', type: LoginViewModel })
    @ApiBadRequestResponse({ description: 'Validation Error' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    async handle(@Body() request: HttpRequest): Promise<HttpResponse | Error> {
        try {
            return await this.login.execute(request)
        } catch (error) {
            if (error instanceof ValidationError) throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
            throw new HttpException('Error on login', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}