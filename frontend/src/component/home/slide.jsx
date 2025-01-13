
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';

import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';

import { Box, Button, Typography,Divider, styled } from '@mui/material';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #ffffff;
`;

const Deal = styled(Box)`
    padding: 15px 20px;
    display: flex;
`;

const Timer = styled(Box)`
    display: flex;
    margin-left: 10px;
    color: #7f7f7f;
`;

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    margin-right: 25px;
    line-height: 32px;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #212121;
    border-radius: 2px;
    font-size: 13px;
    font-weight: 600;
`;

const Image = styled('img')({
    width: 'auto',
    height: 150
});

const Text = styled(Typography)`
    font-size: 16px;
    margin-top: 5px;
    font-weight: 600;
`

const Slide = ({ products , title,timer }) => {
    const timerURL = "https://imgur.com/BSCISsZ.png";

    const renderer = ({hours, minutes, seconds }) => {
        return <Box variant="span">{hours} : {minutes} : {seconds} Left</Box>;
    }
    return(
        <Component>
            <Deal>
                <DealText>{title} </DealText>
                {
                    timer &&
                    <Timer>
                        <img src={timerURL} alt="timer" style={{ width: 23, height: 25}} />
                        <Countdown date={Date.now() + 3.04e+7}  renderer={renderer} />
                    </Timer>
                }
                
                <ViewAllButton variant="contained" color="primary">View All</ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {
                    products.map(product => (
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none',color: '#212121'}}> 
                            <Box textAlign="center" style={{ padding: '25px 15px' }}>
                                <Image src={product.url} alt="product" />
                                <Text>{product.title.shortTitle}</Text>
                                <Text>{product.discount}</Text>
                            </Box>
                        </Link>
                    ))
                }
            </Carousel>
        </Component>    
    )
}

export default Slide;