import { useState } from 'react';
import { Badge, Box, Button, Typography, styled } from '@mui/material';
import { LocalMall, Receipt } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Components
import LoginDialog from '../logn/LoginDialog';
import Profile from './Profile';
import { clearUser } from '../../redux/userSlice'; // Import action to clear user data

const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '0 3% 0 auto',
    '& > * ': {
        marginRight: '95px !important',
        alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'block',
    },
}));

const LoginButton = styled(Button)`
    font-weight: 600;
    text-transform: none;
    padding: 5px 40px;
    border-radius: 5px;
    box-shadow: none;
    font-size: 20px;
    background: #212121;
    color: #fff;
`;

const CustomButtons = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    // Use Redux to get account and cartItems
    const account = useSelector((state) => state.user.user?.username);
    const { cartItems } = useSelector((state) => state.cart);

    const openDialog = () => {
        setOpen(true);
    };

    const handleLogout = () => {
        dispatch(clearUser()); // Clear user data from Redux
    };

    return (
        <Wrapper>
            {account ? (
                <Profile account={account} onLogout={handleLogout} />
            ) : (
                <LoginButton onClick={openDialog}>Login</LoginButton>
            )}

            {/* <Typography style={{ marginTop: 10, width: 130, fontSize: 18 }}>
                Explore More
            </Typography> */}

            <Container to="/order">
                <Badge color="primary">
                    <Receipt style={{ marginTop: 3, fontSize: 22, marginRight: 4 }} />
                </Badge>
                <Typography style={{ marginTop: 5, fontSize: 18 }}>Orders</Typography>
            </Container>

            <Container to="/cart">
                <Badge badgeContent={cartItems?.length} color="primary">
                    <LocalMall style={{ marginTop: 3, fontSize: 22, marginRight: 4 }} />
                </Badge>
                <Typography style={{ marginTop: 5, fontSize: 18 }}>Cart</Typography>
            </Container>

            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
    );
};

export default CustomButtons;
