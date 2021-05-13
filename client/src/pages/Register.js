import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
            <SignUp
              setFormData={setFormData}
              formData={formData}
              submitForm={handleSubmit}
              switchMode={switchMode}
              googleSuccess={googleSuccess}
              googleFailure={googleFailure}
            />
          </>
        )) || (
          <>
            <SignIn
              setFormData={setFormData}
              formData={formData}
              submitForm={handleSubmit}
              setHandleError={setHandleError}
              handleError={handleError}
              switchMode={switchMode}
              googleSuccess={googleSuccess}
              googleFailure={googleFailure}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
