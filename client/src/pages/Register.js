import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signup, signin, googleSignIn } from '../actions/auth';
import { RegisterItem } from '../components/UserAuthentication/RegisterItem';
import { LoginItem } from '../components/UserAuthentication/LoginItem';

function Register() {
  const [isSignup, setIsSignup] = useState(false);
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

  return (
    <div className="row">
      <div className="col-6 offset-3">
        {(isSignup && (
          <>
            <RegisterItem
              switchMode={switchMode}
              googleSuccess={googleSuccess}
              googleFailure={googleFailure}
            />
          </>
        )) || (
          <>
            <LoginItem
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
