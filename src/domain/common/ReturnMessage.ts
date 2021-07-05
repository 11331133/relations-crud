export type SuccessMessage = {
  status: 'success';
  data: object;
};

export type FailMessage = {
  status: 'fail';
  code: Code;
  reason: string;
};

export enum Code {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  NOT_ALLOWED = 405,
}

export enum Status {
  success = 'success',
  fail = 'fail',
}

export function successMessage(data?: object) {
  return {
    status: Status.success,
    data,
  };
}

export function failMessage(code: Code) {
  return {
    status: Status.fail,
    code,
  };
}
