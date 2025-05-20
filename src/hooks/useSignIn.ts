import { useState } from 'react';

export const useSignIn = (initialValue: boolean = false) => {
  const [isSignIn, setIsSignIn] = useState(initialValue);

  const signIn = () => setIsSignIn(true);
  const signOut = () => setIsSignIn(false);
  const toggleSignIn = () => setIsSignIn((prev) => !prev);

  return { isSignIn, signIn, signOut, toggleSignIn };
};
