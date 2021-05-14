import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../actions/user_actions';
import { useForm, Controller } from 'react-hook-form';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

/* TODO: Get the currently logged in user's updatabel data {name, email, birthday, phoneNumber}*/
export const UserProfileItem = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const initialState = { name: '', email: '', phoneNumber: '', birthDay: '' };

  const [userData, setUserData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, control } = useForm();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await getCurrentUser(user?.result?.id).then((result) => {
      setUserData({ ...result });
    });
  };

  const switchState = () => {
    setIsEdit((prevSate) => !prevSate);
  };

  const onSubmit = (e) => {
    const updatedUser = {
      name: e.name,
      birthday: e.birthday,
      email: e.email,
      phoneNumber: e.phoneNumber,
    };

    console.log(updatedUser);
  };

  return (
    <div>
      {(!isEdit && (
        <div>
          <Typography> Hello {userData.name} </Typography>
          <Typography> Phone Number: {userData.phoneNumber} </Typography>
          <Typography> Email: {userData.email} </Typography>
          <Typography> Birth Day: {userData.birthDay} </Typography>
        </div>
      )) || (
        <>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue={userData.name}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  name="name"
                  label="Your Name"
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                minLength: { value: 3, message: 'Name must contain 3 characters' },
                required: { value: true, message: 'Name field is requiered' },
              }}
            />

            <Controller
              name="email"
              control={control}
              defaultValue={userData.email}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  onChange={onChange}
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              )}
              rules={{
                required: { value: true, message: 'Email field is requiered' },
              }}
            />

            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </>
      )}

      <Button variant="contained" color="secondary" onClick={switchState}>
        {(!isEdit && 'Edit Your data') || 'Cancel Edit'}
      </Button>
    </div>
  );
};
