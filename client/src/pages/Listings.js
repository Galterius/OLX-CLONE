import React, { useEffect } from 'react';
import { ListItem } from '../components/ListItem'

import { useSelector, useDispatch } from 'react-redux'
import { getListing } from '../actions/listing_actions'

function Listings() {
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(getListing())
    },[dispatch])

    //retriwing the data from the app because we use a redux store
    const listings = useSelector((state) => state.listings)

    return (
        //make a component for this, use props
        <ul>
            {console.log(listings)}
            {listings.map(listing => (
                <ListItem title={listing.title} id={listing._id} key={listing._id}/>
            ))}
        </ul>
    );
    
}


export default Listings;