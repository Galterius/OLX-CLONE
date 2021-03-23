import React, {useState} from 'react'
import { EditCommentItem } from './EditCommentItem'

export const CommentItem = (props) => {
    return(
        <div>
            
            <div className="d-flex justify-content-center mb-3" key={props.comment._id}>
                <div className="card" style={{width: 18 + 'rem'}}>
                    <div className="card-body">
                        {props.isEdit && (
                            <EditCommentItem
                                editedComment={props.editedComment}
                                onChange={props.onChange}
                                handleCommentEditSubmit={props.handleCommentEditSubmit} 
                                comment={props.comment.comment} 
                                commentId={props.comment._id}
                            />
                        )}
                        {!props.isEdit && (
                            <>
                                <h6 className="card-subtitle mb-2 text-muted">{props.comment.author.commenterName}</h6>
                                <p className="card-text">{props.comment.comment}</p>
                            </> 
                        )}

                    {(props.user?.result?.googleId === props.comment.author.commenterId || props.user?.result?._id === props.comment.author.commenterId) && (
                        <div> 
                            <button className="card-link btn btn-primary" onClick={props.switchMode}>{props.isEdit ? 'Cancel Edit': 'Edit Comment'}</button>
                            <button className="card-link btn btn-danger" value={props.comment._id} onClick={props.handleDeleteComment}>Delet</button>
                        </div>
                    )}    
                    </div>
                </div>
            </div>
        </div>
    )
}
