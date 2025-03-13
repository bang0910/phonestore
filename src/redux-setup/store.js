import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth";
const persistConfig = {
  key: "vietpro",
  storage,
};
//cart
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
//auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
//store
export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);
