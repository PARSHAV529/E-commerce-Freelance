import * as actionType from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            const item = action.payload;
            const exist = state.cartItems.find(
                (product) =>
                    product.id === item.id && product.size === item.size
            );

            if (exist) {
                // If item exists, update its quantity
                return {
                    ...state,
                    cartItems: state.cartItems.map((data) =>
                        data.id === exist.id && data.size === exist.size
                            ? { ...data, quantity: data.quantity + item.quantity }
                            : data
                    ),
                };
            } else {
                // If item doesn't exist, add the new item with quantity defaulted to 1
                return {
                    ...state,
                    cartItems: [...state.cartItems, { ...item, quantity: 1 }],
                };
            }

        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (product) => product.id !== action.payload
                ),
            };

        case actionType.UPDATE_ITEM_QUANTITY:
            const { id, quantity } = action.payload;
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === id 
                        ? { ...item, quantity }
                        : item
                ),
            };

        default:
            return state;
    }
};
