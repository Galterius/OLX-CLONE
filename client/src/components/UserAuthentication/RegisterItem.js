import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { GoogleLogIn } from './GoogleLogInItem';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = (props) => {
  const classes = useStyles();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (e) => {
    e.name = e.firstName + ' ' + e.lastName;
    const registrationData = {
      name: e.name,
      email: e.email,
      password: e.password,
    };

    props.setFormData({ ...registrationData });
    props.submitForm();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                )}
                rules={{ required: 'Sorry but First Name is requiered' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                )}
                rules={{ required: 'Sorry but Last Name is requiered' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                )}
                rules={{ required: 'Sorry but Email is requiered' }}
              />
            </Grid>
            {/* <TextField
              id="date"
              name="birthday"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              fullWidth
              required
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              {...register('birthday', {
                required: true,
              })}
            /> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="none"
                {...register('password', {
                  required: true,
                  minLength: { value: 8, message: 'Password must have at least 8 characters' },
                })}
              />
              {errors.password && errors.password.type === 'required' && (
                <Typography color="error">Password is required</Typography>
              )}
              {errors.password && <Typography color="error">{errors.password.message}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="conf-password"
                label="Confirm Password"
                type="password"
                id="conf_password"
                autoComplete="none"
                {...register('conf_password', {
                  required: true,
                  validate: (value) => value === password.current || "The passwords don't match",
                })}
              />
              {errors.conf_password && errors.conf_password.type === 'required' && (
                <Typography color="error">Password confirmation is required</Typography>
              )}
              {errors.conf_password && (
                <Typography color="error">{errors.conf_password.message}</Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>

          <GoogleLogIn googleSuccess={props.googleSuccess} googleFailure={props.googleFailure} />

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={props.switchMode}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
