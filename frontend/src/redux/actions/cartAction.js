import axios from "axios";
import * as actionType from "../constants/cartConstants";

const URL = "http://localhost:8000";

// Action to add an item to the cart with quantity and size
export const addToCart = (id, quantity = 1, size) => async (dispatch) => {
    try {
        // Fetching product data based on id
        const { data } = await axios.get(`${URL}/product/${id}`);
        
        // Dispatching action to add the item to the cart with product data, quantity, and size
        dispatch({
            type: actionType.ADD_TO_CART,
            payload: { ...data, quantity, size },
        });
    } catch (error) {
        // If error occurs, dispatch error action with message
        dispatch({ type: actionType.ADD_TO_CART_ERROR, payload: error.message });
    }
};

// Action to remove an item from the cart by its id
export const removeFromCart = (id) => (dispatch) => {
    dispatch({ type: actionType.REMOVE_FROM_CART, payload: id });
};

// Action to update the quantity of an existing item in the cart
export const updateItemQuantity = (id, quantity) => (dispatch) => {
    dispatch({
        type: actionType.UPDATE_ITEM_QUANTITY,
        payload: { id, quantity },
    });
};
