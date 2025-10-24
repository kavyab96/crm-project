
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

//user profile 
exports.getUserProfile = async (req, res, next) => {
    try {
        res.json(req.user);
    } catch (error) {
        next(error)
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


