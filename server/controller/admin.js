import Product from "../model/product-schema.js"; // Adjust the path as per your project structure


// Add new product

export const AdminAddProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
      } catch (error) {
        res.status(400).json({ message: error, error });
      }
};

export const DeleteAddProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};


