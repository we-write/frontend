export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  companyName: string;
}
export type SignUpRequest = Omit<SignUpFormData, 'passwordCheck'>;

//TODO: 병합 후 수정
export interface SigninRequest {
  email: string;
  password: string;
}
