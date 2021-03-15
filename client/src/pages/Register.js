import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import {signup, signin} from '../actions/auth'

const initialState = {name: '', email: '', password: ''}

function Register(){
    const [formData, setFormData] = useState(initialState)

    const[isSignup, setIsSignup] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const switchMode = () =>{
        setIsSignup((prevIsSignup)=> !prevIsSignup)
    }

    const googleSuccess = async (res) =>{
        
        //if we use ?. we will not get an error if res doesn't exits
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token} });
            history.push('/listings')
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (err) =>{
        console.log(err)
        console.log("Google Sign Error")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)

        if(isSignup){
            dispatch(signup(formData, history))
        }else{
            dispatch(signin(formData, history))
        }

        // console.log(formData);
    }

    const handleChange = (e) => {
        //destracture the formData so we those where the target.name matches the key in the object
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return(
        <div className="row">
            <div className="col-6 offset-3">
            <h3 className="text-center">{isSignup ? 'Register' : 'Sign In'}</h3>
            <form noValidate className="validated-form" onSubmit={handleSubmit}>
            
            {isSignup && (
                <>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Username</label>
                    <input className="form-control" type="text" name="name" required onChange={handleChange}/>
                </div>
                </>
            )}

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input  className="form-control" type="email" name="email" required onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input  className="form-control" type="password" name="password" required onChange={handleChange}/>
            </div>

            <button className="btn btn-success">{isSignup ? 'Register' : 'Log in'}</button>
            </form>
            
            <button className="btn btn-primary" onClick={switchMode}>{isSignup ? 'Do you have an account? Sign in' : "Don't have an account? Sign up"}</button>

            <GoogleLogin 
                clientId="824685970461-680qv5dt21iv3tt1met6qosikr0so1in.apps.googleusercontent.com"
                render={(renderProps) => (
                    <button className="btn btn-warning" onClick={renderProps.onClick}>Google Sign In</button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />
            </div>
        </div>
        
    )
}

export default Register;