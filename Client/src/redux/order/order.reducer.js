import orderActionTypes from "./order.types";
const initialState = {
  orderAddress: null,
  orderList: null,

  // orderLoading: true,
  // orderPlacing: true,
  orderByIdList: null,
  fetchingOrderByIdError: undefined,
  fetchingOrders: false,
  fetchOrderError: undefined,
  fetchingOrderById: false,
  updateOrderRunning: false,
  updateOrderError: undefined,
  isupdated: false,
  createdOrder: null,
  orderStatsLoading: false,
  orderStats: null,
  orderStatsError: undefined,
  // errorPlacing: undefined,fetchOrderError
};
// fetchingOrders,orderList
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderActionTypes.SELECT_ORDER_ADDRESS:
      return {
        ...state,
        orderAddress: action.payload,
      };
    case orderActionTypes.CREATE_ORDER_START:
      return {
        ...state,
        orderPlacing: true,
        createdOrder: null,
      };
    case orderActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderPlacing: false,
        errorPlacing: false,
        createdOrder: action.payload,
      };
    case orderActionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        orderPlacing: false,
        errorPlacing: true,
        createdOrder: null,
      };
    case orderActionTypes.CLEAR_ORDER_STATE:
      return {
        ...initialState,
      };
    case orderActionTypes.FETCH_ORDER_START:
    case orderActionTypes.FETCH_ORDER_BY_FIELD_START:
      return {
        ...state,
        fetchingOrders: true,
        orderList: null,
        fetchOrderError: undefined,
      };
    case orderActionTypes.FETCH_ORDER_SUCCESS:
    case orderActionTypes.FETCH_ORDER_BY_FIELD_SUCCESS:
      return {
        ...state,
        fetchingOrders: false,
        orderList: action.payload,
        fetchOrderError: undefined,
      };
    case orderActionTypes.FETCH_ORDER_FAILURE:
    case orderActionTypes.FETCH_ORDER_BY_FIELD_FAILURE:
      return {
        ...state,
        fetchingOrders: false,
        fetchOrderError: action.payload,
      };
    case orderActionTypes.FETCH_ORDER_BY_ID_START:
      return {
        ...state,
        fetchingOrderById: true,
        orderByIdList: null,
        fetchingOrderByIdError: undefined,
      };
    case orderActionTypes.FETCH_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingOrderById: false,
        orderByIdList: action.payload,
        fetchingOrderByIdError: undefined,
      };
    case orderActionTypes.FETCH_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        orderByIdList: null,
        fetchingOrderById: false,
        fetchingOrderByIdError: action.payload,
      };
    case orderActionTypes.UPDATE_ORDER_BY_ID_START:
      return {
        ...state,
        updateOrderRunning: true,
        isupdated: false,
        updateOrderError: undefined,
      };
    case orderActionTypes.UPDATE_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        updateOrderRunning: false,
        updateOrderError: undefined,
        isupdated: true,
      };
    case orderActionTypes.UPDATE_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        updateOrderRunning: false,
        updateOrderError: action.payload,
        isupdated: true,
      };
    case orderActionTypes.FETCH_ORDER_STATS_START:
      return {
        ...state,
        orderStatsLoading: true,
        orderStats: null,
        orderStatsError: undefined,
      };
    case orderActionTypes.FETCH_ORDER_STATS_SUCCESS:
      return {
        ...state,
        orderStatsLoading: false,
        orderStats: action.payload,
        orderStatsError: undefined,
      };
    case orderActionTypes.FETCH_ORDER_STATS_FAILURE:
      return {
        ...state,
        orderStatsLoading: false,
        orderStats: null,
        orderStatsError: action.payload,
      };
    case orderActionTypes.CLEAR_ORDER_BY_ID_LIST:
      return {
        ...state,
        fetchOrderError: null,
        orderByIdList: null,
      };
    // return initialState;
    default:
      return state;
  }
};
export default orderReducer;
