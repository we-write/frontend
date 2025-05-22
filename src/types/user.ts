export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  companyName: string;
}
export type SignUpRequest = Omit<SignUpFormData, 'passwordCheck'>;

//TODO: 병합 후 수정
export interface SignInFormData {
  email: string;
  password: string;
}
