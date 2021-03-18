import { combineReducers } from 'redux'; 
import auth from './auth'
import listings from './listings'
import oneListing from './onelisting.js'

export const reducers =  combineReducers({auth, listings, oneListing})