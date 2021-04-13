import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { createListing } from '../actions/listing_actions'
import { useListingStore } from '../store/ListingContext'

function NewListing(){
    const listingStore = useListingStore();
    const initialState = { title: '', price: '', image: '', description:'', name:'' }

    const user = JSON.parse(localStorage.getItem('profile'))
    const [formData, setFormData] = useState(initialState)
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const returnedListing = await createListing(formData)
        listingStore.addListings(returnedListing)
        history.push(`/listing/${returnedListing._id}`)
    }

    const handleChange = (e) => {
        //destracture the formData so we those where the target.name matches the key in the object
        setFormData({ ...formData, [e.target.name]: e.target.value, name: user?.result?.name});
        
    }

   if(!user?.result?.name){
        return(
            <div>
                <p>Please log in to submit a listing. Thank you</p>
            </div>
        )
   } 

    return(
        <div className="row">
            <div className="col-6 offset-3">
            <h3 className="text-center">New Listing</h3>
            <form noValidate className="validated" onSubmit={handleSubmit}>
            
            <div className="mb-3">
                <label htmlFor="titile" className="form-label">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="number" min="1" name="price" value={formData.price} onChange={handleChange}/>
            </div>

            <div className="mb-3">
                <label htmlFor="price" className="form-label">Image</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange}/>
            </div>
            
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea cols="10" rows="3" className="form-control" type="text" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>

            <button>Add Listing</button>
            </form>
            </div>
        </div>
        
    )
}

export default NewListing;