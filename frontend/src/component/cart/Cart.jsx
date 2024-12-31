
import { Typography, Grid, Box,styled, Button } from "@mui/material";
import { useSelector } from "react-redux";

//compnents
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";

const Container = styled(Grid)(({ theme}) => ({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]: {
        padding: '15px 0',
    }
}))

const Header = styled(Box) `
    padding: 15px 24px;
    background: #fff
`;

const ButtonWrapper =styled(Box)`
    padding: 16px 22px;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    box-top: 1px solid #f0f0f0;
    background: #212121
    
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    width: 250px;
    border-radius: 2px;
`;

const LeftComponent = styled(Grid)(({ theme }) => ({
    paddingRight: 15,
    [theme.breakpoints.down('md')]: {
        marginBottom: 15
    }
}))

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);

    return (
       <>
            {
                cartItems.length ?
                    <Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My WishList({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item => (
                                    <CartItem item={item} />
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton onClick={()=>{console.log('dfghfh')}} style={{ color: '#fff'}}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalView cartItems={cartItems} />
                        </Grid>
                    </Container>
                : <EmptyCart />
            }
       </>
    )
}

export default Cart;