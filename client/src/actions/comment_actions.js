import { FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api/index';

export const createComment = (listingId, comment) => async (dispatch) =>{
    try {
        const { data } = await api.createComment(listingId, comment);
        dispatch({
            type: CREATE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const { data } = await api.deleteComment(commentId)
        dispatch({
            type: DELETE,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}