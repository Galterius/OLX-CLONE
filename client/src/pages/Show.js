import React, {useState, useEffect} from 'react';
import { useHistory, Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteListing, getOneListing } from '../actions/listing_actions'
import { createComment,deleteComment } from '../actions/comment_actions'
import { ShowItem } from '../components/ShowItem'
import { useSelector } from 'react-redux'

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
    const [newComment, setComment] = useState(initialComment);
    const [listingState, setListingState] = useState(0)
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getOneListing(match.params.id));
        return () => setListingState('');
    },[listingState]);

    const listing = useSelector((state) => state.oneListing)

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        dispatch(deleteListing(match.params.id, listing?.creator, history));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(createComment(match.params.id, newComment))
        setListingState((prevState)=> prevState+1)
    }
    
    const handleChange = async (e) =>{
        setComment({ ...newComment, [e.target.name]: e.target.value})
    }

    const handleDeleteComment = async (e) =>{
        e.preventDefault();
        const commentId = e.target.value;
        dispatch(deleteComment(commentId));
        setListingState((prevState)=> prevState-1)
    }

    return (
        <div>
            <ShowItem listing={listing} handleChange={handleChange} handleDeleteComment={handleDeleteComment} handleSubmit={handleSubmit} handleDeleteClick={handleDeleteClick}/>
        </div>
    );
    
}


export default Listing;