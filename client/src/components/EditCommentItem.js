import React, {useState} from 'react';
import { editComment } from '../actions/comment_actions'
import { useDispatch } from 'react-redux';

export const EditCommentItem = (props) =>{
    const initialState = {id: props.commentId, comment:''}
    const[newComment, setNewComment] = useState(initialState);
    const dispatch = useDispatch();

    const handleChange = (e) =>{
        setNewComment({...newComment, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(editComment(props.commentId, newComment))
    }

    return(
    <div className="d-flex justify-content-center mb-3">
        <form onSubmit={handleSubmit}>
            <input type="text" name="comment" defaultValue={props.comment} onChange={handleChange}/>
            <button className="btn btn-success">Edit Comment</button>
        </form>
    </div>
    );
}