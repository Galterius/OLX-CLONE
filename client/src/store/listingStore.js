import { toJS } from 'mobx';

export function createListingsStore() {
  return {
    listings: [],
    selectedListing: [],
    addListings(listing) {
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
      
    },
    deleteListing(listingId) {
      //szimplan kitorlom mindkettobol
      this.listings = this.listings.filter((listing) => listing._id !== listingId);
      this.selectedListing = [];
    },
    addComment(newComment){
      //i generate a random id for the comment, so react won't yell at me for the keys
      let randomId = Math.floor(Math.random() * 1000000000);
      newComment._id = `${randomId}`
      const jsListing = toJS(this.selectedListing[0].comments);
      jsListing.push(newComment)

      this.selectedListing[0].comments=jsListing
      
    },
    updateComment(editedComment){
      const jsListing = toJS(this.selectedListing[0]);
      let foundIndex = jsListing.comments.findIndex((comment) => comment._id == editedComment?.commentId);

      const mergedComment = Object.assign(jsListing.comments[foundIndex], editedComment)
      this.selectedListing[0].comments[foundIndex] = mergedComment

      console.log(this.selectedListing);
    },
    deleteComment(commentId){
      console.log(commentId);
      this.selectedListing[0].comments = this.selectedListing[0].comments.filter((comment) => comment._id !== commentId);
      console.log(toJS(this.selectedListing[0]))
      
    }
  };
}
