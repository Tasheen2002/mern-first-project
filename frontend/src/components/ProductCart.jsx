import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProductStore } from "../store/product";

export const ProductCart = ({ product }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const { deleteProduct, updateProduct } = useProductStore();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setSnackbar({
      open: true,
      message,
      severity: success ? "success" : "error",
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    setSnackbar({
      open: true,
      message,
      severity: success ? "success" : "error",
    });
    handleCloseModal(); // Close the modal after update
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Card
        sx={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "all 0.3s",
          borderRadius: 4,
          boxShadow: 3,
          bgcolor: isLight ? "#f9f9f9" : "#1e1e2f",
          color: isLight ? "#000" : "#fff",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={product.image}
          alt={product.name}
          sx={{
            objectFit: "contain",
            borderRadius: "8px 8px 0 0",
            background: "#f0f0f0",
          }}
        />
        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom noWrap>
            {product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            ${product.price}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", gap: 1, pb: 2 }}>
          <IconButton
            sx={{
              bgcolor: "lightblue",
              "&:hover": { bgcolor: "deepskyblue" },
              color: "#000",
            }}
            onClick={handleOpenModal}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{
              bgcolor: "#FF7B7B",
              "&:hover": { bgcolor: "#FF4C4C" },
              color: "#000",
            }}
            onClick={() => handleDeleteProduct(product._id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Modal for product update */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 4,
            p: 4,
            width: 400,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" mb={2}>
            Update Product
          </Typography>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={updatedProduct.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={updatedProduct.price}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={updatedProduct.image}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateProduct(updatedProduct)}
            >
              Update Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
