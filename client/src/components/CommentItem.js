import React from 'react'

export const CommentItem = (props) => {

    return(
        <div>
            
            <div className="d-flex justify-content-center mb-3" key={props.comment._id}>
                <div className="card" style={{width: 18 + 'rem'}}>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">{props.comment.author.commenterName}</h6>
                        <p className="card-text">{props.comment.comment}</p>
                    {(props.user?.result?.googleId === props.listingCreator || props.user?.result?._id === props.listingCreator) && (
                        <div> 
                            <button className="card-link btn btn-primary">Edit</button>
                            <button className="card-link btn btn-danger" value={props.comment._id} onClick={props.handleDeleteComment}>Delet</button>
                        </div>
                    )}    
                    </div>
                </div>
            </div>
        </div>
    )
}
