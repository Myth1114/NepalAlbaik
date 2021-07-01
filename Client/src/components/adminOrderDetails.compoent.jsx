import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

import {
  selectOrderByIdList,
  selectOrder,
} from "./../redux/order/order.selector";
import {
  clearOrderByIdList,
  fetchOrderByIdStart,
  updateOrderByIdStart,
} from "./../redux/order/order.actions";
import uuid from "react-uuid";
import { selectCurrentUser } from "./../redux/user/user.selector";
import Spinner from "./../components/spinner.component";
import ErrorComponent from "./ErrorComponent";
import Snackbar from "@material-ui/core/Snackbar";
import formatAmount from "indian-currency-formatter";

import MuiAlert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },

  grid: {
    text: "justify",
    display: "flex",
    justifyContent: "felx-end",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    borderRadius: 0,
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    marginTop: 10,
    minWidth: 300,
    marginBottom: 10,
    color: "#ffffff",
  },
  checkoutButton: {
    margin: "auto",
    borderRadius: 0,
    display: "flex",
    justifyContent: "center",
  },
  description: {
    margin: 20,
  },
  root: {
    // background: "none",
    // boxShadow: "none",
    maxWidth: 750,
    margin: "auto",
    paddingTop: 30,
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 160,
    height: 160,
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  spaceBottom: {
    margin: 5,
    display: "flex",

    justifySelf: "start",
  },
  screen: {
    background: "#E6EFF1",
    minHeight: "35vw",
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cartText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  address: {
    // marginTop: 20,
    // marginBottom: 20,
    margin: "20px auto",
    maxWidth: 800,
    // textAlign: "center",
  },
  typo: {
    marginTop: 10,
    marginBottom: 10,
  },
}));

function OrderDetails({
  orderByIdList,
  orderState: {
    fetchingOrderById,
    fetchingOrderByIdError,
    updateOrderError,
    isupdated,
  },
  history,
  match,
  cartTotal,
  dispatch,
  currentUser,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [snackBarMessage, setSnackBarMessage] = useState(
    "Error Updating Status"
  );
  const [buttonClick, buttonClickStatus] = useState(
    isupdated || updateOrderError ? true : false
  );
  useEffect(() => {
    dispatch(fetchOrderByIdStart(match.params.id));
    //todo could do without this cleanup fxn
    return function () {
      dispatch(clearOrderByIdList());
    };
  }, [dispatch, match.params.id]);

  return currentUser === null || currentUser.role !== "admin" ? (
    <Redirect to="/"></Redirect>
  ) : orderByIdList == null &&
    fetchingOrderById === false &&
    fetchingOrderByIdError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : orderByIdList == null &&
    fetchingOrderById === true &&
    fetchingOrderByIdError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : orderByIdList == null &&
    fetchingOrderById === false &&
    fetchingOrderByIdError !== undefined ? (
    <ErrorComponent />
  ) : (
    <div className={classes.screen}>
      <Typography
        className={classes.typo}
        align="center"
        component="h5"
        variant="h4"
      >
        {/* ID: {orderByIdList._id} */}
        Details
      </Typography>
      <Card raised className={classes.root}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography align="center" component="h5" variant="h6">
              {orderByIdList._id}
            </Typography>
            <Typography align="center" component="h5" variant="h6">
              Status : {orderByIdList.isDelivered}
            </Typography>
          </Grid>
        </Grid>
        {orderByIdList.orderItems.map((el, index) => (
          <Card square key={uuid()} className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Grid className={classes.grid} container spacing={3}>
                  <Grid item md={6} xs={6}>
                    <CardMedia
                      onClick={() => {
                        history.push(
                          `/product/searchTerm/subCategory/${el.subCategory}/${el._id}`
                        );
                      }}
                      className={classes.cover}
                      image={el.image[0]}
                      title="Live from space album cover"
                    />
                  </Grid>
                  <Grid item md={6} xs={6} className={classes.cartText}>
                    <Typography className={classes.spaceBottom}>
                      {el.name}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Price/unit: RS.
                      {formatAmount(
                        parseInt(el.price - el.price * (el.discount / 100))
                      )}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Variant: {el.option}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Quanity Ordered:{el.quantity}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Price: Rs.
                      {formatAmount(
                        el.quantity *
                          parseInt(el.price - el.price * (el.discount / 100))
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              {isupdated || updateOrderError ? (
                <Snackbar
                  open={true}
                  className={classes.text}
                  autoHideDuration={2000}
                  onClose={() => {
                    buttonClickStatus(false);
                    window.location.reload();
                  }}
                  message={`${
                    updateOrderError
                      ? " something went wrong ..try again"
                      : snackBarMessage
                  }`}
                >
                  <Alert
                    onClose={() => {
                      buttonClickStatus(false);
                      window.location.reload();
                    }}
                    severity="success"
                  >
                    {`${
                      updateOrderError
                        ? " something went wrong ..try again"
                        : snackBarMessage
                    }`}
                  </Alert>
                </Snackbar>
              ) : null}
            </div>
          </Card>
        ))}
        <Grid item md={12} xs={12}>
          <div>
            {orderByIdList.isDelivered === "Pending Confirmation" ? (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => {
                  dispatch(
                    updateOrderByIdStart({
                      orderId: orderByIdList._id,
                      isDelivered: "confirmed",
                    })
                  );
                  setSnackBarMessage("Order is confirmed");
                }}
              >
                Mark confirmed
              </Button>
            ) : null}
            {orderByIdList.isDelivered === "confirmed" ? (
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={() => {
                  dispatch(
                    updateOrderByIdStart({
                      orderId: orderByIdList._id,
                      isDelivered: "delivered",
                    })
                  );
                  setSnackBarMessage("Order is Marked Delivered");
                }}
              >
                Mark delivered
              </Button>
            ) : null}
            {orderByIdList.isDelivered === "Pending Confirmation" ||
            orderByIdList.isDelivered === "confirmed" ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => {
                  dispatch(
                    updateOrderByIdStart({
                      orderId: orderByIdList._id,
                      isDelivered: "cancelled",
                    })
                  );
                  setSnackBarMessage("Order is cancelled");
                }}
              >
                Cancel order
              </Button>
            ) : null}
          </div>
        </Grid>
        <div className={classes.address}>
          <Typography align="center" component="h5" >
            Deliver to :{" "}
            {Object.values(orderByIdList.orderAddress)
              .filter((el, index) => el.length !== 0)
              .join(" , ")}
          </Typography>
          <Typography align="center" component="h5" variant="h6">
            {orderByIdList.userID.email}
          </Typography>
        </div>
      </Card>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orderByIdList: selectOrderByIdList,
  orderState: selectOrder,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(OrderDetails));
