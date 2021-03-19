import React from 'react'
import { useHistory, Link} from 'react-router-dom';

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
                <div className="d-flex justify-content-center mb-3" key={comment._id}>
                <div className="card" style={{width: 18 + 'rem'}}>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">{comment.author.commenterName}</h6>
                        <p className="card-text">{comment.comment}</p>
                    {(user?.result?.googleId === props.listing?.creator || user?.result?._id === props.listing?.creator) && (
                        <div> 
                            <button className="card-link btn btn-primary">Edit</button>
                            <button className="card-link btn btn-danger" value={comment._id} onClick={props.handleDeleteComment}>Delet</button>
                        </div>
                    )}    
                    </div>
                </div>
            </div>
            )}
        </div>
    )
};