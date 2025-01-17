import mongoose from "mongoose";

const PincodeSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    unique: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});


const Pincode = mongoose.model('Pincode', PincodeSchema)

export default Pincode;
