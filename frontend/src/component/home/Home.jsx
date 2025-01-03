import { useEffect } from 'react';

// Components
import NavBar from "./NavBar";
import Banner from './Banner';
import Slide from './slide';
import MidSection from './MidSection';

import { Box, styled } from "@mui/material"; 

import { getProducts } from '../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const Component = styled(Box)`
    padding:  10px;
    background: #F2F2F2;
`;

const Home = () => {
    const { products } = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    // Function to filter products by type
    const filterProductsByType = (type) => {
        return products.filter(product => product.type === type);
    };

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <Slide products={filterProductsByType("dress")} title="Dress & Kurtis" timer={false} />
                {/* <Slide products={filterProductsByType("Kurti")} title="Kurtis" timer={false} /> */}
                <Slide products={filterProductsByType("gown")} title="Gown" timer={false} />
                <Slide products={filterProductsByType("Saree")} title="Saree" timer={false} />
                <Slide products={filterProductsByType("choli")} title="Bridal Lehenga" timer={false} />
                <MidSection />
            </Component>
        </>
    );
};

export default Home;
