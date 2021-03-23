import React from 'react';

export const EditCommentItem = (props) =>{
    const initialItem = {commentId: props.commentId, comment: ''}
    const handleChange = (e) =>{
        props.onChange({ ...initialItem, [e.target.name]: e.target.value})
    }

    return(
        <div className="d-flex justify-content-center mb-3">
            <form onSubmit={props.handleCommentEditSubmit}>
                <input type="text" name="comment" defaultValue={props.comment} onChange={handleChange}/>
                <button className="btn btn-success">Edit Comment</button>
            </form>
        </div>
    );
}