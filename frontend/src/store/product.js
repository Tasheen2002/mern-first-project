import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Validate input
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

      // Check if response is OK (status code 2xx)
      if (!res.ok) {
        const errorText = await res.text(); // If not valid JSON, read as plain text
        console.error("Server responded with error:", errorText);
        return {
          success: false,
          message: "Server error. Could not create product.",
        };
      }

      const data = await res.json();

      // Expecting the actual product in `data` or `data.data`
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
}));
