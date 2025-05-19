export interface FormData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
  companyName: string;
}
export type SignUpRequest = Omit<FormData, 'passwordCheck'>;
