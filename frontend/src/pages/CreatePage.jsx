import React, { useState } from "react";
import {
  Container,
  Stack,
  TextField,
  Typography,
  Paper,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    setSnackbar({
      open: true,
      message,
      severity: success ? "success" : "error",
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" }); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAddProduct();
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} mt={5}>
        <Typography variant="h4" align="center">
          Create New Product
        </Typography>

        <Paper elevation={3} sx={{ padding: 3 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Product Name"
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                fullWidth
                required
              />

              <TextField
                label="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                fullWidth
                required
              />

              <TextField
                label="Image URL"
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                fullWidth
                required
              />

              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePage;
