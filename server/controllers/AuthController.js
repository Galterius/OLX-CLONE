const jwt = require('jsonwebtoken');

//database requirements
const userService = require('../service/UserService');

exports.registerUser = async(req, res) =>{
    const { email, password, name } = req.body;
    
    try {
        const registeredUser = await userService.registerUser(email, password, name)
        
        if(registeredUser === "User already exists") {
            res.status(400).json({message: "User already exists"})
        }
        
        const result = registeredUser;

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: "1h"})
        
        //sending back the user and the token
        res.status(200).json({ result, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}

exports.loginUser = async (req, res)=>{
    const { email, password } = req.body

    try {
        const existingUser = await userService.loginUser(email, password);

        if(existingUser=="User doesn't exists") {
            res.status(404).json({message: "User does not exist"})
        }

        if(existingUser=="Invalid email or password"){
            res.status(404).json({message: "Invalid email or password"})
        }

        //the secret token should be stored in an enviroment var or somewhere secure, but it will be good enough now
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', {expiresIn: "1h"})
        res.status(200).json({ result: existingUser, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
        console.log(error)
    }
}