import { useEffect } from 'react';


//component
import NavBar from "./NavBar";
import Banner from './Banner';
import Slide from './slide';
import MidSection from './MidSection';

import {Box, styled, } from "@mui/material"; 

import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Component = styled(Box)`
    padding:  10px;
    background: #F2F2F2;
`

const Home = () => {

   const {products} = useSelector(state => state.getProducts)
   
   console.log(products);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return(
        <>
            <NavBar />
            <Component>
                <Banner />
                <Slide products={products} title="Dress" timer={false} />
                <Slide products={products} title="Krutis " timer={false} />
                <Slide products={products} title="Gown" timer={false} />
                <Slide products={products} title="Saree " timer={false} />
                <Slide products={products} title="Bridal lehenga" timer={false} />
                <MidSection/>
            </Component>
        </> 
    )
}

export default Home;