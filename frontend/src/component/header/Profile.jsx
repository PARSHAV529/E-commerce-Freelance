import { useState } from "react";
import { Box, Typography, Menu, MenuItem, styled } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Component = styled(Menu)`
  margin-top: 5px;
`;

const Logout = styled(Typography)`
  font-size: 14px;
  margin-left: 9px;
`;

const Profile = ({ account, setAccount }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logoutUser = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setAccount(""); // Reset account state
    navigate("/"); // Redirect to home page
  };

  return (
    <>
      <Box onClick={handleClick}>
        <Typography style={{ marginTop: 8, cursor: "pointer" }}>{account}</Typography>
      </Box>
      <Component
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            logoutUser();
          }}
        >
          <LogoutIcon color="primary" fontSize="small" />
          <Logout>Logout</Logout>
        </MenuItem>
      </Component>
    </>
  );
};

export default Profile;
