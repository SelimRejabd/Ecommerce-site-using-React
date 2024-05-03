// import {createStore, combineReducers, applyMiddleware} from 'redux';
// // import { configureStore} from '@reduxjs/toolkit';
// import {thunk,  withExtraArgument } from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
// import { productListReducers } from './reducers/productReducers';

// const reducer = combineReducers({
//     productList: productListReducers,
// });
// const initialState = {};
// const middleware = [thunk]
// // const store = configureStore(reducer, initialState, composeWithDevTools(applyMiddleware(middleware)));
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../features/products/ProductSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice,
  }
});

export default store;