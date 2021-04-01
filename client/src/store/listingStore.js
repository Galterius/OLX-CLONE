import { toJS } from 'mobx';

export function createListingsStore() {
  return {
    listings: [],
    selectedListing: [],
    addListings(listing) {
      //ugyan az a helyzet megnezem ha van populatelve
      this.listings.push(listing);
    },
    addOneListing(listing) {
      this.selectedListing = [];
      this.selectedListing.push(listing);
    },
    updateListing(updatedListing) {
      //megnezhetem ha a kommenteknel csak id van vagy populatelve
      let foundIndex = this.listings.findIndex((listing) => listing._id == updatedListing.id);
      const oneListing = toJS(this.listings[foundIndex]);
      const returnedListing = Object.assign(oneListing, updatedListing);
      this.listings[foundIndex] = returnedListing;

      const JSed = toJS(this.selectedListing[0]);
      const returnedTarget = Object.assign(JSed, updatedListing);
      this.selectedListing[0] = returnedTarget;
      console.log(this.selectedListing);
    },
    deleteListing(listingId) {
      //szimplan kitorlom mindkettobol
      this.listings = this.listings.filter((listing) => listing._id !== listingId);
    },
  };
}
