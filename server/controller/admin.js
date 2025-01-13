import Product from "../model/product-schema.js"; // Adjust the path as per your project structure


// Add new product

export const AdminAddProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
      } catch (error) {
        res.status(400).json({ message: 'Failed to add product', error });
      }
};


