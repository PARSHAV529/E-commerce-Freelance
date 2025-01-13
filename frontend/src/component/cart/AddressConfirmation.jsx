import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import axios from 'axios';

const ConfirmAddress = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true); // Set loading to true when the request starts
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
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px', // Set maximum width
          padding: '20px',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: 'center' }}>
          Confirm Address
        </Typography>
        
        {/* Show loader if loading */}
        {loading ? (
          <CircularProgress />
        ) : user?.address ? (
          <>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>Street:</strong> {user.address.street}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>City:</strong> {user.address.city}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>State:</strong> {user.address.state}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              <strong>ZIP:</strong> {user.address.zip}
            </Typography>
            <Button
              variant="contained"
              onClick={handleConfirm}
              sx={{ mt: 2 }}
            >
              Confirm Address
            </Button>
          </>
        ) : (
          <Typography variant="body1">
            No address found. Please add an address first.
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default ConfirmAddress;
