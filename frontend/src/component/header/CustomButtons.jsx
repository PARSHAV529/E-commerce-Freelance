import { useState, useContext } from 'react';

import { Badge, Box, Button, Typography , styled } from '@mui/material';
import {LocalMall} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { DataContext } from '../../context/DataProvider';

//components
import LoginDialog from '../logn/LoginDialog';
import Profile from './Profile';


const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    margin: '0 3% 0 auto',
    '& > * ':{
        marginRight: '95px !important',
       
        alignItems: 'center',
    },
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}))

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
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

    const [ open , setOpen ] = useState(false);

    const { account,setAccount } = useContext(DataContext);

    const { cartItems } = useSelector(state => state.cart);

    const openDialog = () => {
        setOpen(true);
    }

    return(
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                <LoginButton  onClick={() => openDialog()}>Login</LoginButton>
            }
            

            <Typography style={{marginTop: 10 , width: 130, fontSize: 18 }}>Explore More</Typography>

            <Container to="/cart">
                <Badge badgeContent={cartItems?.length} color='primary' >
                    <LocalMall  style={{ marginTop: 3, fontSize: 22, marginRight: '4' }} />
                </Badge>
                <Typography style={{ marginTop: 5 ,fontSize: 18, }}>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen}/>
        </Wrapper>
    )
}

export default CustomButtons;