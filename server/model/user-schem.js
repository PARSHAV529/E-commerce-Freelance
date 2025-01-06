import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: 'admin',
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String  },
        zip: { type: String },
        country: { type: String },
    }
});

const User = mongoose.model('User', userSchema);

export default User;
