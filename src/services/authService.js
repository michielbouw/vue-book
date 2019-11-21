import { auth } from '../firebase';

const isLoggedIn = () => !!auth.currentUser;

const getCurrentUser = () => {
  const currentUser = auth.currentUser;
  return {
    id: currentUser.uid,
    displayName: currentUser.displayName || currentUser.email,
    email: currentUser.email,
  };
};

const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const signOut = () => auth.signOut();

export { signUp, signIn, signOut, isLoggedIn, getCurrentUser };
