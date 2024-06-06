import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword)
             return res.status(400).json({ message: "password and confirm password should match!!" });
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "user already exists" });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
       if(newUser){
        //JWT token
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname:newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });
        
       } else{
        res.status(400).json({ message: "invalid user data" });
       }
    }

    catch (error) {
        console.log("error in signup", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({ message: "invalid credentials" });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("error in login", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("error in logout", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}