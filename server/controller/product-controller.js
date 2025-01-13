

import Product from '../model/product-schema.js'


export const getProducts =async (request,response) => {
    try {
       const products = await Product.find({})

       response.status(200).json(products)
    } catch (error) {
        response.status(500).json({ message: error.message})
    }

}
export const updateProducts =async (req,res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true } // Returns the updated document
        );
        res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
      }

}

export const getProductById = async (request,response) => {
    try {
        const id = request.params.id;
        const product = await Product.findOne({ 'id' : id})

        response.status(200).json(product);
    } catch (error) {
        response.status(500).json({ message: error.message})
    }
}

export const postProductReviewById = async (req,res) => {
    const { id } = req.params;
    const { user, rating, comment } = req.body;

    try {
        const product = await Product.findOne({ id });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const review = { user, rating, comment };
        product.reviews.push(review);
        await product.save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getProductReviewById = async (req,res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ id }).select('reviews');
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ reviews: product.reviews });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}