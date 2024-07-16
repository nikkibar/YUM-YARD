import { api } from "../../config/api";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CARTITEM_FAILURE, REMOVE_CARTITEM_REQUEST, REMOVE_CARTITEM_SUCCESS, UPDATE_CARTITEM_FAILURE, UPDATE_CARTITEM_REQUEST, UPDATE_CARTITEM_SUCCESS } from "./ActionType";

export const findCart = (token) => {
  return async (dispatch) => {
    dispatch({ type: FIND_CART_REQUEST });
    try {
      const  response = await api.get(`/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("find cart ", response.data);
      dispatch({ type: FIND_CART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch find cart  ", error);
      dispatch({ type: FIND_CART_FAILURE, payload: error });
    }
  };
};

export const getAllCartItems = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_CART_ITEMS_REQUEST });
    try {
      const response = await api.get(
        `/api/carts/${reqData.cartId}/items`,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );
      console.log("All items ", response.data);
      dispatch({
        type: GET_ALL_CART_ITEMS_SUCCESS,
        payload:response.data
      });
    } catch (error) {
      console.log("all items  ", error);
      dispatch({
        type: GET_ALL_CART_ITEMS_FAILURE,
        payload: error,
      });
    }
  };
};

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.put(
                `/api/cart/add`,
                reqData,
                {
                    headers: {
                        Authorization: `Bearer ${reqData.token}`,
                    },
                }
            );
            console.log("Add items to cart", data);
            dispatch({
                type: ADD_ITEM_TO_CART_SUCCESS,
                payload: data
            });
        } catch (error) {
            console.log("add items cart  ", error);
            dispatch({
                type: ADD_ITEM_TO_CART_FAILURE,
                payload: error.message,
            });
        }
    };
};

export const updateCartItem = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CARTITEM_REQUEST });
    try {
      const { data } = await api.put(
        `/api/cart-item/update`,reqData.data,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("Update cart Item------- ", data);
      dispatch({ type: UPDATE_CARTITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch update cart item  ", error);
      dispatch({
        type: UPDATE_CARTITEM_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const removeCartItem = ({ cartItemId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: REMOVE_CARTITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Deleted cart Item ------- ", data);
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: cartItemId});
    } catch (error) {
      console.log("catch deleted cart item  ", error);
      dispatch({ type: REMOVE_CARTITEM_FAILURE, payload: error });
    }
  };
};

export const clearCartAction = () => {
    return async (dispatch) => {
      dispatch({ type: CLEAR_CART_REQUEST });
      try {
        const { data } = await api.put(`/api/cart/clear/`,{}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        console.log("Clear Cart ------- ", data);
        dispatch({ type: CLEAR_CART_SUCCESS, payload: data});
      } catch (error) {
        console.log("catch deleted cart item  ", error);
        dispatch({ type:  CLEAR_CART_FAILURE, payload: error.message });
      }
    };
  };
