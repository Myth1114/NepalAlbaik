import React, {  useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchOrderStart,
  clearOrderState,
} from "./../redux/order/order.actions";
import Spinner from "./../components/spinner.component";
import { selectOrderList, selectOrder } from "./../redux/order/order.selector";
import { createStructuredSelector } from "reselect";
import OrderList from "./orderList.component";
import { selectCurrentUser } from "./../redux/user/user.selector";
import { withRouter, Redirect } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
const OrderScreen = ({
  dispatch,
  orderList,
  history,
  orderState: { fetchingOrders, fetchOrderError },
  currentUser,
}) => {
  useEffect(() => {
    // dispatch action to make an api call to start fetching orders
    // dispatch(clearCart());
    dispatch(fetchOrderStart());

    return function () {
      dispatch(clearOrderState());
    };
  }, [dispatch]);

  return currentUser === null ? (
    <div>
      <Redirect to="/login"></Redirect>
    </div>
  ) : currentUser.role === "admin" ? (
    <div>
      <Redirect to="/" />
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
      <OrderList />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orderState: selectOrder,
  orderList: selectOrderList,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(OrderScreen));


