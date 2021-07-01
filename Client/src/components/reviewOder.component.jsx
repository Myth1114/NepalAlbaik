import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Spinner from "./../components/spinner.component";
import {
  selectCartItems,
  selectCartItemsPrice,
  selectCartItemsCount,
} from "./../redux/cart/cart.selector";
import { selectCurrentUser } from "./../redux/user/user.selector";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { createOrderStart } from "../redux/order/order.actions";
import { clearOrderState } from "./../redux/order/order.actions";
import { withRouter } from "react-router-dom";
import {
  selectPlaceingStatus,
  selectPlaceingError,
  selectOrderAddress,
  selectOrder,
} from "./../redux/order/order.selector";
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import emailjs from "emailjs-com";
import uuid from "react-uuid";
import formatAmount from "indian-currency-formatter";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  root: {
    maxWidth: 800,
    margin: "auto",
    background: "#ffffff",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  next: {
    display: "flex",

    margin: "auto",
    justifyContent: "space-around",
  },
  button: {
    borderRadius: 0,
    color: "#ffffff",
  },
  pos: {
    marginBottom: 12,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  typo: {
    textAlign: "right",
  },
  screen: {
    padding: "20px 10px",
    background: "#E6EFF1",
  },
  padding: {
    padding: "0px 15px",
  },
}));

function Review({
  dispatch,

  history,
  orderAddress,
  currentUser,
  cartArray,
  cartTotal,
  orderPlacingStatus,
  orderPlacingError,
  cartItemsCount,
  orderStatus: { createdOrder },
}) {
  const sendEmail = (orderPrice, orderID) => {
    var templateParams = {
      userID: currentUser._id,
      email: currentUser.email,
      name: currentUser.name,
      orderId: orderID,

      orderPrice: orderPrice,
      address: Object.values(orderAddress).join("  "),
    };

    emailjs
      .send(
        "service_rmph9tg",
        "template_hnk4clb",
        templateParams,
        "user_3XwrYOCjQpZF593GPDTNL"
      )
      .then(
        function (response) {},
        function (error) {}
      );
  };
  const classes = useStyles();
  useEffect(() => {
    return function () {
      dispatch(clearOrderState());
    };
  }, [dispatch]);

  // orderPlacingStatus === false && !orderPlacingError
  return orderPlacingStatus === true && orderPlacingError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : orderPlacingStatus === false && !orderPlacingError ? (
    <div>
      {sendEmail(createdOrder.originalPrice, createdOrder._id)}
      <Redirect to="/orders"></Redirect>
    </div>
  ) : currentUser === null ||
    currentUser.role === "admin" ||
    cartItemsCount < 1 ||
    orderAddress === null ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (
    <div className={classes.screen}>
      <Card raised className={classes.root}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Order summary
          </Typography>
          <List className={classes.padding}>
            <Grid container spacing={2}>
              {cartArray.map((product, index) => (
                <ListItem className={classes.listItem} key={uuid()}>
                  <Grid item xs={6} md={6}>
                    <ListItemText primary={product.name} />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography className={classes.typo} variant="body2">
                      {formatAmount(parseInt(product.quantity))} x RS.
                      {formatAmount(parseInt(product.price))}: RS.
                      {formatAmount(parseInt(product.quantity * product.price))}
                    </Typography>
                  </Grid>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  RS. {formatAmount(parseInt(cartTotal))}
                </Typography>
              </ListItem>
            </Grid>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography gutterBottom>
                Order placed by :{" "}
                {/* {currentUser.name === true ? currentUser.name : " "}{" "} */}
                <strong>{currentUser.email}</strong>
              </Typography>
              <Typography>{orderAddress.phoneNumber}</Typography>

              <Typography>
                {orderAddress.streetName ? (
                  <span>
                    {orderAddress.streetName}, {orderAddress.Ward}{" "}
                  </span>
                ) : null}
              </Typography>
              <Typography>{orderAddress.city}</Typography>
            </Grid>
            <Grid item className={classes.next} xs={12} sm={3}>
              <Button
                color="primary"
                className={classes.button}
                variant="contained"
                fullWidth
                onClick={() => {
                  dispatch(
                    createOrderStart({
                      orderItems: cartArray.map((el, index) => ({
                        quantity: el.quantity,
                        option: el.option,
                        _id: el._id,
                      })),

                      orderAddress,
                      cartTotal: cartTotal,
                    })
                  );
                }}
              >
                <strong>Next</strong>
              </Button>
            </Grid>
          </Grid>
        </CardContent>

        {orderPlacingStatus === false && !orderPlacingError
          ? sendEmail()
          : null}
        {orderPlacingError === true ? (
          <div>
            <Snackbar
              open={orderPlacingError}
              className={classes.text}
              autoHideDuration={3000}
              onClose={() => {
                history.goBack();
              }}
              message={`something went wrong please try again`}
            >
              <Alert onClose={() => {}} severity="error">
                message={`something went wrong please try again`}
              </Alert>
            </Snackbar>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orderAddress: selectOrderAddress,
  cartArray: selectCartItems,
  cartTotal: selectCartItemsPrice,
  currentUser: selectCurrentUser,
  orderPlacingStatus: selectPlaceingStatus,
  orderPlacingError: selectPlaceingError,
  cartItemsCount: selectCartItemsCount,
  orderStatus: selectOrder,
});
export default connect(mapStateToProps)(withRouter(Review));
