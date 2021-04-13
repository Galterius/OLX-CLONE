import {AUTH, LOGOUT} from '../constants/actionTypes';


export const authReducer = (data = {authData: null}, action)=> {
    switch (action.type) {
        case AUTH:
            //storing it in the local storage so even if we refresh the browser will not log us out
            localStorage.setItem('profile', JSON.stringify({...data}));
            return {...data, authData: data};
            
        case LOGOUT:
            localStorage.clear();
            return {...data, authData: null};
        default:
            return data;
    }
};

export default authReducer;