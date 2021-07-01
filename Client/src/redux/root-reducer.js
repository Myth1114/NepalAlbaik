import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderReducer from "./order/order.reducer";
import userReducer from "./user/user.reducer";
import productReducer from "./product/product.reducer";
import cartReducer from "./cart/cart.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], //user was persisted here
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
