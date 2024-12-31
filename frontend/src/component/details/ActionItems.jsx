import {useState } from "react";

import { Box, Button, styled } from "@mui/material"

import { ShoppingCartCheckout as Cart } from '@mui/icons-material';

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";




const LeftContainer = styled(Box)(({ theme }) => ({
      minWidth: '40%',
      padding: '40px 0 0 80px',
      [theme.breakpoints.down('lg')]: {
            padding: '20px 40px',
      }
}))
      

const Image = styled('img')({
      padding: '15px'
});

const StyledButton = styled(Button)(({ theme }) => ({
      width: '46%',
      height: '50px',
      borderRadius: '2px',
      [theme.breakpoints.down('lg')]: {
            width: '46%'
      },
      [theme.breakpoints.down('sm')]: {
            width: '46%'
      }
}));
     


const ActionItem = ({ product }) => {

      

      const navigate = useNavigate();
      const dispatch = useDispatch();
      
      const [quantity, setQuantity] = useState(1);

      const { id } = product;
      const addItemToCart = () => {
            dispatch(addToCart(id,quantity));
            navigate('/cart');
      }

      const buyNow = () => {
           
         
      }
     
    return (
          <LeftContainer>
                  {/* <Box style={{ padding: '15px 20px',border: '1px solid #f0f0f0',width: '90%',}}>
                        <Image src={product.detailUrl} />
                  </Box> */}
                <StyledButton onClick={() => addItemToCart()} style={{background:'orange', color: '#fff', marginRight: 10}}><Cart/>WISHLIST</StyledButton>
                <StyledButton onClick={() => buyNow()} style={{color:'#fff',background: '#212121'}} >Grab Now</StyledButton>
          </LeftContainer>
    )
}

export default ActionItem;  