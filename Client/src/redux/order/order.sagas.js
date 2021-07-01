import { takeLatest, call, put, all, takeEvery } from "redux-saga/effects";
import axios from "axios";
import orderActionTypes from "./order.types";
import { clearCart } from "./../cart/cart.actions";
import Cookies from "universal-cookie";
import {
  createOrderSuccess,
  createOrderFailure,
  fetchOrderSuccess,
  fetchOrderFailure,
  fetchOrderByIdSuccess,
  fetchOrderByIdFailure,
  updateOrderByIdSuccess,
  updateOrderByIdfailure,
  fetchOrderStatsSuccess,
  fetchOrderStatsFailure,
} from "./order.actions";
const cookies = new Cookies();
export function* fetchOrderById({ payload }) {
  try {
    
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": cookies.get("XSRF-TOKEN"),
      },
      withCredentials: true,
    };

    const { data } = yield axios.get(
      `/api/v1/products/orders/${payload}`,

      axiosConfig
    );
    const { orderDetail } = data;
    yield put(fetchOrderByIdSuccess(orderDetail));
    
  } catch (error) {
    yield put(fetchOrderByIdFailure(error));
  }
}
export function* fetchOrder({ payload }) {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
  
    
    if (
      payload === undefined ||
      payload === null ||
      Object.keys(payload).length === 0
    ) {
      const {
        data: { orders },
      } = yield axios.get(
        `/api/v1/products/orders/getMyOrders`,

        axiosConfig
      );
      
      yield put(fetchOrderSuccess(orders));
    } else {
      const {
        data: { orders },
      } = yield axios.get(
        `/api/v1/products/orders/getMyOrders/${Object.keys(payload)[0]}/${
          Object.values(payload)[0]
        }`,

        axiosConfig
      );
      
      yield put(fetchOrderSuccess(orders));
    }
  } catch (error) {
    yield put(fetchOrderFailure(error));
  }
}
export function* createOrder({ payload }) {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const data = yield axios.post(
      `/api/v1/products/orders`,
      payload,

      axiosConfig
    );
    
    yield put(clearCart());
    yield put(createOrderSuccess(data.data.order));
  } catch (error) {
    yield put(createOrderFailure(error));
    
  }
}

export function* updateOrder({ payload: { orderId, ...updateObj } }) {
  try {
    
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    yield axios.patch(
      `/api/v1/products/orders/${orderId}`, //todo change the api
      updateObj,

      axiosConfig
    );
    yield put(updateOrderByIdSuccess());
  } catch (error) {
    yield put(updateOrderByIdfailure(error));
  }
}
export function* fetchOrderStats() {
  try {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = yield axios.get(
      `/api/v1/products/getOrderStats`, //todo change the api

      axiosConfig
    );

    const { stats } = data;
    
    yield put(fetchOrderStatsSuccess(stats));
  } catch (error) {
    yield put(fetchOrderStatsFailure(error));
  }
}
export function* updateOrderByIdSaga() {
  yield takeEvery(orderActionTypes.UPDATE_ORDER_BY_ID_START, updateOrder);
}
export function* fetchOrderByIdSaga() {
  yield takeLatest(orderActionTypes.FETCH_ORDER_BY_ID_START, fetchOrderById);
}
export function* fetchOrderSaga() {
  yield takeLatest(orderActionTypes.FETCH_ORDER_START, fetchOrder);
}
export function* createOrderSaga() {
  yield takeLatest(orderActionTypes.CREATE_ORDER_START, createOrder);
}
export function* fetchOrderStatsSaga() {
  yield takeLatest(orderActionTypes.FETCH_ORDER_STATS_START, fetchOrderStats);
}

export function* orderSagas() {
  yield all([
    call(createOrderSaga),
    call(fetchOrderByIdSaga),
    call(fetchOrderSaga),
    call(updateOrderByIdSaga),
    call(fetchOrderStatsSaga),
  ]);
}
