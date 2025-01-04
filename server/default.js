import { Dress } from "./constants/data.js";
import { gown } from "./constants/data1.js";
import { choli } from "./constants/choli.js";
import { Saree } from "./constants/Saree.js";

// import Product from "./model/product-schema.js";
import user from "./model/user-schem.js";
// import Kruti from "./model/kruti-schema.js";

const DefaultData = async () => {
    try {
     

        

        console.log('Data deleted and imported successfully');
    } catch (error) {
        console.log('Error while processing default data:', error.message);
    }
};

export default DefaultData;
