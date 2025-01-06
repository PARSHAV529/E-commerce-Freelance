import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch data from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);

  // Map cart items to match order schema
  const mappedItems = cartItems.map((item) => ({
    productId: item._id, // Assuming `_id` is the product ID
    quantity: item.quantity,
    price: item.price.mrp,
  }));

  // Calculate total amount
  const totalAmount = mappedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    // Prepare order details
    const orderDetails = {
      userId: user._id,
      items: mappedItems,
      totalAmount,
    };

    try {
      const response = await axios.post('http://localhost:8000/place-order', orderDetails);
      setSuccess(response.data.message);
      setLoading(false);
      navigate('/'); // Redirect to home after order placement
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  // Redirect to home if user is not logged in
  if (!user) {
    navigate('/');
    return null;
  }

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
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Alert severity="error" sx={{ marginTop: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ marginTop: 2 }}>{success}</Alert>}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        sx={{ marginTop: 3 }}
        disabled={loading}
      >
        Place Order
      </Button>
    </Box>
  );
};

export default Checkout;
