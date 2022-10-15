type IHttpResponse<Response> = Response | Error

export interface IControllerCommand<HttpRequest, HttpResponse> {
    handle(request: HttpRequest): Promise<IHttpResponse<HttpResponse>>
}