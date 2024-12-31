import { useState,useContext } from 'react';

import { Dialog,Box,TextField,Typography, Button, styled } from '@mui/material';

import { authenticateSignup, authenticateLogin } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Components = styled(Box)`
    height: 65vh;
    width: 80vh;
`;

const Image = styled(Box)`
    background: #212121 url(https://i.imgur.com/heLmARq.png);
    height: 100%;
    width: 43%;
`;
const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #212121;
    color: #fff;
    height: 40px;
    boder-radius: 2px;
    font-size: 20px;
    font-weight: 600;
`;

const RequsetEnterOTP = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #212121;
    height: 43px;
    boder-radius: 2px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%)
`;

const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`;

const CreateAnAccount = styled(Typography)`
    font-size: 16px;
    color: #212121;
    font-weight: 600;
    padding: 35px 1px ;
    text-align: centre;
    cursor: pointer;
`;
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600
`

const accountIntitiaValues = {
    login: {
        view: 'login'
    },
    signup: {
        view: 'sign'
    },
}

const signupIntitalValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    passwrd: '',
    phone: '',
}

const loginInitialVlues = {
    username: '',
    password: '',
}


const LoginDialog = ({ open, setOpen }) => {

    const [account, toggleAccount ] = useState(accountIntitiaValues.login);
    const [signup, setSignup ] = useState(signupIntitalValues);
    const [login,setLogin] = useState(loginInitialVlues);
    const [error, setError] = useState(false);

    const { setAccount } = useContext(DataContext);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountIntitiaValues.login);
        setError(false);
    }

    const toggleSignup = () => {
        toggleAccount(accountIntitiaValues.signup);
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name] : e.target.value});
    }

    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (!response) return;
        handleClose();
        setAccount(signup.firstname);
    }
    
    const onValuechange = (e) => {
        setLogin({ ...login,[e.target.name]: e.target.value});
    }

    const loginUser = async () => {
        let response =  await authenticateLogin(login);
        console.log(response);
        if(response.status ===200) {
            handleClose();
            setAccount(response.data.data.firstname);
        } else {
            setError(true);
        }
    }    
    return (
       <Dialog open ={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset'}}}>
            <Components>
                <Box style={{ display: 'flex', height: '100%'}}>
                    <Image></Image>
                    {
                            account.view === 'login'?
                            <Wrapper>
                                <TextField variant="standard" onChange={(e) => onValuechange(e)} name='username' label ="Enter Username"/>
                               {error && <Error>Please enter valid username or password </Error>}
                                <TextField variant="standard" onChange={(e) => onValuechange(e)} name='password' label="Enter Password"/>
                                <Text>By continuing, you agree to Amizara Emporium Terms of Use and Privacy Policy. </Text>
                                <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                                <Typography style={{ textAlign: 'center'}}>OR</Typography>
                                <RequsetEnterOTP>Requset Enter OTP </RequsetEnterOTP>
                                <CreateAnAccount onClick={() => toggleSignup()}>New In Amizara?Create an Account</CreateAnAccount>
                            </Wrapper>
                        :
                        <Wrapper>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='firstname' label="Enter Firstname"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='lastname' label="Enter Lastname"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label="Enter Username"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label="Enter Email"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label="Enter Password"/>
                                <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone' label="Enter Phone"/>
                                <LoginButton onClick={() => signupUser()} >Contine</LoginButton>
                            </Wrapper>
                        }        
                </Box>    
            </Components>
       </Dialog>
    )
}

export default LoginDialog;