

import { Typography, Box, styled } from "@mui/material";

const Component = styled(Box)`
    height: 65vh;
    width: 80%;
    background: #fff;
    margin: 80px 140px
`;

const Container = styled(Box)`
    text-align: center;
    padding-top: 50px;
   
`;

const EmptyCart = () => {
    const imgURL = 'https://img.freepik.com/premium-vector/empty-cart_701961-7086.jpg'
    return (
        <Component>
            <Container>
                <img src={imgURL} alt="empty" style={{width: '25%'}} />
                <Typography style={{ fontSize: 25}}>Your Cart is Empty Now</Typography>
                <Typography style={{ fontSize: 20}}>Please Add Items In It</Typography>
            </Container>
        </Component>
    )
}

export default EmptyCart;