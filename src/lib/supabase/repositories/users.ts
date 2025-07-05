import { SignUpRequest } from '@/api/auth/type';
import instanceBaaS from '@/api/instanceBaaS';

export const createUser = async (user: SignUpRequest) => {
  const { data, error } = await instanceBaaS.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
        favorite: user.favorite,
      },
    },
  });
  await instanceBaaS.from('users').insert({
    email: user.email,
    name: user.name,
    favorite: user.favorite,
    image: null,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
