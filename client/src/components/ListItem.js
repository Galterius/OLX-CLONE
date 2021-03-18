import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

export const ListItem = (props) =>{
    const listings = useSelector((state) => state.listings)
    
    return(
        <div>
            {console.log(listings)}
        <Link to={{
            pathname:`/listing/${props.id}`,
        }}>{props.title}</Link>
    </div>
    )
};