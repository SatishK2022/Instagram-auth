import emailValidator from 'email-validator'
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

async function register(req, res) {
    // TODO: Write the code here
    const {name, email,username, password, confirmPassword} = req.body;
    console.log(name, email,username, password, confirmPassword);

    try {
        if (!name || !email || !username || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
    
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password does not match"
            })
        }
    
        const isValidEmail = emailValidator.validate(email);
        if (!isValidEmail) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        const userInfo = User(req.body)
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: result
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Account already exists"
            })
        }

        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function login(req, res) {
    //TODO: Write the code here

    const {username, password} = req.body;
    console.log(username, password);

    try {
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const userInfo = await User.findOne({username}).select('+password');
        if (!userInfo || !await bcrypt.compare(password, userInfo.password)) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            })
        }

        // Token Config
        const token = userInfo.jwtToken()
        userInfo.password = undefined

        const cookieOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie('token', token, cookieOptions)
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: userInfo
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

async function getUser(req, res) {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("token", {
            expires: new Date(),
            httpOnly: true 
        });

        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {
    register,
    login,
    getUser,
    logout
}