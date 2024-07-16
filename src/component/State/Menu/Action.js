import { api } from "../../config/api";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";

export const createMenuItem = ({menu, jwt}) => {
    return async (dispatch) => {
      dispatch({ type: CREATE_MENU_ITEM_REQUEST });
      try {
        const { data } = await api.post(`/api/admin/food`, menu, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("created menu ", data);
        dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
      } catch (error) {
        console.log("catch menu item  ", error);
        dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
      }
    };
};

export const getMenuItemByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        console.log("api link path",`/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&seasonal=${reqData.seasonal}&nonVeg=${reqData.nonVeg}&food_category=${reqData.food_category}`);
        const {data}  = await api.get(`/api/food/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&seasonal=${reqData.seasonal}&nonVeg=${reqData.nonVeg}&food_category=${reqData.food_category}`, {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        });
        console.log("get food menu ", data);
        dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch food menu  ", error);
      dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, payload: error });
    }
  };
};

export const searchMenuItem = ({keyword, jwt}) => {
    return async (dispatch) => {
      dispatch({ type:SEARCH_MENU_ITEM_REQUEST });
      try {
        const { data } = await api.get(`/api/food/search?home=${keyword}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("data-------- ", data);
        dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
      } catch (error) {
        console.log("catch search menu item  ", error);
        dispatch({ type: SEARCH_MENU_ITEM_FAILURE, payload: error });
      }
    };
};

export const updateMenuItemAvailability = ({foodId, jwt}) => {
    return async (dispatch) => {
      dispatch({ type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
      try {
        const { data } = await api.put(`/api/admin/food/${foodId}`,{}, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("Update menu Item Availability------- ", data);
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
      } catch (error) {
        console.log("catch update menu item  ", error);
        dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload: error });
      }
    };
};

export const deleteMenuItem = ({foodId, jwt}) => {
    return async (dispatch) => {
      dispatch({ type:DELETE_MENU_ITEM_REQUEST});
      try {
        const { data } = await api.delete(`/api/admin/food/${foodId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("Deleted menu Item ------- ", data);
        dispatch({ type:DELETE_MENU_ITEM_SUCCESS, payload: foodId });
      } catch (error) {
        console.log("catch delete menu item  ", error);
        dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
      }
    };
};
