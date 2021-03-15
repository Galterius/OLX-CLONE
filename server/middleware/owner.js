const owner = async (req, res, next) =>{
    const senderId = req.userId
    const { listingCreator } = req.query;

    if(senderId == listingCreator){
        next();
    }else{
        console.log("invalid")
        res.status(403).json({message: "Invalid user"})
    }
}

module.exports = owner;