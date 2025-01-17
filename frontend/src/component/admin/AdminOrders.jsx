import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem, Modal, Typography } from '@mui/material';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ margin: '50px auto', maxWidth: 1000 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Address</TableCell>
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
                {order.user ? (
                  <Button
                    onClick={() => handleUserClick(order.user)}
                    style={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    {order.user.firstname} {order.user.lastname}
                  </Button>
                ) : 'N/A'}
              </TableCell>
              <TableCell>
                {order.user && order.user.address ? (
                  <div>
                    {order.user.address.street}, {order.user.address.city}, {order.user.address.state}, {order.user.address.zip}
                  </div>
                ) : 'N/A'}
              </TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>
                {order?.items.map((item) => (
                  <div key={item.productId}>
                    {item.productId?.title.shortTitle} - {item.quantity} x {item.price}
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

      {/* User Details Modal */}
      <Modal open={openModal} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          {selectedUser ? (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                User Details
              </Typography>
              <Typography><strong>Name:</strong> {selectedUser.firstname} {selectedUser.lastname}</Typography>
              <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography><strong>Phone:</strong> {selectedUser.phone}</Typography>
              {selectedUser.address && (
                <Typography>
                  <strong>Address:</strong> {selectedUser.address.street}, {selectedUser.address.city}, {selectedUser.address.state}, {selectedUser.address.zip}
                </Typography>
              )}
            </>
          ) : (
            <Typography>No user details available.</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminOrders;
