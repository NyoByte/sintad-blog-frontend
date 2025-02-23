export type ApiResponseModel<T> = {
    timestamp: Date,
    error: boolean
    code: number,
    message: String,
    data: T
}