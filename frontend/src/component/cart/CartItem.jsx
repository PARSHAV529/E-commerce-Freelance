import { Typography, Box, styled, Button } from "@mui/material";
import { removeFromCart, updateItemQuantity } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";
import { addEllipsis } from "../../utils/common-utils";

import GroupButton from "./ButtonGroup"; // Import GroupButton here
import { useEffect, useState } from "react";

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    padding: 10px 0;
    background: #fff;
`;

const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column;

    & > img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border: 1px solid #f0f0f0;
        border-radius: 8px;
    }
`;

const Remove = styled(Button)`
    margin-top: 10px;
    font-size: 14px;
    color: #fff;
    background: #212121;
    margin-right: 10px;
`;

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(item.quantity || 1);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleQuantityDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    // Dispatch updated quantity to the Redux store if needed
    useEffect(() => {
        // Update quantity in the cart store
        dispatch(updateItemQuantity(item.id, quantity)); // Uncomment if you have an action for updating quantity
    }, [quantity]);

    return (
        <Component>
            <LeftComponent>
                <img src={item.url} alt="product" />
                <GroupButton quantity={quantity} onIncrease={handleQuantityIncrease} onDecrease={handleQuantityDecrease} />
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography>{addEllipsis(item.title.longTitle)}</Typography>
                <Typography style={{ margin: "20px 0px" }}>
                    <Box component="span" style={{ fontSize: 18, color: "#212121", fontWeight: 600 }}>
                        ₹ {item.price.mrp}
                    </Box>
                    &nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#878787" }}>
                        <strike>₹{item.price.orignalCost}</strike>
                    </Box>
                    &nbsp;&nbsp;&nbsp;
                    <Box component="span" style={{ color: "#388E3C" }}>{item.price.discount}</Box>
                </Typography>
                <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Component>
    );
};

export default CartItem;
