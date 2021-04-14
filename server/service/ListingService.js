const Listing = require('../models/listings');
const Comments = require('../models/comments');
const listingMapper = require('../mappers/ListingMapper')


//here i should  comprass the image
exports.getListingsService = async () =>{
    const listings = await Listing.find({})
    return listingMapper.allListingsMapper(listings);
};

exports.createListingService = async(data, userId) =>{
    const listing = new Listing({...data, creator: userId, createdAt: new Date().toISOString()});
    try {
        await listing.save();
        return listingMapper.oneListingMapper(listing)
    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.getOneListingService = async(listingId) =>{
    try {
        const listing = await Listing.findById(listingId).populate("comments").exec()
        return listingMapper.oneListingMapper(listing)

    } catch (error) {
        console.log(error)
        return error.message;
    }
};

exports.updateListingService = async(id, updatedListing) =>{
    try {
        const listing = Listing.findByIdAndUpdate(id, {...updatedListing})
        return listingMapper.oneListingMapper(listing)

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
        return listingMapper.oneListingMapper(deletedListing);

    } catch (error) {
        console.log(error)
        return error.message;
    }
};