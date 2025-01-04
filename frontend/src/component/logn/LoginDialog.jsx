import { useState, useContext } from 'react';
import { Dialog, Box, TextField, Typography, Button, styled } from '@mui/material';
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
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #212121;
    color: #fff;
    height: 40px;
    border-radius: 2px;
    font-size: 20px;
    font-weight: 600;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const accountInitialValues = {
    login: {
        view: 'login'
    },
    signup: {
        view: 'signup'
    }
};

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};

const loginInitialValues = {
    username: '',
    password: ''
};

const LoginDialog = ({ open, setOpen }) => {
    const [account, toggleAccount] = useState(accountInitialValues.login);
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);

    const { setAccount } = useContext(DataContext);

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    };

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    };

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    };
    const signupUser = async () => {
        let response = await authenticateSignup(signup);
        if (response?.status === 200) {
            const { data } = response.data;
            localStorage.setItem('token', data.token); // Store the JWT token
            handleClose();
            setAccount(signup.username);
        } else {
            setError(true); // Show error if signup fails
        }
    };
    

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        let response = await authenticateLogin(login);
        if (response?.status === 200) {
            const {  data } = response.data;
            localStorage.setItem('token', data.token); // Store the JWT token
            handleClose();
console.log(data);
            setAccount(data.username);
        } else {
            setError(true);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }}>
            <Components>
                <Box style={{ display: 'flex', height: '100%' }}>
                    <Image />
                    {account.view === 'login' ? (
                        <Wrapper>
                            <TextField
                                variant="standard"
                                onChange={(e) => onValueChange(e)}
                                name="username"
                                label="Enter Username"
                            />
                            {error && <Error>Please enter a valid username or password</Error>}
                            <TextField
                                variant="standard"
                                onChange={(e) => onValueChange(e)}
                                name="password"
                                label="Enter Password"
                            />
                            <Typography>
                                By continuing, you agree to Amizara Emporium Terms of Use and Privacy Policy.
                            </Typography>
                            <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <Button variant="contained" color="secondary">
                                Request Enter OTP
                            </Button>
                            <Typography
                                style={{ marginTop: '20px', textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => toggleSignup()}
                            >
                                New to Amizara? Create an Account
                            </Typography>
                        </Wrapper>
                    ) : (
                        <Wrapper>
                            <TextField
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                                name="firstname"
                                label="Enter Firstname"
                            />
                            <TextField
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                                name="lastname"
                                label="Enter Lastname"
                            />
                            <TextField
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                                name="username"
                                label="Enter Username"
                            />
                            <TextField
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                                name="email"
                                label="Enter Email"
                            />
                            <TextField
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                                name="password"
                                label="Enter Password"
                            />
                            <TextField
                                variant="standard"
                                onChange={(e) => onInputChange(e)}
                                name="phone"
                                label="Enter Phone"
                            />
                            <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
                        </Wrapper>
                    )}
                </Box>
            </Components>
        </Dialog>
    );
};

export default LoginDialog;
