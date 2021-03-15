import React from 'react'

export const ListItem = (props) =>{
    <div>
        <Link to={{
            pathname:`/listing/${props.id}`,
        }}>{props.title}</Link>
    </div>
};