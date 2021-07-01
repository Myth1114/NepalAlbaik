import orderActionTypes from "./order.types";

export const updateOrderAddress = (addressObj) => ({
  type: orderActionTypes.SELECT_ORDER_ADDRESS,
  payload: addressObj,
});
export const createOrderStart = (orderObj) => ({
  type: orderActionTypes.CREATE_ORDER_START,
  payload: orderObj,
});
export const createOrderSuccess = (orderObj) => ({
  type: orderActionTypes.CREATE_ORDER_SUCCESS,
  payload:orderObj,
});
export const createOrderFailure = (error) => ({
  type: orderActionTypes.CREATE_ORDER_FAILURE,
  payload: error,
});
export const clearOrderState = () => ({
  type: orderActionTypes.CLEAR_ORDER_STATE,
});
export const fetchOrderStart = (filter) => ({
  type: orderActionTypes.FETCH_ORDER_START,
  payload: filter,
});
export const fetchOrderSuccess = (userOrderObj) => ({
  type: orderActionTypes.FETCH_ORDER_SUCCESS,
  payload: userOrderObj,
});
export const fetchOrderFailure = (error) => ({
  type: orderActionTypes.FETCH_ORDER_FAILURE,
  payload: error,
});
export const fetchOrderByIdStart = (orderId) => ({
  type: orderActionTypes.FETCH_ORDER_BY_ID_START,
  payload: orderId,
});
export const fetchOrderByIdSuccess = (orders) => ({
  type: orderActionTypes.FETCH_ORDER_BY_ID_SUCCESS,
  payload: orders,
});
export const fetchOrderByIdFailure = (error) => ({
  type: orderActionTypes.FETCH_ORDER_BY_ID_FAILURE,
  payload: error,
});
export const fetchOrderByFieldStart = (fieldObj) => ({
  type: orderActionTypes.FETCH_ORDER_BY_FIELD_START,
  payload: fieldObj,
});
export const fetchOrderByFieldSuccess = (ordersByField) => ({
  type: orderActionTypes.FETCH_ORDER_BY_FIELD_SUCCESS,
  payload: ordersByField,
});
export const fetchOrderByFieldFailure = (error) => ({
  type: orderActionTypes.FETCH_ORDER_BY_FIELD_SUCCESS,
  payload: error,
});
export const updateOrderByIdStart = (updateObj) => ({
  type: orderActionTypes.UPDATE_ORDER_BY_ID_START,
  payload: updateObj,
});
export const updateOrderByIdSuccess = () => ({
  type: orderActionTypes.UPDATE_ORDER_BY_ID_SUCCESS,
});
export const updateOrderByIdfailure = (error) => ({
  type: orderActionTypes.UPDATE_ORDER_BY_ID_FAILURE,
  payload: error,
});
export const fetchOrderStatsStart=()=>({
  type:orderActionTypes.FETCH_ORDER_STATS_START,

})
export const fetchOrderStatsSuccess=(orderStats)=>({
  type:orderActionTypes.FETCH_ORDER_STATS_SUCCESS,
  payload:orderStats,

})

export const fetchOrderStatsFailure=(error)=>({
  type:orderActionTypes.FETCH_ORDER_STATS_FAILURE,
  payload:error,

})
export const clearOrderByIdList = () => ({
  type: orderActionTypes.CLEAR_ORDER_BY_ID_LIST,
});
