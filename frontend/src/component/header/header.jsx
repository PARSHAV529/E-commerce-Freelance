
import { useState } from 'react';
import { AppBar,Toolbar, styled, Box,IconButton,Drawer,List , ListItem, Typography } from '@mui/material';

import {Menu} from '@mui/icons-material';

// component
import Search from './Search.jsx';

import CustomButtons from './CustomButtons.jsx';
import { Link } from 'react-router-dom';

const StyledHeader = styled(AppBar)`
    background: #212121;
    height: 70px;
`

const Component = styled(Link)`
  margin-left: 1%;
  margin-Top: 1%;
  text-decoration: none;
  color: #fff;
`;

const CustomButtonsWrapper = styled(Box)(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    
    [theme.breakpoints.down('md')]: {
        display: 'block'
    }
}))


const Header = () => {
    
    const logoURL="https://i.ibb.co/q9c4SWL/07b47fd7d46c.png"

    const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    }

    const list = () => (
        <Box style={{ width: 200}} onClick={handleClose}>
            <List>
                <ListItem button>
                <CustomButtons />
                </ListItem>
            </List>
        </Box>
    )

    return (
        <StyledHeader>
            <Toolbar style={{ minHeight : 50 }}>
            <MenuButton color='inherit' onClick={handleOpen}>
                <Menu />
            </MenuButton>

            <Drawer open={open} onClose={handleClose}>
                {list()}
            </Drawer>


                <Component to='/'>
                    <img src={logoURL} alt="logo" style={{ width: 80, height: 18 }} />
                    <Box>
                        <Typography style={{marginLeft: 10, fontSize: 18 }}>Emporium</Typography>
                    </Box>
                </Component>
                <Search /> 
                <CustomButtonsWrapper>
                    <CustomButtons />
                </CustomButtonsWrapper>
            </Toolbar>          
        </StyledHeader>
    )
}

export default Header;