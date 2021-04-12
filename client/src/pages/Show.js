import React, {useState, useEffect} from 'react';
import { getOneListing } from '../actions/listing_actions'
import { ShowItem } from '../components/ShowItem'
import { useListingStore } from '../store/ListingContext'
import { toJS } from 'mobx';
import { useObserver } from 'mobx-react-lite';

//mobx

//if you like to something then it passes a the params and you can get is those with match
function Listing({ match }) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const listingStore = useListingStore();
    
    const [listingState, setListingState] = useState(0)
    const [listing, setListing] = useState('');


    useEffect(()=>{
        fetchOneListing();
        return () => setListingState('');
    },[]);

    const fetchOneListing = async ()=>{
        const oneListing = toJS(listingStore.selectedListing)

        if (oneListing[0]?._id != match.params.id) {
            const apiSelectedListing = await getOneListing(match.params.id)
            listingStore.addOneListing(apiSelectedListing);
            console.log("HIHI")
            setListing(apiSelectedListing);
            
        }else{
            setListing(oneListing[0]);
        }
    }
    
    return useObserver(()=>(
        <div>
            {console.log(listingStore.selectedListing)}
            <ShowItem
                listing={listing}
                listingId={match.params.id}
                
            />
        </div>
    ));
    
}


export default Listing;