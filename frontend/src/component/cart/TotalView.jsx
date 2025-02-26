import { useState,useEffect } from "react";

import { Typography, Box, styled } from "@mui/material";


const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p  {
        margin-bottom: 20px;
        font-size: 15px;
    }
    & > h6 {
        margin-bottom: 20px;
    }
`;

const Price = styled(Box)`
    float: right;
`;

const Discount = styled(Typography)`
    color: green;
    font-weight: 500;
`


const TotalView = ({ cartItems }) => {
    const [ price, setPrice] = useState(0);
    const [discount,setDiscount] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [cartItems])

    // console.log(cartItems);q
    

    const totalAmount = () => {
        let price = 0, discount = 0;
        console.log(cartItems);
        
        cartItems.map(item => {
            price += item.price.cost * item.quantity;
            discount += (item.price.cost  - item.price.mrp) 
        });
        setPrice(price);
        setDiscount(discount);
    }
    return (
        <Box>
            <Header>
                <Heading> Price Details</Heading>
            </Header>
            <Container>
                <Typography>Price ( {cartItems?.length} item)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography >Discount 
                    <Price component="span">₹{discount}</Price>
                </Typography>
                <Typography style={{ color: 'green'}}>Delivery Charges
                    <Price component="span">₹0</Price>
                </Typography>
                <Typography variant="h6">Total Amount
                    <Price component="span">₹{price-discount+0}</Price>
                </Typography>
                <Discount>You will save ₹{discount} on this order</Discount>

            </Container>
        </Box>
    )
}

export default TotalView;