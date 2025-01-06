import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

const ConfirmAddress = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    console.log(user);
    
    try {
      const response = await axios.put('http://localhost:8000/update-address', {
        userId: user?._id,
        address: user?.address,
      });

      if (response.status === 200) {
        alert('Address confirmed successfully');
        navigate('/checkout'); // Proceed to checkout
      }
    } catch (error) {
      console.error('Error confirming address:', error);
      alert('There was an error confirming your address');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h6">Confirm Address</Typography>
      {user?.address ? (
        <>
          <Typography>Street: {user.address.street}</Typography>
          <Typography>City: {user.address.city}</Typography>
          <Typography>State: {user.address.state}</Typography>
          <Typography>ZIP: {user.address.zip}</Typography>
          <Button variant="contained" onClick={handleConfirm} sx={{ mt: 2 }}>
            Confirm Address
          </Button>
        </>
      ) : (
        <Typography>No address found. Please add an address first.</Typography>
      )}
    </Box>
  );
};

export default ConfirmAddress;
