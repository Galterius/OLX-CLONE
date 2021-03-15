import React, {useState, useEffect} from 'react';
import { useHistory, Link} from 'react-router-dom';
import * as api from '../api/index'
import { useDispatch } from 'react-redux';
import { deleteListing } from '../actions/listing_actions'
import { createComment } from '../actions/comment_actions'

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    const initialComment = {
        author:{
            commenterId: user?.result?._id || user?.result?.googleId, 
            commenterName: user?.result?.name
        },
        listingId: match.params.id,
        comment: ''
    };
    
    //retriving the data from Listings so we can skip an api call
    const [listing, setListing] = useState([]);
    const [newComment, setComment] = useState(initialComment);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () => {
        const result = await api.fetchOneListing(match.params.id)
        const items = await JSON.parse(result.request.response)
        setListing(items)
    }

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        dispatch(deleteListing(match.params.id, listing?.creator, history));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(createComment(match.params.id, newComment))
        
    }
    
    const handleChange = async (e) =>{
        setComment({ ...newComment, [e.target.name]: e.target.value})
    }

    return (
        <div>
            {console.log(listing)}
            <h3 >{listing.title}</h3>
            <img alt ="" src={listing.image} />
            <p>{listing.description}</p>

            {(user?.result?.googleId === listing?.creator || user?.result?._id === listing?.creator) && (
            <div>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Delete listing</button>
                <Link to={{
                    pathname: `/listing/edit/${listing._id}`,
                    state: listing
                }}>
                    <p className="btn btn-warning">Edit</p>
                </Link>
            </div>)}

            <div className="d-flex justify-content-center mb-3">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="comment" placeholder="Ask Something..." onChange={handleChange}/>
                    <button className="btn btn-success">Add Comment</button>
                </form>
            </div>
            {listing?.comments?.map(comment =>
                <div className="d-flex justify-content-center mb-3" key={comment._id}>
                <div className="card" style={{width: 18 + 'rem'}}>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">{comment.author.commenterName}</h6>
                        <p className="card-text">{comment.comment}</p>
                        <a href="#" className="card-link btn btn-primary">Edit</a>
                        <a href="#" className="card-link btn btn-danger">Delet</a>
                    </div>
                </div>
            </div>
            )}
            
        </div>
    );
    
}


export default Listing;