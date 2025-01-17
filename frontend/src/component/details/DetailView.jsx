import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProductDetails } from "../../redux/actions/productActions";

import { Box, styled, Typography } from "@mui/material";

import ProductDetail from "./ProductDetail";
import Reviews from "./Review";
import ProductList from "./ProductList";

const Components = styled(Box)`
    margin-top: 55px;
    background: #f9f9f9;
    padding: 20px 0;
`;

const Container = styled(Box)(({ theme }) => ({
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    marginBottom: "20px",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        padding: "15px",
    },
}));

const RightContainer = styled(Box)`
    margin-left: 20px;
    flex: 1;
    [theme.breakpoints.down("md")]: {
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

    const { loading, product } = useSelector((state) => state.getProductDetails);
    const { products } = useSelector((state) => state.getProducts);

    useEffect(() => {
        if (product && id !== product.id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id, product]);

    let suggestions = [];
    if (product && Object.keys(product).length) {
        const productType = product.type; // Get the type of the current product
        const filteredProducts = products.filter((p) => p.id !== id && p.type === productType);

        // Extract top 5 products of the same type
        const top5Products = filteredProducts.slice(0, 5);

        // Get all other products excluding top 5
        suggestions = filteredProducts.filter(
            (p) => !top5Products.some((topProduct) => topProduct.id === p.id)
        );
    }

    return (
        <Components>
            {product && Object.keys(product).length && (
                <>
                    <Container>
                        <RightContainer>
                            <ProductDetail product={product} />
                        </RightContainer>
                    </Container>

                    <Reviews productId={id} />

                    <Suggestions>
                        {suggestions.length > 0 && (
                            <>
                                <SectionTitle>{`More ${product.type}s You May Like`}</SectionTitle>
                                <ProductList products={suggestions} />
                            </>
                        )}
                    </Suggestions>
                </>
            )}
        </Components>
    );
};

export default DetailView;
