import * as actionTypes from "./ActionType";

const initialState = {
  loading: false,
  error: null,
  orders: [],
};

const restaurantOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RESTAURANTS_ORDER_REQUEST:
    case actionTypes.UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.GET_RESTAURANTS_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orders: action.payload,
      };

    case actionTypes.UPDATE_ORDER_STATUS_SUCCESS:
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id ? action.payload : order
      );
      return {
        ...state,
        loading: false,
        orders: updatedOrders,
      };

    case actionTypes.GET_RESTAURANTS_ORDER_FAILURE:
    case actionTypes.UPDATE_ORDER_STATUS_FAILURE:
        return{
            ...state,
            loading: false,
            error: action.error
        }

    default:
      return state;
  }
};

export default restaurantOrderReducer;
