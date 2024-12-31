import { Typography,Box, styled, Button } from "@mui/material";
import { removeFromCart } from "../../redux/actions/cartAction";
import { useDispatch } from "react-redux";

import { addEllipsis } from "../../utils/common-utils";

import ButtonGroup from "./ButtonGroup";

const Component = styled(Box)`
    border-top: 1px solid #f0f0f0;
    display: flex;
    padding: 10px 0;
    background: #fff;
`;


const LeftComponent = styled(Box)`
    margin: 20px;
    display: flex;
    flex-direction: column
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

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <Component>
            <LeftComponent>
                <img src={item.url} alt="product"/>
                <ButtonGroup />
            </LeftComponent>
            <Box style={{ margin: 20}}>
            <Typography>{addEllipsis(item.title.longTitle)}</Typography>
                <Typography style={{ margin: '20px 0px'}}>
                <Box component="span" style={{ fontSize: 18, color:'#212121',fontWeight: 600 }}>₹ {item.price.mrp}</Box>&nbsp;&nbsp;&nbsp; 
                <Box component="span" style={{ color: '#878787'}}><strike>₹{item.price.orignalCost}</strike></Box>&nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ color:'#388E3C' }}>{item.price.discount}</Box>
            </Typography>
               
                <Remove onClick={() => removeItemFromCart(item.id)}>Remove</Remove>
            </Box>
        </Component> 
    )
}

export default CartItem;