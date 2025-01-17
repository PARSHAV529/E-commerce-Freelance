import User from '../model/user-schem.js';
import Order from '../model/order-schema.js';
import Pincode from "../model/PincodeSchema.js";

const placeOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { street, city, state, zip } = user.address;
        if (!street || !city || !state || !zip ) {
            return res.status(400).json({ message: 'Complete address is required to place an order' });
        }

        // Create the order
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            address: user.address,
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
        log
    }
};

const updateAddress = async (req, res) => {
    const { userId, address } = req.body;

    try {
        console.log(userId);
        
       const rest = await User.findByIdAndUpdate(userId, { address }, { new: true });
       console.log(rest)
        res.status(200).json({ message: 'Address updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update address', error });
    }
};



 const validatePincode = async (req, res) => {
    const { zip } = req.body;

    try {
        const validPincode = await Pincode.findOne({ pincode: zip, available: true });
        if (!validPincode) {
            return res.status(400).json({ message: "This pincode is not available for delivery." });
        }

        res.status(200).json({ message: "Pincode is available for delivery." });
    } catch (error) {
        console.error("Error validating pincode:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// export const getAllOrders = async (req, res) => {
//     try {
//       const orders = await Order.find().populate('userId', 'firstname lastname email phone address')  // Populate user details
//     //   .populate('items[0].productId', 'title price description size url')  
//       console.log(orders);
      
//       res.status(200).json(orders);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch orders', error });
//     }
//   };



export const getAllOrders = async (req, res) => {
  try {
    // Aggregation pipeline to populate user and items.productId
    const orders = await Order.aggregate([
      {
        $lookup: {
          from: 'users', // Collection name for users
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: { path: '$userDetails' } }, // Flatten userDetails array

      {
        $lookup: {
          from: 'products', // Collection name for products
          localField: 'items.productId', // Reference to productId in items array
          foreignField: '_id',
          as: 'productDetails',
        },
      },

      {
        $project: {
          _id: 1,
          userId: 1,
          user: {
            firstname: '$userDetails.firstname',
            lastname: '$userDetails.lastname',
            username: '$userDetails.username',
            email: '$userDetails.email',
            phone: '$userDetails.phone',
            address: '$userDetails.address',
          },
          items: {
            $map: {
              input: '$items',
              as: 'item',
              in: {
                productId: { $arrayElemAt: [{ $filter: {
                    input: '$productDetails',
                    as: 'product',
                    cond: { $eq: ['$$product._id', '$$item.productId'] }
                  } }, 0] },
                quantity: '$$item.quantity',
                price: '$$item.price',
              },
            },
          },
          totalAmount: 1,
          orderStatus: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};


  export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;
  
    try {
      const order = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
      if (!order) return res.status(404).json({ message: 'Order not found' });
      res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order status', error });
    }
  };

  import mongoose from 'mongoose';

  export const getUserOrders = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await Order.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(userId) }, // Ensure userId is converted to ObjectId
        },
        {
          $unwind: {
            path: '$items', // Deconstruct the items array
            preserveNullAndEmptyArrays: true, // Handle empty or missing items arrays
          },
        },
        {
          $lookup: {
            from: 'products', // Replace with your Product collection name
            localField: 'items.productId', // Field in the Order schema
            foreignField: '_id', // Field in the Product schema
            as: 'productDetails', // Output field for matched product details
          },
        },
        {
          $unwind: {
            path: '$productDetails', // Flatten productDetails array
            preserveNullAndEmptyArrays: true, // Handle missing product details
          },
        },
        {
          $group: {
            _id: '$_id', // Group by order ID
            userId: { $first: '$userId' },
            totalAmount: { $first: '$totalAmount' },
            orderStatus: { $first: '$orderStatus' },
            createdAt: { $first: '$createdAt' },
            items: {
              $push: {
                productId: '$items.productId',
                quantity: '$items.quantity',
                productDetails: '$productDetails',
              },
            },
          },
        },
      ]);
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      res.status(500).json({ message: 'Failed to fetch user orders', error });
    }
  };
  


export { placeOrder,updateAddress,validatePincode };
