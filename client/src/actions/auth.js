import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

import { authReducer } from '../reducer/auth'

export const signin = async (formData, history) => {
  try {
    const { data } = await api.singIn(formData);

    const action = {
      type: AUTH
    }

    authReducer(data, action)

    history.push('/listings');

  } catch (error) {
    console.log(error);
  }
};

export const signup = async (formData, history) => {
  try {
    const { data } = await api.singUp(formData);

    const action = {
      type: AUTH
    }

    authReducer(data, action)

    history.push('/listings');
  } catch (error) {
    console.log(error);
  }
};

export const googleSignIn = async(authData, history) =>{
  try {
    
    const { data } = await api.googleSignIn(authData, history)
    const action = {
      type: AUTH
    }

    authReducer(data, action)

    history.push('/listings');
  } catch (error) {
    console.log(error)
  }
}
