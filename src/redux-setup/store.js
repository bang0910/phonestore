import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cart";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./reducers/auth";
const persistConfig = {
  key: "bang",
  storage,
};
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);
export default store;
