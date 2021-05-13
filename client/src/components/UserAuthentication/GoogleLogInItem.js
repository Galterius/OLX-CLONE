import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';

export const GoogleLogIn = (props) => {
  return (
    <div>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_CLIENT_ID}`}
        render={(renderProps) => (
          <Button fullWidth variant="contained" color="secondary" onClick={renderProps.onClick}>
            Google Sign In
          </Button>
        )}
        onSuccess={props.googleSuccess}
        onFailure={props.googleFailure}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};
