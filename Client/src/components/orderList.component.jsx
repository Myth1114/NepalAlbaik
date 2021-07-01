import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { selectOrderList } from "./../redux/order/order.selector";
import { createStructuredSelector } from "reselect";
import { fetchOrderByIdStart } from "./../redux/order/order.actions";
import { selectCurrentUser } from "./../redux/user/user.selector";
import formatAmount from "indian-currency-formatter";

import uuid from "react-uuid";
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 1000,
    margin: "auto",
    boxShadow: "none",
    // background: "none",
    minHeight: "100vh",
    paddingBottom: 20,
    background: "#E6EFF1",
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
  stackOverflow: {
    color: "#ffffff",
  },
  order: {
    paddingTop: 10,
    // paddingBottom: 10,
  },
  card: { maxWidth: 1000, margin: "auto", border: "1px solid gray" },
}));

function OrderList({ orderList, currentUser, dispatch, match, history }) {
  const classes = useStyles();
  const theme = useTheme();

  return orderList.length === 0 ? (
    <div className={classes.root}>
      {" "}
      <Typography align="center" variant="h5">
        Empty List
      </Typography>
    </div>
  ) : (
    <div className={classes.root}>
      <Container fixed>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography className={classes.order} align="center" variant="h4">
              Your Orders
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography align="center" component="h5" variant="h5"></Typography>
          </Grid>
        </Grid>
        {orderList.map((el, index, list) => (
          <Card className={classes.card} square key={uuid()}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Grid className={classes.grid} container spacing={3}>
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
                      Payment: {el.isPaid ? "Paid" : "Pending"}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Delivery Status:{" "}
                      <strong>
                        {"  "}
                        {el.isDelivered.charAt(0).toUpperCase() +
                          el.isDelivered.slice(1)}
                      </strong>
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Total Price: RS.{formatAmount(parseInt(el.originalPrice))}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Total Items: {el.orderItems.length}
                    </Typography>
                    <Typography
                      className={classes.spaceBottom}
                      variant="subtitle1"
                      color="textSecondary"
                    >
                      Order Time: {new Date(el.orderTime).toDateString()}
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
                          history.push(`${match.url}/orderDetails/${el._id}`);
                        }}
                      >
                        <strong className={classes.stackOverflow}>
                          details{" "}
                        </strong>
                      </Button>
                      {/* {currentUser.role === "admin" ? (
                      <div>
                        {" "}
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          fullWidth
                          // onClick={() => {
                          //   
                          //   dispatch(fetchOrderByIdStart(el._id));
                          //   history.push(`${match.url}/orderDetails/${el._id}`);
                          // }}
                        >
                          Mark confirmed
                        </Button>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          fullWidth
                          // onClick={() => {
                          //   
                          //   dispatch(fetchOrderByIdStart(el._id));
                          //   history.push(`${match.url}/orderDetails/${el._id}`);
                          // }}
                        >
                          Mark Delivered
                        </Button>
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="secondary"
                          fullWidth
                          // onClick={() => {
                          //   
                          //   dispatch(fetchOrderByIdStart(el._id));
                          //   history.push(`${match.url}/orderDetails/${el._id}`);
                          // }}
                        >
                          Mark Cancelled
                        </Button>
                      </div>
                    ) : null} */}

                      {/* <Button
                     className={classes.button}
                     variant="contained"
                     color="secondary"
                     onClick={() => {
                       dispatch(clearItemFromCart(el));
                     }}
                   >
                     x
                   </Button> */}
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        ))}
      </Container>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orderList: selectOrderList,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(OrderList));
