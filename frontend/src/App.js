import { useEffect, useContext } from 'react';
import { isExpired, decodeToken } from "react-jwt";import axios from 'axios';

// Components
import Header from './component/header/header.jsx';
import Home from './component/home/Home.jsx';
import DetailView from './component/details/DetailView.jsx';
import Cart from './component/cart/Cart.jsx';

import DataProvider, { DataContext } from './context/DataProvider.jsx';
import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Checkout from './component/Checkout.jsx';

function App() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}function ProtectedRoute({ children }) {
  const { account } = useContext(DataContext);

  // Check if the user is logged in
  if (!account) {
    // Show an alert before redirecting
    alert("Please log in first to place the order");
    return <Navigate to="/" />; // Redirect to home page
  }

  return children; // If logged in, render the protected route's children
}
function MainApp() {
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const myDecodedToken = decodeToken(token);
        if (!myDecodedToken) {
          // navigate('/login')
          console.log("token not avaliable");
          
        } else {
          fetchUserData()
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // localStorage.removeItem('token'); // Remove invalid token
      }
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      
      let config = {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        }
      }
    
      const res = await axios.get("http://localhost:8000/user", config)
      setAccount(res.data.username);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // localStorage.removeItem('token'); // Remove token if fetching user fails
    }
  };

  return (
    <BrowserRouter>
    <Header />
    <Box style={{ marginTop: 74 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DetailView />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  </BrowserRouter>
  );
}

export default App;
