
const User = require("../models/userModel");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//user Register
exports.userRegister = async (req, res, next) => {
    try {
        // return res.status(200).json({data:req.body,msg:"Reached here"});
        const { name, email, password, role, phone } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            phone,
            role
        });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token)
        res.status(201).json({
            message: "User created successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            password_hash: user.password_hash,
            role: user.role,
            phone: user.phone


        });


    } catch (error) {
        next(error)
    }
}


exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }


        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token)

        res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            password_hash: user.password_hash,
            role: user.role

        });

    } catch (error) {
        next(error)
    }
}


//get all users with search
exports.getUsers = async (req, res,next) => {
    try {
        const { search } = req.query;
        // return res.status(200).json(search);
        let users;
        if (search) {
            //filtering data based on 'search'
            users = await User.find({
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { contact_info: { $regex: search, $options: "i" } },
                ],
               
            })
        } else {
            users = await User.find();
        }
       
        res.status(200).json({ message: "users retrieved successfully", users })
    } catch (error) {
         next(error)
    }

}


//user profile 
exports.getUserProfile = async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        next(error)
    }
}



//delete user
exports.deleteUser = async (req, res,next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.status(200).json({success:true, message: "user deleted successfully"})
    } catch (error) {
         next(error)
    }

}



// user partial update
exports.updateUser= async (req, res,next) => {

    try {

        const { id } = req.params;
        const updates = req.body

        // return res.status(200).json({updates});

        const user = await User.findByIdAndUpdate(
            id, updates, { new: true, runValidators: true }
        )
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        return res.status(200).json({ message: "user  updated successfully ", user: user })


    } catch (error) {
        // Check for MongoDB duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; // e.g. 'email'
            const value = error.keyValue[field];
            return res.status(400).json({
                success: false,
                type: 'duplicate_field',
                message: `The ${field} "${value}" is already in use. Please choose another ${field}.`
            });
        }

        next(error); // pass other errors to the error handler
    }

}




// logout user
exports.userLogout = async (req, res, next) => {
    try {
        res.clearCookie('token');
        res.json({ message: "User logged out successfully" });

    } catch (error) {
        next(error)
    }
}



