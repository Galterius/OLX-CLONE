import React, { useState, useEffect } from 'react';
import '../App.css'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { authReducer } from '../reducer/auth'
import decod from 'jwt-decode'
import { LOGOUT } from '../constants/actionTypes';

function NavigationBar() {
  const history = useHistory();
  const location = useLocation();

  const navStyle ={
    color: 'white'
  };

  //getting the user from the local storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // console.log(user)

  useEffect( ()=>{
    //cheking if the token exists and if so then set the token const
    const token = user?.token;

    if(token)
    {

      //if the token is expired we log out the user automatically
      const decodedToken = decod(token);

      if(decodedToken.exp * 1000 < new Date().getTime())
      {
        logout();
      }

    }

    //JWT
    setUser(JSON.parse(localStorage.getItem('profile')));
    
  }, [location]);//when the location changes we set the user so it will update the navbar

  const logout = () =>{

    const action = {
      type: LOGOUT
    }

    authReducer(undefined, action)

    history.push('/listings')
    setUser(null);
  }

  return (
    <nav>
      <h3>Sell it</h3>
      <ul className="nav-links">
      <Link style={navStyle} to="/about">
        <li>About</li>
      </Link>
      <Link style={navStyle} to="/listings">
        <li>Listings</li>
      </Link>
      <Link style={navStyle} to="/addlisting">
        <li>New Listing</li>
      </Link>
      </ul>
      {user ? (
        <div>
          <li>{user.result.name}</li>
          <button onClick={logout}>Log out</button>
        </div>  
      ):(
        <Link style={navStyle} to="/register">
          <li>Sign in</li>
        </Link>
      )}

    </nav>
  );
}

export default NavigationBar;