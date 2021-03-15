import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api/index';

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