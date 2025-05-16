import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    Shoppingcart: []
  },
  reducers: {
    addCart: (state, action) => {
        console.log("Adding to cart:", action.payload);
  
        const existingItem = state.Shoppingcart.find(
          (item) => item.id === action.payload.id
        );
  
        if (existingItem) {
        
          existingItem.quantity += 1;
       
        } else {
        
          const cartItem = {
            id: action.payload.id,
            title: action.payload.title,
            image: action.payload.image,
            price: action.payload.price,
            rating: action.payload.rating.rate,
            quantity: action.payload.quantity,
              };
          state.Shoppingcart.push(cartItem);
        }
      },
    deleteCart: (state, action) => {
      state.Shoppingcart = state.Shoppingcart.filter((cartitems) => cartitems.id !==
        action.payload)
    },
    clearCart: (state) => {
      state.Shoppingcart = [];
    },
    }
  }
);

export const { addCart, deleteCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;