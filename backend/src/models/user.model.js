import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password should not be less than 6 char"],
        maxlength: [20, "Password should not be greater than 20 char"]
    },
    bio: {
        type: String,

    }
}, {timestamps: true, versionKey: false})

// Password Hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
})

// JWT 
userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            {id: this._id, email: this.email},
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
    }
}

const User = mongoose.model('User', userSchema)
export default User;