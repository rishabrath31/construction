
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

require("dotenv").config();

exports.register = async(req, res) =>{
    try
    {
        const { email, password, role } = req.body;
        // check for Existing User or Not
        const existingUser = await User.findOne( { email } );

        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:"Already the User is Exisiting with this Email",
            });
        }
        // now hash the password
        let hashedPassword;
        try
        {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err)
        {
            return res.status(500).json({
                success:false,
                message:"Error while Hashing the Password",
            });
        }

        // create the entry for user in database
        const updateUser = await User.create({ email, password:hashedPassword, role });

        return res.status(200).json({
            success:true,
            data:updateUser,
            message:"User Created Successfully",
        });
    }
    catch(error)
    {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered please try again and Later",
        });
    }
}

// login handler
exports.login = async(req, res) =>{
    try
    {
        // data fetch
        const { email, password } = req.body;
        // validation
        if(!email || !password)
        {
            return res.status(400).json(
            {
                success:false,
                message:'Please fill all the fields'
            });
        }
        // Check for registered user
        let user = await User.findOne({ email });
        // if not a registered user
        if(!user)
        {
            return res.status(401).json(
            {
                success:false,
                message:"User is Not registered",
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,
        };

        // verify password and generate a JWT Token
        if(await bcrypt.compare(password, user.password))
        {
            let token = jwt.sign(payload, 
                                'Your-Secret-key', 
                                {
                                    expiresIn:"2hr",
                                });


            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
                httpOnly: true,
            }

            res.cookie("TestingCookie", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User Logged in Successfully",
            });
        }
        else{
            // password do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect"
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure"
        });
    }
}
