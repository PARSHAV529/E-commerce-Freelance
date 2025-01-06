import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const AddAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState(user?.address || {
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/validate-pincode", { zip: formData.zip });
      setSuccess(response.data.message); // Show success message

      dispatch(updateAddress(formData)); // Update address in Redux
      navigate('/confirm-address'); // Redirect to confirm address page
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); // Show error message
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h6">Add Address</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField
        fullWidth
        label="Street"
        name="street"
        value={formData.street}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="ZIP Code"
        name="zip"
        value={formData.zip}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" onClick={handleSubmit}>
        Save Address
      </Button>
    </Box>
  );
};

export default AddAddress;
