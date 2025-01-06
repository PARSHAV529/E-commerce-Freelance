import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getProductDetailsReducer, getProductsReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import userReducer from './userSlice'


const reducer = combineReducers({
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer,
    user: userReducer,
});
    
const middleware = [thunk];



const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;