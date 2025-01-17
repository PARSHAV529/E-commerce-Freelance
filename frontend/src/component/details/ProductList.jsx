import React from "react";
import { Box, Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Container = styled(Box)`
    padding: 20px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ItemBox = styled(Box)`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
    }
`;

const ItemImage = styled("img")`
    width: auto;
    height: 150px;
    margin-bottom: 10px;
`;

const ItemTitle = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
`;

const ItemDiscount = styled(Typography)`
    font-size: 14px;
    font-weight: bold;
    color: #f76a2f;
`;

const ProductList = ({ products }) => {
    return (
        <Container>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Link
                            to={`/product/${product.id}`}
                            style={{ textDecoration: "none", color: "#212121" }}
                        >
                            <ItemBox>
                                <ItemImage src={product.url} alt={product.title.shortTitle} />
                                <ItemTitle>{product.title.shortTitle}</ItemTitle>
                                <ItemDiscount>{product.discount}</ItemDiscount>
                            </ItemBox>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductList;
