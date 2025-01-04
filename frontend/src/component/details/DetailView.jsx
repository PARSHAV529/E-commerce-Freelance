import { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import { getProductDetails } from '../../redux/actions/productActions';

import { Box, Grid, styled, Typography } from "@mui/material";

import ActionItem from "./ActionItems";
import ProductDetail from "./ProductDetail";
import Slide from "../home/slide"; // Assuming Slide is the same as in your home page
import Reviews from "./Review";

const Components = styled(Box)`
    margin-top: 55px;
    background: #f9f9f9; /* Softer background color for better contrast */
    padding: 20px 0;
`;

const Container = styled(Box)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '8px', /* Rounded corners */
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', /* Subtle shadow for depth */
    padding: '20px',
    marginBottom: '20px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '15px'
    }
}));

const RightContainer = styled(Box)`
    margin-left: 20px;
    flex: 1; /* Take available space */
    [theme.breakpoints.down('md')]: {
        margin-left: 0;
        margin-top: 20px;
    }
`;

const Suggestions = styled(Box)`
    margin: 40px 0;
    padding: 20px;
    background: #ffffff;
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const SectionTitle = styled(Typography)`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333; /* Neutral color */
`;

const DetailView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { loading, product } = useSelector(state => state.getProductDetails);
    const { products } = useSelector(state => state.getProducts); // Assuming all products are in this state

    useEffect(() => {
        if (product && id !== product.id)
            dispatch(getProductDetails(id));
    }, [dispatch, id, product, loading]);

    // Group products by type, excluding the current product
    const groupedSuggestions = products.reduce((acc, p) => {
        if (p.id !== id) {
            acc[p.type] = acc[p.type] || [];
            acc[p.type].push(p);
        }
        return acc;
    }, {});

    console.log(product);

    return (
        <Components>
            {
                product && Object.keys(product).length &&
                <>
                    <Container container>
                        {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                            <ActionItem product={product} />
                        </Grid> */}
                        <RightContainer>
                            <ProductDetail product={product} />
                        </RightContainer>
                    </Container>
                    
                    <Reviews productId={id} /> {/* Add Reviews Component */}
                    {/* Suggestions Section */}
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
