import React, {  useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchOrderStart,
  clearOrderState,
} from "./../redux/order/order.actions";
import Spinner from "./../components/spinner.component";
import { selectOrderList, selectOrder } from "./../redux/order/order.selector";
import { createStructuredSelector } from "reselect";
import OrderList from "./adminOrderList.component";
import { selectCurrentUser } from "./../redux/user/user.selector";
import { withRouter, Redirect } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

const OrderScreen = ({
  dispatch,
  orderList,
  history,
  match,
  orderState: { fetchingOrders, isupdated, fetchOrderError },

  currentUser,
}) => {
  useEffect(() => {
    // dispatch action to make an api call to start fetching orders
    // dispatch(clearCart());
    if (
      match.params === null ||
      match.params === undefined ||
      Object.keys(match.params).length === 0
    ) {
      dispatch(fetchOrderStart());
    } else {
      dispatch(
        fetchOrderStart({
          [match.params.isDeliveredKey]: match.params.isDeliveredValue,
        })
      );
    }
    const interval = setInterval(() => {
      if (
        match.params === null ||
        match.params === undefined ||
        Object.keys(match.params).length === 0
      ) {
        dispatch(fetchOrderStart());
      } else {
        dispatch(
          fetchOrderStart({
            [match.params.isDeliveredKey]: match.params.isDeliveredValue,
          })
        );
      }
    }, 120000);

    return function () {
      dispatch(clearOrderState());
      clearInterval(interval);
    };
  }, [
    dispatch,
    match.params.isDeliveredKey,
    match.params.isDeliveredValue,
    match.params,
  ]);

  return currentUser === null ? (
    <div>
      <Redirect to="/login"></Redirect>
    </div>
  ) : fetchingOrders === false &&
    fetchOrderError === undefined &&
    orderList === null ? (
    <div>
      <Spinner />
    </div>
  ) : fetchingOrders === true &&
    fetchOrderError === undefined &&
    orderList === null ? (
    <div>
      <Spinner />
    </div>
  ) : fetchingOrders === false &&
    fetchOrderError !== undefined &&
    orderList === null ? (
    <ErrorComponent />
  ) : (
    <div>
      <OrderList isupdated={isupdated} />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  orderState: selectOrder,
  orderList: selectOrderList,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(OrderScreen));
