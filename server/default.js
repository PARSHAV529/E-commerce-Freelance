import { Dress } from "./constants/data.js";
import { gown } from "./constants/data1.js";
import { choli } from "./constants/choli.js";
import { Saree } from "./constants/Saree.js";
import Pincode from './model/PincodeSchema.js'; 
const defaultPincodes = [
    { pincode: '393145', available: true },
    { pincode: '300018', available: true },
    { pincode: '380012', available: true },
    { pincode: '390000', available: true },
    { pincode: '390001', available: true },
    { pincode: '390002', available: true },
    { pincode: '390003', available: true },
    { pincode: '390004', available: true },
    { pincode: '390005', available: true },
    { pincode: '390006', available: true },
    { pincode: '390007', available: true },
    { pincode: '390008', available: true },
    { pincode: '390009', available: true },
    { pincode: '390010', available: true },
    { pincode: '390011', available: true },
    { pincode: '390012', available: true },
    { pincode: '390013', available: true },
    { pincode: '390014', available: true },
    { pincode: '390015', available: true },
    { pincode: '390016', available: true },
    { pincode: '390017', available: true },
    { pincode: '390018', available: true },
    { pincode: '390019', available: true },
    { pincode: '390020', available: true },
    { pincode: '390021', available: true },
    { pincode: '390022', available: true },
    { pincode: '390023', available: true },
    { pincode: '390024', available: true },
    { pincode: '390025', available: true },
    { pincode: '390028', available: true },
    { pincode: '390034', available: true },
    { pincode: '391101', available: true },
    { pincode: '391310', available: true },
    { pincode: '391320', available: true },
    { pincode: '391330', available: true },
    { pincode: '391340', available: true },
    { pincode: '391345', available: true },
    { pincode: '391346', available: true },
    { pincode: '391350', available: true },
    { pincode: '391410', available: true },
    { pincode: '391440', available: true },
    { pincode: '391724', available: true },
    { pincode: '335009', available: true },
    { pincode: '394006', available: true },
    { pincode: '394010', available: true },
    { pincode: '394101', available: true },
    { pincode: '394104', available: true },
    { pincode: '394105', available: true },
    { pincode: '394107', available: true },
    { pincode: '394185', available: true },
    { pincode: '394210', available: true },
    { pincode: '394211', available: true },
    { pincode: '394212', available: true },
    { pincode: '394220', available: true },
    { pincode: '394221', available: true },
    { pincode: '394229', available: true },
    { pincode: '394230', available: true },
    { pincode: '394235', available: true },
    { pincode: '394305', available: true },
    { pincode: '394325', available: true },
    { pincode: '394500', available: true },
    { pincode: '364001', available: true },
    { pincode: '394510', available: true },
    { pincode: '394516', available: true },
    { pincode: '394518', available: true },
    { pincode: '394520', available: true },
    { pincode: '394550', available: true },
    { pincode: '395001', available: true },
    { pincode: '395002', available: true },
    { pincode: '395003', available: true },
    { pincode: '395004', available: true },
    { pincode: '395005', available: true },
    { pincode: '395006', available: true },
    { pincode: '395007', available: true },
    { pincode: '395008', available: true },
    { pincode: '395009', available: true },
    { pincode: '395010', available: true },
    { pincode: '395011', available: true },
    { pincode: '395012', available: true },
    { pincode: '395013', available: true },
    { pincode: '395017', available: true },
    { pincode: '395023', available: true },
    { pincode: '395101', available: true },
    { pincode: '395210', available: true },
    { pincode: '393151', available: true },
    { pincode: '391110', available: true },
];

// import Product from "./model/product-schema.js";
import user from "./model/user-schem.js";
// import Kruti from "./model/kruti-schema.js";

const DefaultData = async () => {
    try {
        await Pincode.deleteMany({});

        await Pincode.insertMany(defaultPincodes);

        console.log('Data deleted and imported successfully');
    } catch (error) {
        console.log('Error while processing default data:', error.message);
    }
};

export default DefaultData;
