import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress, // Import CircularProgress for loading indicator
} from "@mui/material";

const AdminAddProduct = () => {
  const [formData, setFormData] = useState({
    id: "",
    type: "",
    url: "",
    title: { shortTitle: "", longTitle: "" },
    price: { mrp: 0, cost: 0, discount: "" },
    quantity: 0,
    description: "",
    size: [],
  });

  const [sizes, setSizes] = useState("");
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const dressTypes = ["choli", "saree", "dress", "gown", "kurti"];

  const fetchProducts = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false); // Set loading to false after data fetch
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [key, subKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeChange = (e) => {
    setSizes(e.target.value);
    setFormData((prev) => ({ ...prev, size: e.target.value.split(",") }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:8000/products/${editProductId}`, formData);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:8000/admin/products", formData);
        alert("Product added successfully!");
      }
      resetForm();
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      type: "",
      url: "",
      title: { shortTitle: "", longTitle: "" },
      price: { mrp: 0, cost: 0, discount: "" },
      quantity: 0,
      description: "",
      size: [],
    });
    setSizes("");
    setIsEdit(false);
    setEditProductId(null);
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setEditProductId(product._id);
    setFormData(product);
    setSizes(product.size.join(","));
    setOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
    resetForm();
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };
  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/products/${productId}`);
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh the product list after deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product");
      }
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ marginBottom: "20px" }}
      >
        Add Product
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <TextField
              fullWidth
              label="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
           
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                {dressTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Image URL"
              name="url"
              value={formData.url}
              onChange={handleChange}
              margin="normal"
            />
           
            <TextField
              fullWidth
              label="Short Title"
              name="title.shortTitle"
              value={formData.title.shortTitle}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Long Title"
              name="title.longTitle"
              value={formData.title.longTitle}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="MRP"
              name="price.mrp"
              type="number"
              value={formData.price.mrp}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Cost"
              name="price.cost"
              type="number"
              value={formData.price.cost}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Discount"
              name="price.discount"
              value={formData.price.discount}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Sizes (comma-separated)"
              value={sizes}
              onChange={handleSizeChange}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loader */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ marginTop: "50px" }}>
          <Typography variant="h4" gutterBottom>
            Existing Products
          </Typography>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card sx={{ boxShadow: 3 ,height: "100%"}}>
                  <CardContent>
                    <Typography variant="h6">
                      {product.title.shortTitle}
                    </Typography>
                    <Box
                      component="img"
                      src={product.url}
                      alt={product.title.shortTitle}
                      sx={{
                        width: "100%",
                        // height: "250px",
                        objectFit: "cover",
                        marginBottom: "10px",
                        borderRadius: "4px",
                      }}
                    />
                    <Typography>Type: {product.type}</Typography>
                    <Typography>MRP: ₹{product.price.mrp}</Typography>
                    <Typography>Cost: ₹{product.price.cost}</Typography>
                    <Typography>Discount: {product.price.discount}</Typography>
                    <Typography>Quantity: {product.quantity}</Typography>
                    <Typography>Description: {product.description}</Typography>
                    <Typography>Sizes: {product.size.join(", ")}</Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEdit(product)}
                      sx={{ marginTop: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(product._id)}
        sx={{ marginTop: "10px" }}
      >
        Delete
      </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AdminAddProduct;
