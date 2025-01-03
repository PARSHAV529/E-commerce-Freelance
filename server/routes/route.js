import express from "express";

import { userSignup, userLogin , getUserData } from '../controller/user-controller.js';
import { getProducts,getProductById } from '../controller/product-controller.js';
// import {createOrder} from "../controller/payment.js";


const router = express.Router()


router.post('/signup',userSignup);
router.post('/login',userLogin);
router.get('/user',getUserData)

// router.post('/create-order',createOrder);

router.get('/products',getProducts)
router.get('/product/:id',getProductById)



export default router;