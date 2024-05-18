import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/slice/ProductSlice";
import CartReducer from "../features/slice/CartSlice";
import UserLoginReducer from "../features/slice/UserLoginSlice";
import UserRegisterReducer from "../features/slice/UserRegisterSlice";

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartReducer,
    user: UserLoginReducer,
    userRegister: UserRegisterReducer,
  }
});


export default store;