import React, {useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import { deleteListing, getOneListing } from '../actions/listing_actions'
import { ShowItem } from '../components/ShowItem'
import { useListingStore } from '../store/ListingContext'
import { toJS } from 'mobx';
//mobx

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const listingStore = useListingStore();
    
    const [listingState, setListingState] = useState(0)
    const [listing, setListing] = useState('');
    const history = useHistory();

    useEffect(()=>{
        fetchOneListing();
        return () => setListingState('');
    },[]);

    const fetchOneListing = async ()=>{
        const oneListing = toJS(listingStore.selectedListing)

        if (oneListing[0]?._id != match.params.id) {
            const apiSelectedListing = await getOneListing(match.params.id)
            listingStore.addOneListing(apiSelectedListing);
            setListing(apiSelectedListing);
        }else{
            setListing(oneListing[0]);
        }
    }
    

    const handleDeleteClick = async (e) =>{
        e.preventDefault();
        deleteListing(match.params.id, listing?.creator, history);
        listingStore.deleteListing(match.params.id);
    }



    return (
        <div>
            {console.log(listingStore.selectedListing)}
            <ShowItem
                listing={listing}
                listingId={match.params.id}
                handleDeleteClick={handleDeleteClick}
            />

        </div>
    );
    
}


export default Listing;