import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    type: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    size: {
        type: [String], // Array of sizes, e.g., ["S", "M", "L", "XL"]
        default: [],    // Default is an empty array if no sizes are provided
    },
    reviews: [reviewSchema], // Array of reviews
});

const Product = mongoose.model('product', productSchema);

export default Product;
