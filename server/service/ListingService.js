const Listing = require('../models/listings');
const Comments = require('../models/comments');

exports.getListingsService = async () =>{
    const listings = await Listing.find({})
    return listings
};

exports.createListingService = async(data, userId) =>{
    const listing = new Listing({...data, creator: userId, createdAt: new Date().toISOString()});
    try {
        await listing.save();
        return listing;
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.getOneListingService = async(listingId) =>{
    try {
        const listing = await Listing.findById(listingId).populate("comments").exec()
        return listing
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.updateListingService = async(id, updatedListing) =>{
    try {
        const listing = Listing.findByIdAndUpdate(id, {...updatedListing})
        return listing
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.deleteListingService = async(id) =>{
    try {
        await Listing.findById(id, (err, foundListing) =>{
            if(!err){
                foundListing?.comments?.forEach(comment => {
                    Comments.findByIdAndRemove(comment, (err)=>{
                        if(err){
                            console.log(err)
                        }
                    })
                })
            }else{
                console.log(err)
            }
        });

        const deletedListing = await Listing.findByIdAndRemove(id);
        return deletedListing;
    } catch (error) {
        console.log(error)
        return error.message;
    }
};