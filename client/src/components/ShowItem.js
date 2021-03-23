import React from 'react'
import { Link } from 'react-router-dom';
import { CommentItem } from './CommentItem'

export const ShowItem = (props) =>{
    const user = JSON.parse(localStorage.getItem('profile'))
    

    return(
        <div>
            <h3 >{props.listing.title}</h3>
            <img alt ="" src={props.listing.image} />
            <p>{props.listing.description}</p>

            {(user?.result?.googleId === props.listing?.creator || user?.result?._id === props.listing?.creator) && (
            <div>
                <button className="btn btn-danger" onClick={props.handleDeleteClick}>Delete listing</button>
                <Link to={{
                    pathname: `/listing/edit/${props.listing._id}`,
                    state: props.listing
                }}>
                    <p className="btn btn-warning">Edit</p>
                </Link>
            </div>
            )}

            <div className="d-flex justify-content-center mb-3">
                <form onSubmit={props.handleSubmit}>
                    <input type="text" name="comment" placeholder="Ask Something..." onChange={props.handleChange}/>
                    <button className="btn btn-success">Add Comment</button>
                </form>
            </div>
            {props.listing?.comments?.map(comment =>
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    switchMode={props.switchMode}
                    isEdit={props.isEdit}
                    handleCommentEditSubmit={props.handleCommentEditSubmit}
                    editedComment={props.editedComment}
                    onChange={props.onChange}
                    user={user} 
                    handleDeleteComment={props.handleDeleteComment}
                    listingCreator={props?.listing?.creator}
                />
            )}
        </div>
    )
};