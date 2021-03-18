import { FETCH_ALL,FETCH_ONE ,CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api/index';

export const getListing = () => async(dispatch) =>{
    try {
        const { data } = await api.fetchListings();

        dispatch({
            type: FETCH_ALL,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const getOneListing = (id) => async dispatch =>{
    try {
        const { data } = await api.fetchOneListing(id)
        dispatch({
            type: FETCH_ONE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const createListing = (formData, history) => async (dispatch) =>{
    try {
        const { data } = await api.newListing(formData);

        dispatch({
            type: CREATE, 
            payload: data
        })

        history.push('/listings');
    } catch (error) {
        console.log(error)
    }
}

export const deleteListing=(id, listingCreator, history) =>async (dispatch) =>{
    try {
        console.log(listingCreator)
        await api.deleteListing(id, listingCreator);
        dispatch({
            type: DELETE,
            payload: id
        })

        history.push('/listings')
    } catch (error) {
        console.log(error)
    }
}

export const editListing = (id, listing, history, listingCreator) => async (dispatch) =>{
    try {
        const { data } = await api.editListing(id, listing, listingCreator);

        dispatch({
            type: UPDATE,
            payload: data
        });

        history.push('/listings');
    } catch (error) {
        console.log(error)
    }
}