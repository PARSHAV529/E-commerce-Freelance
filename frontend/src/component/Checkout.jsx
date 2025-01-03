import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataProvider.jsx';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

const Checkout = () => {
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  // Redirect to home if not logged in
  if (!account) {
    navigate('/');
    return null;
  }

  const handlePayment = () => {
    alert('Order placed successfully with COD!');
    navigate('/'); // Redirect to home after order placement
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '50px auto', padding: '20px', boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="h6" gutterBottom>
        Select Payment Method:
      </Typography>
      <RadioGroup defaultValue="cod">
        <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery (COD)" />
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={handlePayment} sx={{ marginTop: 3 }}>
        Place Order
      </Button>
    </Box>
  );
};

export default Checkout;
