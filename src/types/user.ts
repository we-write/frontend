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
export interface MyInfoResponse {
  id: number;
  name: string;
  email: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}
export interface UserRequest {
  image?: File | null;
  companyName: string;
}
