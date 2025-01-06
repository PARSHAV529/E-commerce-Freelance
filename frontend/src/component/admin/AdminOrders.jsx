import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem } from '@mui/material';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/admin/orders/${orderId}`, { orderStatus: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Failed to update order status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ margin: '50px auto', maxWidth: 1000 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {/* Display User Details */}
                {order.user ? `${order.user.firstname} ${order.user.lastname}` : 'N/A'}
              </TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>
                {/* Display Item Details */}
                {order.items.map((item) => (
                  <div key={item.productId._id}>
                    {item.productId.title.shortTitle} - {item.quantity} x {item.price}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>
                <Select
                  value={order.orderStatus}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <p>Updating status...</p>}
    </Box>
  );
};

export default AdminOrders;
