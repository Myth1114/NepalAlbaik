import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { selectOrderList, selectOrder } from "./../redux/order/order.selector";
import { createStructuredSelector } from "reselect";
import {
  fetchOrderByIdStart,
  updateOrderByIdStart,
} from "./../redux/order/order.actions";
import { selectCurrentUser } from "./../redux/user/user.selector";
import uuid from "react-uuid";

import Snackbar from "@material-ui/core/Snackbar";
import formatAmount from "indian-currency-formatter";

import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "auto",
    // boxShadow: "none",
    border: "1px solid gray",
    background: "#ffffff",
  },
  margin: {
    marginTop: 20,
    marginBottom: 20,
  },
  div: {
    minHeight: "50vw",
    background: "#E6EFF1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    // flex: "1 0 auto",
    display: "flex",
    justifyContent: " center",
    maxWidth: 1000,
    margin: "auto",
    // margin: "auto",
  },
  cover: {
    width: 160,
    height: 160,
    display: "flex",
    justifyContent: "center",
    margin: "auto",
  },
  spaceBottom: {
    margin: "20",
    display: "flex",

    textAlign: "left",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  grid: {
    // text: "justify",
    display: "flex",
    justifyContent: "center",
    maxWidth: 1000,
    margin: "auto",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    borderRadius: 0,
    display: "flex",
    justifyContent: "space-around",
    margin: "auto",
    marginTop: 10,
    marginBottom: 10,
    color: "#ffffff",
    minWidth: 300,
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
}));

function OrderList({
  orderList,
  orderState: { updateOrderError, isupdated },
  currentUser,
  dispatch,
  match,
  history,
}) {
  const classes = useStyles();

  const [snackBarMessage, setSnackBarMessage] = useState(
    "Error Updating Status"
  );
  const [buttonClick, buttonClickStatus] = useState(
    isupdated || updateOrderError ? true : false
  );

  return (
    <div className={classes.div}>
      <Container fixed>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography className={classes.margin} align="center" variant="h3">
              Orders Table
            </Typography>
            <Typography align="center" component="h5" variant="h5">
              {match.params.isDeliveredValue === null ||
              match.params.isDeliveredValue === undefined
                ? `New orders`
                : `showing ${match.params.isDeliveredValue} orders`}
            </Typography>

            <CardContent className={classes.content}>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  {match.params.isDeliveredValue === "confirmed" ? (
                    <Button
                      onClick={() => {
                        history.push(`/order-info`);
                      }}
                      className={classes.button}
                      // fullWidth
                      color="primary"
                      variant="contained"
                    >
                      Show All orders
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        history.push(
                          `/order-info/Byfield/isDelivered/confirmed`
                        );
                      }}
                      className={classes.button}
                      // fullWidth
                      color="primary"
                      variant="contained"
                    >
                      Show confirmed
                    </Button>
                  )}
                </Grid>
                <Grid item md={4} xs={12}>
                  {match.params.isDeliveredValue === "delivered" ? (
                    <Button
                      onClick={() => {
                        history.push(`/order-info`);
                      }}
                      // fullWidth
                      color="primary"
                      className={classes.button}
                      variant="contained"
                    >
                      Show All orders
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        history.push(
                          `/order-info/Byfield/isDelivered/delivered`
                        );
                      }}
                      className={classes.button}
                      // fullWidth
                      color="secondary"
                      variant="contained"
                    >
                      Show Delivered
                    </Button>
                  )}
                </Grid>
                <Grid item md={4} xs={12}>
                  {match.params.isDeliveredValue === "cancelled" ? (
                    <Button
                      onClick={() => {
                        history.push(`/order-info`);
                      }}
                      // fullWidth
                      className={classes.button}
                      variant="contained"
                    >
                      Show All orders
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        history.push(
                          `/order-info/Byfield/isDelivered/cancelled`
                        );
                      }}
                      className={classes.button}
                      // fullWidth
                      color="secondary"
                      variant="contained"
                    >
                      Show cancelled
                    </Button>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Grid>

          <Grid item md={6} xs={12}>
            <Typography align="center" component="h5" variant="h5"></Typography>
          </Grid>
        </Grid>
        {orderList.map((el, index, list) => (
          <Card square key={uuid()} className={classes.root}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Grid container spacing={3}>
                  <Grid item md={4} xs={12}>
                    <Typography className={classes.spaceBottom}>
                      {el._id}
                    </Typography>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Paid Status: {el.isPaid ? "Paid" : "Not paid"}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Delivery Status:{el.isDelivered}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Total Price: RS:{" "}
                      {formatAmount(parseInt(el.originalPrice))}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Total Items:{el.orderItems.length}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Order Time:{new Date(el.orderTime).toDateString()}
                    </Typography>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <div>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          dispatch(fetchOrderByIdStart(el._id));
                          history.push(
                            `/order-info/AdminOrderDetails/${el._id}`
                          );
                        }}
                      >
                        details
                      </Button>
                      {currentUser.role === "admin" ? (
                        <div>
                          {el.isDelivered === "Pending Confirmation" ? (
                            <Button
                              className={classes.button}
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={() => {
                                dispatch(
                                  updateOrderByIdStart({
                                    orderId: el._id,
                                    isDelivered: "confirmed",
                                  })
                                );
                                setSnackBarMessage("Order is confirmed");
                              }}
                            >
                              Mark confirmed
                            </Button>
                          ) : null}
                          {
                            //el.isDelivered === "Pending Confirmation" ||
                            el.isDelivered === "confirmed" ? (
                              <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => {
                                  dispatch(
                                    updateOrderByIdStart({
                                      orderId: el._id,
                                      isDelivered: "delivered",
                                      isPaid: true,
                                    })
                                  );
                                  setSnackBarMessage(
                                    "order is marked delivered"
                                  );
                                }}
                              >
                                Mark Delivered
                              </Button>
                            ) : null
                          }
                          {el.isDelivered === "cancelled" ||
                          el.isDelivered === "delivered" ? null : (
                            <Button
                              className={classes.button}
                              variant="contained"
                              color="secondary"
                              fullWidth
                              onClick={() => {
                                dispatch(
                                  updateOrderByIdStart({
                                    orderId: el._id,
                                    isDelivered: "cancelled",
                                    isPaid: false,
                                  })
                                );
                                setSnackBarMessage("order is cancelled");
                              }}
                            >
                              Mark Cancelled
                            </Button>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        ))}

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
      </Container>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  orderList: selectOrderList,
  currentUser: selectCurrentUser,
  orderState: selectOrder,
});
export default connect(mapStateToProps)(withRouter(OrderList));
//! took the orderList array prop from parent component ...previously this approach caused error
//? passing through selectors via above structred selector solved the bug
