import {
    Typography,
    Box,
    Button,
    TableRow,
    Table,
    TableBody,
    TableCell,
    styled,
    Grid,
} from "@mui/material";

import { LocalOffer as Badge } from "@mui/icons-material";
import ActionItem from "./ActionItems";

const ProductContainer = styled(Box)`
    display: flex;
    padding: 20px;
    gap: 20px;
`;

const ProductImageContainer = styled(Box)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProductImage = styled("img")`
    width: 100%;
    max-width: 300px;
    object-fit: cover;
`;

const DetailsContainer = styled(Box)`
    flex: 2;
    display: flex;
    flex-direction: column;
`;

const ActionButtons = styled(Box)`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const SmallText = styled(Box)`
    font-size: 14px;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`;

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00cc00;
    font-size: 18px;
`;

const BestOffer = styled(Typography)`
    margin-top: 17px;
`;

const ProductDetail = ({ product }) => {
    const adURL = "https://imgur.com/HWJlsoE.png";
    const date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);

    return (
        <ProductContainer>
            {/* Left: Product Image */}
            <ProductImageContainer>
                <ProductImage src={product.url} alt="Product" />
            </ProductImageContainer>

            {/* Right: Product Details */}
            <DetailsContainer>
                <Typography variant="h5">{product.title.longTitle}</Typography>
                <Typography
                    style={{ marginTop: 5, color: "#878787", fontSize: 14 }}
                >
                    8 Rating & 1 Review
                </Typography>
                <BestOffer style={{ marginTop: 13 }}>
                    <Box component="span" style={{ marginLeft: 15 }}>
                        <strike>₹{product.price.orignalCost}</strike>
                    </Box>
                    &nbsp;&nbsp;&nbsp;
                    <Box
                        component="span"
                        style={{ fontSize: 22, color: "#212121" }}
                    >
                        ₹{product.price.mrp}
                    </Box>
                    &nbsp;&nbsp;&nbsp;
                    <Box
                        component="span"
                        style={{ fontSize: 17, color: "#388E3C" }}
                    >
                        {product.price.discount}
                    </Box>
                </BestOffer>

                <Typography
                    style={{
                        marginTop: 16,
                        fontSize: 18,
                        marginRight: 7,
                    }}
                >
                    Select Your Size:
                </Typography>
                <Box style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                    <Button variant="outlined">M</Button>
                    <Button variant="outlined">L</Button>
                    <Button variant="outlined">XL</Button>
                    <Button variant="outlined">XXL</Button>
                </Box>

                <SmallText>
                    <Typography
                        style={{
                            fontWeight: 600,
                            marginTop: 20,
                            fontSize: 18,
                        }}
                    >
                        Best Available Offer:
                    </Typography>
                    <BestOffer style={{ fontSize: 16 }}>
                        <StyledBadge /> Applicable on: Orders above Rs. 499
                        (only on first purchase and value of your product Is
                        2499)
                    </BestOffer>
                    <BestOffer style={{ fontSize: 16 }}>
                        <StyledBadge /> Coupon code:{" "}
                        <span style={{ fontWeight: 600 }}>BUY FIRST TIME</span>
                    </BestOffer>
                </SmallText>

                <Grid item lg={4} md={8} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
            </DetailsContainer>
        </ProductContainer>
    );
};

export default ProductDetail;
