import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Utility function to fetch products
const fetchProducts = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err; // Important for React Query to handle errors
  }
};

// Custom hook to use in components
const useProductList = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
    onSuccess: () => {
      console.log("Data successfully fetched");
    },
  });
};

export default useProductList;
