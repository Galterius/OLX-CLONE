const listingService = require('../service/ListingService')
const fs = require('fs');


exports.getListings = async (req, res) => {
    const listings = await listingService.getListingsService()
    res.json(listings);
};

exports.createListing = async (req,res) =>{
    
    try {
        req.body.image =  `/uploads/${req.file.filename}`

        const listing = await listingService.createListingService(req.body, req.userId)
        res.status(200).json(listing)
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }
    
};

exports.getOneListing = async (req, res)=>{
    try {
        const listing = await listingService.getOneListingService(req.params.id)
        res.status(200).json(listing);
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }
    
}

exports.updateListing = async (req,res)=>{
    const { id } = req.body;
    try {
        const listing = await listingService.updateListingService(id, req.body)
        res.status(200).json(listing);
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }
};

exports.deleteListing = async (req, res)=>{
    const { id } = req.params;
    try {
        const deletedListing = await listingService.deleteListingService(id);
        res.status(200).json(deletedListing);
    } catch (error) {
        console.log(error)
        res.status(409).json({message: error.message})
    }    
};