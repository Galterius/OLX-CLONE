import React, { useState, useEffect, } from 'react';
import {Link} from 'react-router-dom';
import * as api from '../api/index'
import { ListItem } from '../components/ListItem'

function Listings() {
    //useState when the data chnages re-render the UI
    const [listings , setData] = useState([]);

    //runs automatically when the component is mounted
    useEffect(() => {
        fetchListings();
    }, [])
    
    const fetchListings = async () =>{
        const data = await api.fetchListings();
        const items = await JSON.parse(data.request.response)
        setData(items)
    }

    return (
        //make a component for this, use props
        <ul>
            {listings.map(listing => (
                <ListItem title={listing.title} id={listing._id} key={listing._id}/>
            ))}
        </ul>
    );
    
}


export default Listings;