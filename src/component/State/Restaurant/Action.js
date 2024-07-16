import { api } from "../../config/api";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENT_REQUEST,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANTS_FAILURE,
  GET_ALL_RESTAURANTS_REQUEST,
  GET_ALL_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get(`/api/restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("All Restaurants", data);
      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch all restaurant", error);
      dispatch({ type: GET_ALL_RESTAURANTS_FAILURE, payload: error });
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {  
    console.log("Requesting restaurant with ID:", reqData.restaurantId);
    dispatch({ type: GET_RESTAURANT_BY_ID_REQUEST });
    try {
      const { data } = await api.get(
        `/api/restaurants/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      dispatch({ type: GET_RESTAURANT_BY_ID_SUCCESS, payload: data });
      console.log("Restaurant by id", data);
      
    } catch (error) {
      console.log("catch restaurant id ", error);
      dispatch({ type: GET_RESTAURANT_BY_ID_FAILURE, payload: error });
    }
  };
};

export const getRestaurantByUserId = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurant/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("get restaurant by user id ", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch catch restaurant userid", error);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_FAILURE, payload: error });
    }
  };
};

export const createRestaurant = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/restaurant`, reqData.data, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("crate res☻taurant ", data);
      window.location.href="http://localhost:3000/admin/restaurants";
    } catch (error) {
      console.log("catch restaurant id ", error);
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurant = ({restaurantId, restaurantData, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/restaurant/${restaurantId}`,
        restaurantData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch update restaurant", error);
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const deleteRestaurant = ({restaurantId, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.delete(
        `/api/admin/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: restaurantId });
    } catch (error) {
      console.log("catch update restaurant", error);
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const updateRestaurantStatus = ({restaurantId, jwt}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/restaurant/${restaurantId}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch update restaurant", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEventAction = ({ data, jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENT_REQUEST });
    try {
      const res = await api.post(
        `/api/admin/events/restaurant/${restaurantId}`,
        data,
        {
          headers: {
            Authorization: `Bearer: ${jwt}`,
          },
        }
      );

      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error });
    }
  };
};

export const getAllEvents = ({ jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });
    try {
      const res = await api.get(`/api/events/`, {
        headers: {
          Authorization: `Bearer: ${jwt}`,
        },
      });
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
  };
};

export const deleteEvents = ({ eventId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENT_REQUEST });
    try {
      const res = await api.delete(`/api/admin/events/${eventId}`, {
        headers: {
          Authorization: `Bearer: ${jwt}`,
        },
      });
      console.log("Delete Events: ", res.data);
      dispatch({ type: DELETE_EVENT_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: DELETE_EVENT_FAILURE, payload: error });
    }
  };
};

export const getRestaurantEvents = ({ restaurantId, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });
    try {
      const res = await api.get(
        `/api/admin/events/restaurant/${restaurantId}`,
        {
          headers: {
            Authorization: `Bearer: ${jwt}`,
          },
        }
      );
      console.log("get rataurant events", res.data);
      dispatch({ type: GET_RESTAURANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("error", error);
      dispatch({ type: GET_RESTAURANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategoryAction = ({ reqData, jwt }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    try {
      const res = await api.post( `api/admin/category`, reqData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
      console.log("create category:", res.data);
    } catch (error) {
      console.log("error category", error);
      dispatch({ type: CREATE_CATEGORY_FAILURE, error });
    }
  };
};

export const getRestaurantCategory = ({ jwt, restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_CATEGORY_REQUEST });
    try {
      const res = await api.get(`api/category/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({ type: GET_RESTAURANT_CATEGORY_SUCCESS, payload: res.data });
      console.log("get category:", res.data);
    } catch (error) {
      console.log("error category", error);
      dispatch({ type: GET_RESTAURANT_CATEGORY_FAILURE, error });
    }
  };
};
