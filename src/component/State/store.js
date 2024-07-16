import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import {thunk} from "redux-thunk"; // default import
import { authReducer } from "./Authentication/Reducer";
import restaurantReducer from "./Restaurant/Reducer";
import menuItemReducer from "./Menu/Reducer";
import cartReducer from "./Cart/Reducer";
import orderReducer from "./Order/Reducer";
import ingredientReducer from "./Menu/Ingredients/Reducer";
import restaurantOrderReducer from "./Restaurant Order/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  menu: menuItemReducer,
  cart: cartReducer,
  order: orderReducer,
  restaurantOrder: restaurantOrderReducer,
  ingredient: ingredientReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
