import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/orders/${user._id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
    } finally {
      setLoading(false); // Stop loading when the request is complete
    }
  };

  return (
    <Box sx={{ margin: '50px auto', maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {/* Display loading spinner if data is being fetched */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                
                <TableCell>
                  {order.items.map((item) => (
                    <div key={item.productDetails
                      ._id}>
                      
                      {item.productDetails
.title.shortTitle} - {item.quantity} x {item.productDetails.price.mrp}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{order.orderStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default UserOrders;
