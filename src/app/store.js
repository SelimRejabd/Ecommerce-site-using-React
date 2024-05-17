import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/slice/ProductSlice";
import CartReducer from "../features/slice/CartSlice";
import UserLoginReducer from "../features/slice/UserLoginSlice";

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    user: UserLoginReducer,
  }
});


export default store;