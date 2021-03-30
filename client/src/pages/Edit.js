import React, {useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { editListing } from '../actions/listing_actions'
import { useListingStore } from '../store/ListingContext'


//!!!!!!!WARNING: HISTORY IS NOT WORKING POSSIBLY BECAUSE I USED STATE INSTAED OF AN API GET

function EditListing({ match }){
    const listingStore = useListingStore();
    const { state } = useLocation()
    const initialState = {id: match.params.id, title: state.title, price: state.price, image: state.image, description: state.description}
    const [formData, setFormData] = useState(initialState)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(editListing(match.params.id, formData, history, state.creator))
        listingStore.updateListing(formData)
    }

    const handleChange = (e) => {
        //destracture the formData so we those where the target.name matches the key in the object
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    }

    return(
        <div className="row">
            <div className="col-6 offset-3">
            <h3 className="text-center">Edit listing</h3>
            <form noValidate className="validated" onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" name="title" defaultValue={state.title} onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" name="pricing" defaultValue={state.price} onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Image</label>
                <input type="text" name="image" defaultValue={state.image} onChange={handleChange}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea cols="10" rows="3" className="form-control" type="text" name="description" defaultValue={state.description} onChange={handleChange}></textarea>
            </div>

            <button>Update Listing</button>
            </form>
            </div>
        </div>
        
    )
}

export default EditListing;