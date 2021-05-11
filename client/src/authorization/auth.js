export const logIn = (data = { authData: null }) => {
  //storing it in the local storage so even if we refresh the browser will not log us out
  localStorage.setItem('profile', JSON.stringify({ ...data }));
  return { ...data, authData: data };
};

export const logOut = (data = { authData: null }) => {
  localStorage.clear();
  return { ...data, authData: null };
};
