

import {Box , styled, Typography } from '@mui/material'

import { navData } from '../../constants/data';

const Component = styled(Box)(({ theme }) => ({
    'display': 'flex',
    margin: '55px 150px 0 130px',
    justifyContent: 'space-between',
    overflow: 'hidden',
    
    [theme.breakpoints.down('lg')]: {
        maregin: 0
    }
}))

const Container = styled(Box)`
    padding: 12px 6px;
    text-align: center;
`

const Text = styled(Typography)`
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
`

const NavBar = () => {
    return(
        <Box style={{ background: '#fff'}}>
            <Component>
                {
                    navData.map(data => (
                        <Container>
                            <img src={data.url} alt="nav" style={{ width: 110 }} />
                            <Text>{data.text}</Text>
                        </Container>    
                    ))
                }
            </Component>
        </Box>
    )
}
export default NavBar;