import { useEffect, useContext } from 'react';
import { decodeToken } from "react-jwt";
import axios from 'axios';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Header from './component/header/header.jsx';
import Home from './component/home/Home.jsx';
import DetailView from './component/details/DetailView.jsx';
import Cart from './component/cart/Cart.jsx';
import Checkout from './component/Checkout.jsx';
import AddAddress from './component/cart/AddressForm.jsx';
import ConfirmAddress from './component/cart/AddressConfirmation.jsx';
import UserOrders from './component/UserOrders.jsx';
import AdminOrders from './component/admin/AdminOrders.jsx';

// Context and Redux
import DataProvider, { DataContext } from './context/DataProvider.jsx';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice.js';

// PrivateRoute Component
import PrivateRoute from './component/PrivateRoutes.jsx';
import AdminAddProduct from './component/admin/AddProduct.jsx';

function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}

function MainApp() {
  const { setAccount } = useContext(DataContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const myDecodedToken = decodeToken(token);
        if (!myDecodedToken) {
          console.log("Token not available");
        } else {
          fetchUserData();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const fetchUserData = async () => {
    try {
      let config = {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      };

      const res = await axios.get("http://localhost:8000/user", config);
      dispatch(setUser(res.data));
      setAccount(res.data.username);   
     } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Box style={{ marginTop: 74 }}>
        <Routes>
          <Route path="/" element={<PrivateRoute requiredUserType="user" isHomePage={true}><Home /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute requiredUserType="user"><DetailView /></PrivateRoute>} />
          <Route path="/add-address" element={<PrivateRoute requiredUserType="user"><AddAddress /></PrivateRoute>} />
          <Route path="/confirm-address" element={<PrivateRoute requiredUserType="user"><ConfirmAddress /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute requiredUserType="user"><Cart /></PrivateRoute>} />
          <Route path="/order" element={<PrivateRoute requiredUserType="user"><UserOrders /></PrivateRoute>} />
          <Route path="/admin-order" element={<PrivateRoute requiredUserType="admin"><AdminOrders /></PrivateRoute>} />
          <Route path="/add-products" element={<PrivateRoute requiredUserType="admin"><AdminAddProduct /></PrivateRoute>} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute requiredUserType="user">
                <Checkout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
