export function createListingsStore(){
    return {
        listings: [],
        selectedListing: [],
        addListings(listing){
            this.listings.push(listing);
        },
        addOneListing(listing){
            this.selectedListing.push(listing);
        },
        updateListing(updatedListing){
            let foundIndex = this.listings.findIndex(listing => listing._id == updatedListing.id);
            this.listings[foundIndex]=updatedListing;
        },
        deleteListing(listingId){
            this.listings=this.listings.filter(listing => listing._id !== listingId);
        }
    }
}