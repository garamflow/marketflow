export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 16;

export const INPUT_EMPTY_ERROR = "값이 비어있습니다.";
export const EMAIL_TYPE_ERROR = "이메일 형식을 올바르게 입력해주세요.";

export const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,16}$/);
export const PASSWORD_TYPE_ERROR = "비밀번호 형식을 올바르게 입력해주세요.";
export const PASSWORD_LENGTH_ERROR = "비밀번호는 8~16자로 입력해주세요.";
export const PASSWORD_REGEX_ERROR = "비밀번호는 소문자, 대문자, 숫자, 특수문자를 최소 하나씩 포함해야합니다.";
