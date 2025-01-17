import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { getProductDetails } from '../../redux/actions/productActions';

import { Box, styled, Typography } from "@mui/material";

import ActionItem from "./ActionItems";
import ProductDetail from "./ProductDetail";
import Slide from "../home/slide"; // Reusing Slide component
import Reviews from "./Review";

const Components = styled(Box)`
    margin-top: 55px;
    background: #f9f9f9;
    padding: 20px 0;
`;

const Container = styled(Box)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '15px'
    }
}));

const RightContainer = styled(Box)`
    margin-left: 20px;
    flex: 1;
    [theme.breakpoints.down('md')]: {
        margin-left: 0;
        margin-top: 20px;
    }
`;

const Suggestions = styled(Box)`
    margin: 40px 0;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled(Typography)`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
`;

const DetailView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);
    const { products } = useSelector(state => state.getProducts);

    useEffect(() => {
        if (product && id !== product.id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id, product]);

    // Group remaining products by type, excluding top 5 of each type and the current product
    const groupedSuggestions = products.reduce((acc, p) => {
        if (p.id !== id) {
            const isTop5 = products
                .filter(product => product.type === p.type)
                .slice(0, 5)
                .some(topProduct => topProduct.id === p.id);

            if (!isTop5) {
                acc[p.type] = acc[p.type] || [];
                acc[p.type].push(p);
            }
        }
        return acc;
    }, {});

    return (
        <Components>
            {
                product && Object.keys(product).length &&
                <>
                    <Container>
                        <RightContainer>
                            <ProductDetail product={product} />
                        </RightContainer>
                    </Container>

                    <Reviews productId={id} />

                    <Suggestions>
                        {
                            Object.keys(groupedSuggestions).map(type => (
                                <Box key={type} mb={4}>
                                    <SectionTitle>{`More ${type}s You May Like`}</SectionTitle>
                                    <Slide
                                        products={groupedSuggestions[type]}
                                        title=""
                                        timer={false}
                                    />
                                </Box>
                            ))
                        }
                    </Suggestions>
                </>
            }
        </Components>
    );
};

export default DetailView;
