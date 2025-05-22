export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  companyName: string;
}
export type SignUpRequest = Omit<SignUpFormData, 'passwordCheck'>;
