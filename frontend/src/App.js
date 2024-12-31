

//components
import Header from './component/header/header.jsx';
import Home from './component/home/Home.jsx';
import DetailView from './component/details/DetailView.jsx';
import Cart from './component/cart/Cart.jsx';

import DataProvider from './context/DataProvider.jsx';

import { Box } from '@mui/material'


import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 74 }}>
          <Routes>
           <Route path='/' element={ <Home />} />
           <Route path='/product/:id' element= {<DetailView />} />
           <Route path='/cart' element={<Cart />} />
          </Routes>
        </Box> 
      </BrowserRouter>  
    </DataProvider>
  );
}

export default App;
