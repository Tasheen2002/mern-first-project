import React from "react";
import { Container, Box, Typography, IconButton, Button } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import NightlightRoundOutlinedIcon from "@mui/icons-material/NightlightRoundOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const Navbar = ({ colorMode, toggleColorMode }) => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="100%"
      sx={{
        px: 2,
        py: 1,
        backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#1c1c1c",
      }}
    >
      <Box
        display="flex"
        height={64}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }}
      >
        {/* Left side: Title and Cart Icon */}
        <Box display="flex" alignItems="center">
          <Typography
            variant="h4"
            component="div"
            sx={{
              background: "linear-gradient(to right, cyan, blue)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "bold",
              pr: 1,
            }}
          >
            <RouterLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              PRODUCT STORE
            </RouterLink>
          </Typography>
          <ShoppingCartOutlinedIcon sx={{ fontSize: 40 }} />
        </Box>

        {/* Right side: Add and Theme Toggle */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="primary" component={RouterLink} to="/create">
            <AddBoxOutlinedIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <Button onClick={toggleColorMode} variant="outlined">
            {colorMode === "light" ? (
              <NightlightRoundOutlinedIcon />
            ) : (
              <WbSunnyOutlinedIcon />
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Navbar;
