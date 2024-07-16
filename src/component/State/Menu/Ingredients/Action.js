import { api } from "../../../config/api";
import { CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionType";

export const getIngredientOfRestaurant = ({id, jwt}) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/ingredients/restaurant/${id}`,{
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get all ingredients ", response.data);
      dispatch({ type: GET_INGREDIENTS, payload: response.data });
    } catch (error) {
      console.log("catch get all ingredients", error);
    }
  };
};

export const createIngredient = ({data}) => {
  return async (dispatch) => {
    try {
      const response = await api.post (`/api/admin/ingredients`, data, {
      });
      dispatch({
        type: CREATE_INGREDIENT_SUCCESS,
        payload: response.data,
      });
      console.log("created ingredients ", response.data);
    } catch (error) {
      console.log("catch create ingredients", error);
      dispatch({
        type: CREATE_INGREDIENT_FAILURE,
        payload: error,
      });
    }
  };
};

export const createIngredientCategory = ({data}) => {
    // console.log("data", data);
    return async (dispatch) => {
      try {
        const response = await api.post (`/api/admin/ingredients/category`, data, {
        });
        console.log("created ingredients category", response.data);
        dispatch({
          type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.log("catch create ingredients category", error);
        // dispatch({
        //   type: CREATE_INGREDIENT_FAILURE,
        //   payload: error,
        // });
      }
    };
};

export const getIngredientCategory = ({id}) => {
    return async (dispatch) => {
      try {
        const response = await api.get (
            `/api/admin/ingredients/restaurant/${id}/category`, {
        });
        console.log("fetched ingredients category", response.data);
        dispatch({
          type: GET_INGREDIENT_CATEGORY_SUCCESS,
          payload: response.data,
        });
      } catch (error) {
        console.log("catch get ingredients category", error);
        // dispatch({
        //   type: CREATE_INGREDIENT_FAILURE,
        //   payload: error,
        // });
      }
    };
};

export const updateStockOfIngredient = ({id, jwt}) => {
    return async (dispatch) => {
      try {
        const {data} = await api.put (
            `/api/admin/ingredients/${id}/stock`,{}, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("update ingredients stock", data);
        dispatch({
          type: UPDATE_STOCK,
          payload: data,
        });
      } catch (error) {
        console.log("catch update stock", error);
        // dispatch({
        //   type: CREATE_INGREDIENT_FAILURE,
        //   payload: error,
        // });
      }
    };
};
