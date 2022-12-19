import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../Services/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PhishingIcon from "@mui/icons-material/Phishing";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  function handleLoginClick() {
    navigate("/login");
  }

  function handleProfileClick() {
    navigate("/profile");
  }

  function handleFavoritesClick() {
    navigate("/favorites");
  }

  function handleReviewsClick() {
    navigate("/profile");
  }

  async function handleLogout() {
      await logout();
      navigate("/login");
  }

  function handleToolbarCLick() {
    navigate("/");
  }

  useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setPhotoUrl(currentUser.photoURL);
    }
  }, [currentUser]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <PhishingIcon
              fontSize="large"
              style={{ verticalAlign: "middle", display: "inline-flex" }}
            />
            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
              component={Link}
              to="/"
              style={{
                textDecoration: "none",
                boxShadow: "none",
                color: "white",
              }}
            >
              Schweizer Angelplätze
            </Typography>
            {currentUser === null ? (
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
            ) : (
              <>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenUserMenu}
                      color="inherit"
                    >
                      <Avatar
                        src={photoUrl || "/static/images/avatar/1.jpg"}
                      ></Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                      <MenuItem onClick={() => {handleCloseUserMenu(); handleProfileClick();}}>
                        <Typography textAlign="center">Profil</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => {handleCloseUserMenu(); handleFavoritesClick();}}>
                        <Typography textAlign="center">Favoriten</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => {handleCloseUserMenu(); handleLogout();}}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                  </Menu>
                </Box>
              </> )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
