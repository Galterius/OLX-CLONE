import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { CommentItem } from './CommentItem'
import { useListingStore } from '../store/ListingContext'
import { createComment} from '../actions/comment_actions'
import { deleteListing} from '../actions/listing_actions'
import { useObserver } from 'mobx-react-lite';
import { toJS } from 'mobx';


export const ShowItem = (props) =>{
    const user = JSON.parse(localStorage.getItem('profile'))
    const listingStore = useListingStore();
    const history = useHistory();


    const initialComment = {
        author:{
            commenterId: user?.result?._id || user?.result?.googleId, 
            commenterName: user?.result?.name
        },
        listingId: props.listingId,
        comment: ''
    };

    const [newComment, setComment] = useState(initialComment);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const temp = await createComment(props.listingId, newComment)
        console.log(temp);
        listingStore.addComment(newComment)
        
    }
    
    const handleChange = async (e) =>{
        setComment({ ...newComment, [e.target.name]: e.target.value})
    }

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        console.log(props.listingId)
        deleteListing(props.listingId, props.listing?.creator, history);
        listingStore.deleteListing(props.listingId);
    }
    
    return useObserver(()=>(
        <div>
            <h3 >{props.listing.title}</h3>
            <img alt ="" src={props.listing.image} />
            <p>{props.listing.description}</p>

            {(user?.result?.googleId === props.listing?.creator || user?.result?._id === props.listing?.creator) && (
            <div>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Delete listing</button>
                <Link to={{
                    pathname: `/listing/edit/${props.listing._id}`,
                    state: props.listing
                }}>
                    <p className="btn btn-warning">Edit</p>
                </Link>
            </div>
            )}

            <div className="d-flex justify-content-center mb-3">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="comment" placeholder="Ask Something..." onChange={handleChange}/>
                    <button className="btn btn-success">Add Comment</button>
                </form>
            </div>
            {console.log(toJS(listingStore.selectedListing[0])?.comments)}
            {toJS(listingStore.selectedListing[0])?.comments.map(comment =>
                <CommentItem
                    key={comment._id}
                    comment={comment}
                    user={user}
                    listingCreator={props?.listing?.creator}
                />
            )}
        </div>
    ));
};