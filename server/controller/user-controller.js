
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/user-schem.js';
const SECRET_KEY = 'Parshav12345';

export const userSignup = async (request, response) => {
    try {
        const { username, password, ...otherDetails } = request.body;

        // Check if username already exists
        const exist = await User.findOne({ username });
        if (exist) {
            return response.status(401).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = new User({ ...otherDetails, username, password: hashedPassword });
        await newUser.save();

        // Generate JWT token for the new user
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            SECRET_KEY,
          
        );

        // Respond with token and message
        response.status(200).json({ 
            data: { token, username: newUser.username }, 
            message: 'Signup and login successful' 
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const userLogin = async (request, response) => {
    try {
        const { username, password } = request.body;

        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, );
            const data = {
                token,username
            } // Generate JWT
            return response.status(200).json({ data, message: 'Login successful' });
        } else {
            return response.status(401).json({ message: 'Invalid login credentials' });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getUserData = async (request, response) => {
    const token = request.headers['x-access-token']
    if (!token) return response.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, 'Parshav12345');
        const user = await User.findById(decoded.id).select('-password'); // Exclude password
        response.status(200).json(user);
    } catch (error) {
        response.status(401).json({ message: 'Invalid or expired token' });
    }
};