exports.allListingsMapper = (listings) =>{
    let mappedListings = []

    listings.forEach((listing) =>  mappedListings.push({
        _id: listing._id,
        title: listing.title,
        price: listing.price,
        image: listing.image,
        description: listing.description,
        name: listing.name,
        creator: listing.creator,
        createdAt: listing.createdAt, 
    }))

    return mappedListings;
};

exports.oneListingMapper = (listing) => {
   return {
        comments: listing.comments,
        _id: listing._id,
        title: listing.title,
        price: listing.price,
        image: listing.image,
        description: listing.description,
        name: listing.name,
        creator: listing.creator,
        createdAt: listing.createdAt,
    }
}