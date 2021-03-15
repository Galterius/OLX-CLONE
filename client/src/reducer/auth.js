import {AUTH, LOGOUT} from '../constants/actionTypes';

//reducers are  function that accept a state and an action
const authReducer = (state = {authData: null}, action)=> {
    switch (action.type) {
        case AUTH:
            //storing it in the local storage so even if we refresh the browser will not log us out
            localStorage.setItem('profile', JSON.stringify({...action?.data }));
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, authData: null};
        default:
            return state;
    }
};

export default authReducer;