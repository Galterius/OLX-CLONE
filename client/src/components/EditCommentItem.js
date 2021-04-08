import React, {useState} from 'react';
import { useListingStore } from '../store/ListingContext'

export const EditCommentItem = (props) =>{
    const initialItem = {commentId: props.commentId, comment: ''}
    const initialState = {commentId: '', comment:''}

    const[editedComment, setEditedComment] = useState(initialState);

    const [commentItem, setCommentItem] = useState(initialItem);
    const listingStore = useListingStore();

    const handleChange = (e) =>{
        setCommentItem({...commentItem, [e.target.name]: e.target.value})
    }

    const handleCommentEditSubmit = (e) =>{
        e.preventDefault();
        //editComment(editedComment?.commentId, editedComment)
        listingStore.updateComment(commentItem)
        
        props.switchMode();
    }

    return(
        <div className="d-flex justify-content-center mb-3">
            <form onSubmit={handleCommentEditSubmit}>
                <input type="text" name="comment" defaultValue={props.comment} onChange={handleChange}/>
                <button className="btn btn-success">Edit Comment</button>
            </form>
        </div>
    );
}