import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../actions/user_actions';
import { useForm, Controller } from 'react-hook-form';
import { updateCurrentUser } from '../../actions/user_actions';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Container, CssBaseline, Grid, makeStyles } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';

export const UserProfileItem = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const initialState = { name: '', email: '', phoneNumber: '', birthDay: '' };
  const classes = useStyle();

  const [userData, setUserData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const { register, handleSubmit, control } = useForm();

  useEffect(() => {
    getUser();
  }, [isEdit]);

  const getUser = async () => {
    await getCurrentUser(user?.result?.id).then((result) => {
      setUserData({ ...result });
    });
  };

  const switchState = () => {
    setIsEdit((prevSate) => !prevSate);
  };

  const onSubmit = async (e) => {
    const updatedUser = {
      name: e.firstName + ' ' + e.lastName,
      birthday: e.birthday || userData.birthDay,
      email: e.email,
      phoneNumber: e.phoneNumber,
    };

    await updateCurrentUser(user.result.id, updatedUser).then((res) => {
      user.result.name = updatedUser.name;
      localStorage.setItem('profile', JSON.stringify(user));
    });

    setTimeout(() => {
      switchState();
    }, 1000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <AccountCircleIcon className={classes.profileIcon} color="secondary" />

      <CssBaseline />
      <div className={classes.paper}>
        {(!isEdit && (
          <div>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography> Hello {userData.name} </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <PhoneIcon fontSize="large" />:{userData.phoneNumber}{' '}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  <EmailIcon fontSize="large" />: {userData.email}{' '}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  {' '}
                  <CakeIcon fontSize="large" />: {userData.birthDay}{' '}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )) || (
          <>
            <div>
              <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="firstName"
                      control={control}
                      defaultValue={userData.name.substr(0, userData.name.indexOf(' '))}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          variant="outlined"
                          name="firstName"
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
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="lastName"
                      control={control}
                      defaultValue={userData.name.substr(userData.name.indexOf(' ') + 1)}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          variant="outlined"
                          name="lastName"
                          label="Your Last Name"
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      )}
                      rules={{
                        minLength: { value: 3, message: 'Last name must contain 3 characters' },
                        required: { value: true, message: 'This field is requiered' },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={userData.email}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                          variant="outlined"
                          label="Email"
                          type="email"
                          fullWidth
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
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="date"
                      name="birthday"
                      label="Birthday"
                      type="date"
                      defaultValue={userData.birthDay}
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      {...register('birthday', {})}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="phoneNumber"
                      control={control}
                      defaultValue={userData.phoneNumber}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <MuiPhoneNumber
                          name="phoneNumber"
                          onChange={onChange}
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          defaultCountry={'ro'}
                          fullWidth
                          variant="outlined"
                        />
                      )}
                      rules={{
                        minLength: {
                          value: 10,
                          message: 'Phone number must contain at least 10 characters',
                        },
                        required: { message: 'Phone number is requiered' },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      className={classes.submit}
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </>
        )}
      </div>

      <Button variant="contained" color="secondary" onClick={switchState}>
        {(!isEdit && 'Edit Your data') || 'Cancel Edit'}
      </Button>
    </Container>
  );
};

const useStyle = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  profileIcon: {
    fontSize: 50,
    marginTop: theme.spacing(3),
  },
}));
