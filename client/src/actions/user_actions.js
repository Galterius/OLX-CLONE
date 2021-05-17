import * as api from '../api/index';

export const getCurrentUser = async (id) => {
  try {
    const { data } = await api.getUser(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCurrentUser = async (id, updatedUser) => {
  try {
    const { data } = await api.updatedUser(id, updatedUser);
    return data;
  } catch (error) {
    console.log(error);
  }
};
