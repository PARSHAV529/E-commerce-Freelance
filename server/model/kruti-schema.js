import mongoose from "mongoose";

const krutiSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: Number,

});

const Kruti = mongoose.model('kruti',krutiSchema);

export default Kruti;