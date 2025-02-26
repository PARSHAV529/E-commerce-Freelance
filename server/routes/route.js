import express from "express";

import { userSignup, userLogin , getUserData } from '../controller/user-controller.js';
import { getProducts,getProductById ,postProductReviewById , getProductReviewById, updateProducts} from '../controller/product-controller.js';
// import {createOrder} from "../controller/payment.js";
import {getAllOrders, getUserOrders, placeOrder,updateAddress,updateOrderStatus,validatePincode} from '../controller/oredr-controller.js'
import { AdminAddProduct, DeleteAddProduct } from "../controller/admin.js";

const router = express.Router()


router.post('/signup',userSignup);
router.post('/login',userLogin);
router.get('/user',getUserData)

router.post('/place-order',placeOrder);
router.put('/update-address',updateAddress);
router.post('/validate-pincode',validatePincode);

router.get('/admin/orders', getAllOrders);
router.put('/admin/orders/:orderId', updateOrderStatus);
router.post('/admin/products', AdminAddProduct);
router.delete('/products/:id', DeleteAddProduct)

// User routes
router.get('/user/orders/:userId', getUserOrders);
// router.post('/create-order',createOrder);

router.get('/products',getProducts)
router.put('/products/:id',updateProducts)
router.get('/product/:id',getProductById)
router.post('/product/:id/review',postProductReviewById)
router.get('/product/:id/reviews',getProductReviewById)



export default router;