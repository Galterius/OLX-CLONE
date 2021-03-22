const Listing = require('../models/listings')
const Comments = require('../models/comments');

exports.getListings = async (req, res) => {
    const listings = await Listing.find({})
    res.json(listings);
};

exports.createListing = async (req,res) =>{
    const listing = new Listing({...req.body, creator: req.userId, createdAt: new Date().toISOString()});
    
    try {
        await listing.save();
        res.status(200).json(listing)
    } catch (error) {
        console.log(error)
        res.status(409).json({message: err.message})
    }
    
};

exports.getOneListing = async (req, res)=>{
    const listing = await Listing.findById(req.params.id).populate("comments").exec();
    console.log(listing);
    if(!listing){
        throw new AppError( 404, 'Your product cannot be found')
    }
    res.json(listing);
}

exports.updateListing = async (req,res)=>{
    const { id } = req.body;
    await Listing.findByIdAndUpdate(id, {...req.body})
};

exports.deleteListing = async (req, res)=>{    
    const { id } = req.params;
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

    await Listing.findByIdAndRemove(id, (err)=>{
        if(err){
            console.log(err)
        }
    })
};