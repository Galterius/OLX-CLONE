import React, { useState,useEffect } from 'react';
import { ListItem } from '../components/ListItem'
import { useListingStore } from '../store/ListingContext'
import { getListing } from '../actions/listing_actions'

function Listings() {
    const listingStore = useListingStore();
    const [listings, setListings] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () =>{
        const listings = await getListing();
        listings.forEach(element => listingStore.addListings(element))
        console.log("1")
        setListings(listings);
    }

    return (
        <div>
        {/* //make a component for this, use props */}
            <ul>
                {listingStore.listings.map(listing => (
                    <ListItem key={listing._id} title={listing.title} id={listing._id} />
                ))}
            </ul>
        </div>
    );
    
}


export default Listings;