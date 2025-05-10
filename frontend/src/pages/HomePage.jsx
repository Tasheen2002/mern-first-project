import React, { useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { ProductCart } from "../components/ProductCart";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: 4 }}> 
      <Box display="flex" flexDirection="column" gap={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          sx={{
            background: "linear-gradient(to right, cyan, blue)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Current Products
        </Typography>

        <Grid
          container
          spacing={8}
          justifyContent={"center"} // Align items to the left
          alignItems={"flex-start"}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCart product={product} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" align="center">
                No Products Found 😔
                <MuiLink
                  component={Link}
                  to="/create"
                  color="primary"
                  underline="hover"
                  sx={{ ml: 1 }}
                >
                  Create a Product
                </MuiLink>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
