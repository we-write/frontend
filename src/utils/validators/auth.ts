import { SigninRequest, SignUpFormData } from '@/api/auth/type';
import { AuthValidateProps } from './type';

export const signUpValidate = ({
  value,
  name,
  password,
}: AuthValidateProps<SignUpFormData>) => {
  switch (name) {
    case 'email':
      return emailValidation(value);
    case 'password':
      return passwordValidation(value);
    case 'passwordCheck':
      return passwordCheckValidation(value, password ?? '');
    case 'name':
      return nameValidation(value);
    case 'companyName':
      return favoriteValidation(value);
  }
};

const emailValidation = (email: string): string | true => {
  if (!email) {
    return '이메일을 입력해주세요';
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return '이메일 형식이 올바르지 않습니다';
  }
  return true;
};

const passwordValidation = (password: string): string | true => {
  if (!password) {
    return '비밀번호를 입력해주세요';
  }
  if (password.length < 8) {
    return '비밀번호는 8자 이상이 되도록 해 주세요';
  }
  if (!/^[^\s]{8,}$/.test(password)) {
    return '비밀번호는 숫자와 문자로 이루어진 8자 이상이 되도록 해 주세요';
  }
  return true;
};

const passwordCheckValidation = (
  passwordCheck: string,
  password: string
): string | true => {
  if (!passwordCheck) {
    return '비밀번호를 다시 한 번 입력해주세요';
  }
  if (passwordCheck !== password) {
    return '비밀번호가 일치하지 않습니다';
  }
  return true;
};

const nameValidation = (name: string): string | true => {
  if (!name) {
    return '닉네임을 입력해주세요';
  }
  return true;
};

const favoriteValidation = (favorite: string): string | true => {
  if (!favorite) {
    return '좋아하는 작품을 입력해주세요';
  }
  return true;
};

export const signInValidate = ({
  value,
  name,
}: AuthValidateProps<SigninRequest>) => {
  switch (name) {
    case 'email':
      return emailValidation(value);
    case 'password':
      return passwordValidation(value);
  }
};
