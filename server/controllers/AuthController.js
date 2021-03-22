const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//database requirements
const User = require('../models/user-models');

exports.registerUser = async(req, res) =>{
    const { email, password, name } = req.body;
    console.log(email, password, name);
    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            res.status(400).json({message: "User already exists"})
        }

        //the second argument is the level of difficulity AKA salt
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({name, email, password: hashedPassword})
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
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            res.status(404).json({message: "User does not exist"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect){
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