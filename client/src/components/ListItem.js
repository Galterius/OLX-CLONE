import React from 'react'
import { Link } from 'react-router-dom';

export const ListItem = (props) =>{
    
    return (
        <div>
        <Link to={{
            pathname:`/listing/${props.id}`,
        }} key={props._id}> {props.title} </Link>
    </div>
    );
};