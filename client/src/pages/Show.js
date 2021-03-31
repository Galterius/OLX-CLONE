import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteListing, getOneListing } from '../actions/listing_actions'
import { createComment, deleteComment, editComment } from '../actions/comment_actions'
import { ShowItem } from '../components/ShowItem'
import { useListingStore } from '../store/ListingContext'
import { toJS } from 'mobx';
//mobx

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const listingStore = useListingStore();

    const initialComment = {
        author:{
            commenterId: user?.result?._id || user?.result?.googleId, 
            commenterName: user?.result?.name
        },
        listingId: match.params.id,
        comment: ''
    };
    
    const initialState = {commentId: '', comment:''}
    const[editedComment, setEditedComment] = useState(initialState);

    const [isEdit, setIsEdit] = useState(false);

    const [newComment, setComment] = useState(initialComment);
    const [listingState, setListingState] = useState(0)
    const [listing, setListing] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        fetchOneListing();
        return () => setListingState('');
    },[]);

    const fetchOneListing = async ()=>{
        const temp = toJS(listingStore.selectedListing)

        console.log(temp);
        console.log(temp[0]?._id, match.params.id)

        if ((temp != undefined) && (temp[0]?._id != match.params.id)) {
            console.log("1")
            const apiSelectedListing = await getOneListing(match.params.id)
            listingStore.addOneListing(apiSelectedListing);
            setListing(apiSelectedListing);
        }else{
            console.log(temp[0]);
            setListing(temp[0]);
        }
    }
    

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        dispatch(deleteListing(match.params.id, listing?.creator, history));
        listingStore.deleteListing(match.params.id);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        dispatch(createComment(match.params.id, newComment))
        setListingState((prevState)=> prevState+1)
    }
    
    const handleChange = async (e) =>{
        setComment({ ...newComment, [e.target.name]: e.target.value})
    }

    const handleCommentChange = (e) =>{
        setEditedComment(e)
    }

    const handleCommentEditSubmit = (e) =>{
        e.preventDefault();
        dispatch(editComment(editedComment?.commentId, editedComment))
        setListingState((prevState)=> prevState-1)
        switchMode();
    }

    const handleDeleteComment = async (e) =>{
        e.preventDefault();
        const commentId = e.target.value;
        dispatch(deleteComment(commentId));
        setListingState((prevState)=> prevState-1)
    }


    const switchMode = () => {
        setIsEdit((prevIsEdit) => !prevIsEdit)
    }


    return (
        <div>
            {console.log(listingStore.selectedListing)}
            <ShowItem
                listing={listing}
                editedComment={editedComment}
                switchMode={switchMode}
                isEdit={isEdit}
                onChange={handleCommentChange}
                handleCommentEditSubmit={handleCommentEditSubmit} 
                handleChange={handleChange} 
                handleDeleteComment={handleDeleteComment} 
                handleSubmit={handleSubmit} 
                handleDeleteClick={handleDeleteClick}
            />

        </div>
    );
    
}


export default Listing;