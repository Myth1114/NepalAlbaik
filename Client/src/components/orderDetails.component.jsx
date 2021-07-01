import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";

import { withRouter } from "react-router-dom";

import {
  selectOrderByIdList,
  selectOrder,
} from "./../redux/order/order.selector";
import {
  clearOrderByIdList,
  fetchOrderByIdStart,
} from "./../redux/order/order.actions";
import { selectCurrentUser } from "./../redux/user/user.selector";
import Spinner from "./../components/spinner.component";
import ErrorComponent from "./ErrorComponent";
import uuid from "react-uuid";
import formatAmount from "indian-currency-formatter";
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
    marginLeft: 30,
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

    maxWidth: 750,
    margin: "auto",
    paddingTop: 30,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px  solid gray",
    borderBottom: "1px solid gray",
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
    textAlign: "Left",
  },
  cartText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  screen: {
    background: "#E6EFF1",
    minHeight: "35vw",
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
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
  orderState: { fetchingOrderById, fetchingOrderByIdError },
  history,
  match,

  dispatch,
}) {
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchOrderByIdStart(match.params.id));
    //todo could do without this cleanup fxn
    return function () {
      dispatch(clearOrderByIdList());
    };
  }, [dispatch, match.params.id]);

  return orderByIdList == null &&
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
        <Grid className={classes.grid} container spacing={1}>
          <Grid item md={12} xs={12}>
            <Typography align="center" component="h5" variant="h5">
              {/* ID: {orderByIdList._id} */}
              Order is {orderByIdList.isDelivered}
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography align="center" component="h5" variant="h6">
              {/* This order is {orderByIdList.isDelivered} */}
              ID: {orderByIdList._id}
            </Typography>
          </Grid>
        </Grid>

        {orderByIdList.orderItems.map((el, index) => (
          <div key={uuid()} className={classes.details}>
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
                    Price/unit: RS.{formatAmount(parseInt(el.price))}
                  </Typography>
                  <Typography className={classes.spaceBottom}>
                    Discount Price/unit: RS.
                    {formatAmount(
                      parseInt(
                        el.price - (el.price - (el.price * el.discount) / 100)
                      )
                    )}
                  </Typography>
                  <Typography className={classes.spaceBottom}>
                    Variant: {el.option}
                  </Typography>
                  <Typography className={classes.spaceBottom}>
                    Quanity Ordered: {el.quantity}
                  </Typography>
                  <Typography className={classes.spaceBottom}>
                    Tolal Price: Rs.
                    {formatAmount(
                      parseInt(
                        el.quantity *
                          (el.price - (el.price * el.discount) / 100)
                      )
                    )}
                  </Typography>
                  <Typography className={classes.spaceBottom}></Typography>
                </Grid>
              </Grid>
            </CardContent>
          </div>
        ))}
        <div className={classes.address}>
          <Typography align="center" component="h6" >
            Deliver to :{" "}
            {Object.values(orderByIdList.orderAddress)
              .filter((el, index) => el.length !== 0)
              .join(" , ")}
          </Typography>
          <Typography align="center" component="h5" variant="h6">
            {orderByIdList.userID.name} {orderByIdList.userID.email}
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
