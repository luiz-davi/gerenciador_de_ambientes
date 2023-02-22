export class ApiError extends Error {
  public readonly status_code: number;
  constructor(message, status_code){
    super(message)

    this.status_code = status_code;
  }
}

export class BadRequestError extends ApiError {
  constructor(message){
    super(message, 400);
  }
}

export class NotFoundError extends ApiError {
  constructor(message){
    super(message, 402);
  }
}

export class NotAuthrizedError extends ApiError {
  constructor(message){
    super(message, 401);
  }
}