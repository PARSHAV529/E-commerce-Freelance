import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);
  console.log(user._id)

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/orders/${user._id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch user orders:', error);
    }
  };

  return (
    <Box sx={{ margin: '50px auto', maxWidth: 800 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
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
                  <div key={item.productId._id}>
                    {item.productId.title} - {item.quantity} x {item.price}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.orderStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserOrders;
