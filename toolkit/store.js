import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import searchSlice from "./searchSlice";

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
};

const searchPersistConfig = {
  key: 'search',
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistSlice);
const persistedSearchReducer = persistReducer(searchPersistConfig, searchSlice);


export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    search: persistedSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
