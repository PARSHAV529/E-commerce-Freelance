import mongoose from "mongoose";


export const Connection = async (username,password) => {
    const URL = `mongodb://${username}:${password}@ecommerceweb-shard-00-00.0fad8.mongodb.net:27017,ecommerceweb-shard-00-01.0fad8.mongodb.net:27017,ecommerceweb-shard-00-02.0fad8.mongodb.net:27017/?ssl=true&replicaSet=atlas-jyq40p-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ecommerceweb`;
    try{
       await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
       console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database', error.message);
    }
}

export default Connection;