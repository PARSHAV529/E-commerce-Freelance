import { products } from "./constants/data.js";
import { krutis } from "./constants/data1.js";

import Product from "./model/product-schema.js";
import Kruti from "./model/kruti-schema.js";

const DefaultData = async () => {
    try {
        // Delete existing data from Product and Kruti collections
        await Product.deleteMany({});
        await Kruti.deleteMany({});

        // Insert new data into the collections
        await Product.insertMany(products);
        await Kruti.insertMany(krutis);

        console.log('Data deleted and imported successfully');
    } catch (error) {
        console.log('Error while processing default data:', error.message);
    }
};

export default DefaultData;
