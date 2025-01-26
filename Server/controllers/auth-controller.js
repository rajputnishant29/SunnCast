const User = require('../schema/userSchema')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const registerUser = async(req,res) => {
    const {userEmail, userName, password,} = req.body;

    const existingUser = await User.findOne({
        $or: [{userEmail}, {userName}],
    });

    if(existingUser) {
        return res.status(400).json({
            success: false,
            message: "Username or Email already exists",
        });
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        userEmail,
        userName,
        password: hashPassword,
    });

    await newUser.save();

    return res.status(201).json({
        success: true,
        message: "registered Successfully",
    });
}

const loginUser = async (req,res) => {
    const {userEmail, password } = req.body;
    const checkUser = await User.findOne({userEmail});
    if(!checkUser || !(await bcrypt.compare(password, checkUser.password))) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials",
          });
    }

    const accessToken = jwt.sign(
        {
            _id: checkUser._id,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
        },
        process.env.JWT_SECRET,
        // { expiresIn: '1h' } 
    );

    res.status(200).json({
        success: true,
        message: "Logged in Succesfully",
        data: {
          accessToken,
          user: {
            _id: checkUser._id,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
          },
        },
    });
};


module.exports = { registerUser, loginUser};