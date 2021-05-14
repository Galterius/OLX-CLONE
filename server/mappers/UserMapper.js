exports.authenticationMapper = (userData) => {
  return { id: userData._id, email: userData.email, name: userData.name };
};

exports.tokenMapper = (userData) => {
  return { email: userData.email, id: userData._id };
};

exports.userDataMapper = (userData) => {
  return {
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    birthDay: userData.birthday,
  };
};
