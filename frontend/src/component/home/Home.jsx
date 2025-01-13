import React, { useEffect, useState } from 'react';

// Components
import NavBar from "./NavBar";
import Banner from './Banner';
import Slide from './slide';
import MidSection from './MidSection';

import { Box, styled, CircularProgress } from "@mui/material"; 

import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Component = styled(Box)`
    padding: 10px;
    background: #F2F2F2;
`;

const LoaderContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Home = () => {
    const { products } = useSelector(state => state.getProducts);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        // Simulate data fetching
        const fetchData = async () => {
            setLoading(true);
            await dispatch(getProducts());
            setLoading(false);
        };
        fetchData();
    }, [dispatch]);

    // Function to filter products by type
    const filterProductsByType = (type) => {
        return products.filter(product => product.type === type);
    };

    if (loading) {
        return (
            <LoaderContainer>
                <CircularProgress size={60} />
            </LoaderContainer>
        );
    }

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <Slide products={filterProductsByType("dress")} title="Dress & Kurtis" timer={false} />
                <Slide products={filterProductsByType("gown")} title="Gown" timer={false} />
                <Slide products={filterProductsByType("Saree")} title="Saree" timer={false} />
                <Slide products={filterProductsByType("choli")} title="Bridal Lehenga" timer={false} />
                <MidSection />
            </Component>
        </>
    );
};

export default Home;
