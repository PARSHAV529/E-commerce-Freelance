import { useState } from "react";
import {
    Typography,
    Box,
    Button,
    styled,
    Grid,
} from "@mui/material";
import { LocalOffer as Badge } from "@mui/icons-material";
import ActionItem from "./ActionItems";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import {  TableRow ,Table,TableBody, TableCell,  } from "@mui/material";


// Styled Components
const ProductContainer = styled(Box)`
    display: flex;
    padding: 20px;
    gap: 20px;
`;

const ProductImageContainer = styled(Box)`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: start;
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

const BestOffer = styled(Typography)`
    margin-top: 17px;
`;

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00cc00;
    font-size: 18px;
`;

const SmallText = styled(Box)`
    font-size: 14px;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`;

// ProductDetail Component
const ProductDetail = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState("");
    const dispatch = useDispatch();

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const addItemToCart = (quantity) => {
        if (selectedSize) {
            dispatch(addToCart(product.id, quantity, selectedSize));
        } else {
            alert("Please select a size");
        }
    };

    return (<>               
    
    

       
        

    <ProductContainer>
        {/* Left: Product Image */}
        <ProductImageContainer>
            <ProductImage src={product.url} alt="Product" />
        </ProductImageContainer>

        {/* Right: Product Details */}
        <DetailsContainer>
        <Typography variant="h6">{product.title.shortTitle}</Typography>
            <Typography variant="h5" style={{ marginTop: 5 }}>
                {product.title.longTitle}
            </Typography>

            <BestOffer>
                <Box component="span" style={{ marginLeft: 15 }}>
                    <strike>₹{product.price.cost}</strike>
                </Box>
                &nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ fontSize: 22, color: "#212121" }}>
                    ₹{product.price.mrp}
                </Box>
                &nbsp;&nbsp;&nbsp;
                <Box component="span" style={{ fontSize: 17, color: "#388E3C" }}>
                    {product.price.discount}
                </Box>
            </BestOffer>

            <Typography style={{ marginTop: 16, fontSize: 18 }}>
                Select Your Size:
            </Typography>
            <Box style={{ display: "flex", gap: "10px", marginTop: 10 }}>
                {product.size.map((size) => (
                    <Button
                        key={size}
                        variant="outlined"
                        onClick={() => handleSizeChange(size)}
                        style={{
                            background: selectedSize === size ? "#f0f0f0" : "",
                            borderColor: selectedSize === size ? "#388E3C" : "#f0f0f0",
                            fontWeight: selectedSize === size ? "bold" : "normal",
                        }}
                    >
                        {size}
                    </Button>
                ))}
            </Box>

             {/* Descriptions
             <Typography style={{ marginTop: 20, fontWeight: 600, fontSize: 18 }}>
                Description:
            </Typography>
            <Typography style={{ marginTop: 10, color: "#555" }}>
                {product.description}
            </Typography> */}

             {/* Best Offer */}
             <SmallText>
                {/* <Typography style={{ fontWeight: 600, marginTop: 20, fontSize: 18 }}>
                    Best Available Offer:
                </Typography>
                <BestOffer style={{ fontSize: 16 }}>
                    <StyledBadge /> Applicable on: Orders above Rs. 499
                    <BestOffer style={{  fontSize: 16 }}><StyledBadge />  Coupon code: <styled style={{ fontWeight: 600 }}>BUY FIRST TIME </styled> </BestOffer>

                </BestOffer> */}
                <BestOffer style={{ fontWeight: 600, }}> 
                        Delivery by {"date"} || 
                       <styled style={{ color: 'green'}}>Delivery Charges: Free</styled> 
                 </BestOffer>
                 <TableRow>
                    <BestOffer style={{ fontWeight: 600,color: 'black'}}> 100% Original Products</BestOffer>
                </TableRow>

                <TableRow>
                    <BestOffer> Pay on delivery might be available</BestOffer>
                </TableRow>

                <TableRow>
                    <BestOffer> Easy 1 days returns and exchanges</BestOffer>
                </TableRow>

                
                
                
            </SmallText>

            <Grid item lg={4} md={8} sm={8} xs={12}>
                <ActionItem product={product} onAddToCart={addItemToCart} />
            </Grid>
            <TableRow >
                    <BestOffer style={{ color: '#878787'  }}> Description: </BestOffer>
                    <BestOffer >{product.description}</BestOffer>
                </TableRow>
        </DetailsContainer>
    </ProductContainer>
    </>
     
    );
};

export default ProductDetail;
