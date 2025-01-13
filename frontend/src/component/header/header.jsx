import { useState } from "react";
import { AppBar, Toolbar, styled, Box, IconButton, Drawer, List, ListItem, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import Search from "./Search.jsx";
import CustomButtons from "./CustomButtons.jsx";
import { Link } from "react-router-dom";

const StyledHeader = styled(AppBar)`
  background: #1e1e1e;
  height: 70px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0 20px;
`;

const Component = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;

  & img {
    margin-right: 10px;
  }

  & > div {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
`;

const CustomButtonsWrapper = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  marginLeft: "20px", // Adding space between Search and other buttons
  [theme.breakpoints.down("md")]: {
    marginLeft: 0,
  },
}));

const Header = () => {
  const logoURL = "https://i.ibb.co/q9c4SWL/07b47fd7d46c.png";
  const [open, setOpen] = useState(false);

  // Fetch userType from Redux store
  const userType = useSelector((state) => state.user.user?.userType);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const list = () => (
    <Box style={{ width: 250 }} onClick={handleClose}>
      <List>
        <ListItem button>
          <CustomButtons />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <StyledHeader>
      <Toolbar style={{ minHeight: 50, display: "flex", justifyContent: "space-between" }}>
        <MenuButton color="inherit" onClick={handleOpen}>
          <Menu />
        </MenuButton>

        <Drawer open={open} onClose={handleClose}>
          {list()}
        </Drawer>

        <Component to="/">
          <img src={logoURL} alt="logo" style={{ width: 80, height: 18 }} />
          <Box>Emporium</Box>
        </Component>

        {userType === "user" && (
        //   <SearchWrapper>
            <Search />
        //   </SearchWrapper>
        )}

        <CustomButtonsWrapper>
          <CustomButtons />
        </CustomButtonsWrapper>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;
