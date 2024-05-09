import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../features/slice/ProductSlice";
import CartSlice from "../features/slice/CartSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice,
    cart: CartSlice,
  }
});


export default store;