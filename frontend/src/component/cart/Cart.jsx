import { Typography, Grid, Box, styled, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";

const Container = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  [theme.breakpoints.down("md")]: {
    padding: "15px 0",
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;

const ButtonWrapper = styled(Box)`
  padding: 16px 22px;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
  background: #212121;
`;

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  marginLeft: "auto",
  width: "100%",
  maxWidth: "250px",
  borderRadius: "2px",
  color: "#fff",
  backgroundColor: "#000",
  "&:hover": {
    backgroundColor: "#333",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("md")]: {
    marginBottom: 15,
  },
}));

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const  user  = useSelector((state) => state.user); 
  const address = user.user?.address;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (!address) {
      alert("Please add your address to proceed.");
      navigate("/add-address"); // Navigate to add address page
    } else {
      navigate("/confirm-address"); // Navigate to checkout page
    }
  };

  useEffect(() => {
    // Simulate loading for cart data if needed
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
          <CircularProgress />
        </Box>
      ) : cartItems.length ? (
        <Container container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography>My Cart ({cartItems.length})</Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
            <ButtonWrapper>
              <StyledButton onClick={handlePayment}>
                {address ? "Confirm Address & Place Order" : "Add Address to Continue"}
              </StyledButton>
            </ButtonWrapper>
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <TotalView cartItems={cartItems} />
          </Grid>
        </Container>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default Cart;
