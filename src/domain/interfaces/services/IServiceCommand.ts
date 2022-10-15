export interface IServiceCommand<Input, Output> {
    execute (...args: Input[]): Promise<Output>
}