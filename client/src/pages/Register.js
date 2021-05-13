import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { signup, signin, googleSignIn } from '../actions/auth';
import { SignUp } from '../components/UserAuthentication/RegisterItem';
import { SignIn } from '../components/UserAuthentication/LoginItem';

const initialState = { name: '', email: '', password: '' };

function Register() {
  const [formData, setFormData] = useState(initialState);

  const [isSignup, setIsSignup] = useState(false);
  const [handleError, setHandleError] = useState('');
  const history = useHistory();

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const googleSuccess = async (res) => {
    const token = res?.tokenId;

    try {
      googleSignIn(token, history);
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log('Google Sign Error');
  };

  const handleSubmit = async (e) => {
    if (isSignup) {
      signup(formData, history);
    } else {
      const result = await signin(formData, history);
      if (result?.toString()?.includes('Error')) {
        setHandleError('Error');
      }
    }
  };

  return (
    <div className="row">
      <div className="col-6 offset-3">
        {(isSignup && (
          <>
            <SignUp setFormData={setFormData} formData={formData} submitForm={handleSubmit} />
          </>
        )) || (
          <>
            <SignIn
              setFormData={setFormData}
              formData={formData}
              submitForm={handleSubmit}
              setHandleError={setHandleError}
              handleError={handleError}
            />
          </>
        )}

        <button className="btn btn-primary" onClick={switchMode}>
          {isSignup ? 'Do you have an account? Sign in' : "Don't have an account? Sign up"}
        </button>

        <GoogleLogin
          clientId="824685970461-680qv5dt21iv3tt1met6qosikr0so1in.apps.googleusercontent.com"
          render={(renderProps) => (
            <button className="btn btn-warning" onClick={renderProps.onClick}>
              Google Sign In
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
}

export default Register;
