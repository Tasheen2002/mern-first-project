import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server responded with error:", errorText);
        return {
          success: false,
          message: "Server error. Could not create product.",
        };
      }

      const data = await res.json();
      const product = data.data || data;
      set((state) => ({ products: [...state.products, product] }));

      return { success: true, message: "Product created successfully" };
    } catch (err) {
      console.error("Network or JSON parsing error:", err);
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.filter((p) => p._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Delete error:", error);
      return {
        success: false,
        message: "Something went wrong while deleting the product.",
      };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Update error:", error);
      return {
        success: false,
        message: "Something went wrong while updating the product.",
      };
    }
  },
}));
