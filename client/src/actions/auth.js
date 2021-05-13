import * as api from '../api/index';

import { logIn } from '../authorization/auth';

export const signin = async (formData, history) => {
  try {
    const { data } = await api.singIn(formData);

    logIn(data);

    history.push('/listings');
  } catch (error) {
    return error;
  }
};

export const signup = async (formData, history) => {
  try {
    console.log(formData);
    const { data } = await api.singUp(formData);

    logIn(data);

    history.push('/listings');
  } catch (error) {
    console.log(error);
  }
};

export const googleSignIn = async (authData, history) => {
  try {
    const { data } = await api.googleSignIn(authData, history);

    logIn(data);

    history.push('/listings');
  } catch (error) {
    console.log(error);
  }
};
