import React, {useState} from 'react';
import { useListingStore } from '../store/ListingContext'
import { useObserver } from 'mobx-react-lite';
import { editComment} from '../actions/comment_actions'

import { toJS } from 'mobx';

export const EditCommentItem = (props) =>{
    const initialItem = {commentId: props.commentId, comment: ''};
    const [commentItem, setCommentItem] = useState(initialItem);
    const listingStore = useListingStore();

    const handleChange = (e) =>{
        setCommentItem({...commentItem, [e.target.name]: e.target.value})
    }

    const handleCommentEditSubmit = async (e) =>{
        e.preventDefault();
        await editComment(commentItem?.commentId, commentItem)
        listingStore.updateComment(commentItem)
        props.switchMode();
    }

    return useObserver(()=>(
        <div className="d-flex justify-content-center mb-3">
            <form onSubmit={handleCommentEditSubmit}>
                <input type="text" name="comment" defaultValue={props.comment} onChange={handleChange}/>
                <button className="btn btn-success">Edit Comment</button>
            </form>
        </div>
    ));
}