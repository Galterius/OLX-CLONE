import React, {useState} from 'react'
import { EditCommentItem } from './EditCommentItem'
import { useObserver } from 'mobx-react-lite';
import { useListingStore } from '../store/ListingContext'
import { deleteComment } from '../actions/comment_actions'



export const CommentItem = (props) => {
    const listingStore = useListingStore();
    const [isEdit, setIsEdit] = useState(false);

    const switchMode = () => {
        setIsEdit((prevIsEdit) => !prevIsEdit)
    }

    const handleDeleteComment = async (e) =>{
        e.preventDefault();
        const commentId = e.target.value;
        console.log("deleted Comment")
        listingStore.deleteComment(commentId)
        deleteComment(commentId);
        
    }

    return useObserver(()=>(
        <div>
            
            <div className="d-flex justify-content-center mb-3" key={props.comment._id}>
                <div className="card" style={{width: 18 + 'rem'}}>
                    <div className="card-body">
                        {isEdit && (
                            <EditCommentItem
                                switchMode={switchMode}
                                comment={props.comment.comment}
                                commentId={props.comment._id}
                            />
                        )}
                        {!isEdit && (
                            <>
                                <h6 className="card-subtitle mb-2 text-muted">{props.comment.author.commenterName}</h6>
                                <p className="card-text">{props.comment.comment}</p>
                            </> 
                        )}

                    {(props.user?.result?._id === props.comment.author.commenterId) && (
                        <div> 
                            <button className="card-link btn btn-primary" onClick={switchMode}>{isEdit ? 'Cancel Edit': 'Edit Comment'}</button>
                            <button className="card-link btn btn-danger" value={props.comment._id} onClick={handleDeleteComment}>Delet</button>
                        </div>
                    )}    
                    </div>
                </div>
            </div>
        </div>
    ));
}
