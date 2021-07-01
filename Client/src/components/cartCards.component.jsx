import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartItemsPrice,
  selectCartItemsCount,
} from "./../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import { Redirect, withRouter } from "react-router-dom";

import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "./../redux/cart/cart.actions";
import { selectCurrentUser } from "./../redux/user/user.selector";
import EmptyCart from "./EmptyCart";
import uuid from "react-uuid";
import formatAmount from "indian-currency-formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginLeft: 15,
    // marginRight: 15,

    margin: "auto",
    marginBottom: 30,

    borderRadius: 0,
    paddingTop: 30,
    marginTop: 30,
    paddingBottom: 30,
  },
  screen: {
    minHeight: "50vw",
    background: "#E6EFF1",
    margin: "auto",
    paddingLeft: 15,
    paddingRight: 15,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid gray",
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

    display: "flex",

    justifySelf: "start",
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
    justifyContent: "center",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  button: {
    boxShadow: "none",
    marginTop: 10,
    maxWidth: 25,
    maxHeight: 25,
    minWidth: 25,
    minHeight: 25,
    borderRadius: 0,
    marginLeft: 0,
    padding: 0,
  },
  Delete: {
    boxShadow: "none",
    marginTop: 10,
    maxWidth: 25,
    maxHeight: 25,
    minWidth: 25,
    minHeight: 25,
    borderRadius: 0,
    marginLeft: 50,
    padding: 0,
    background: "red",
  },
  checkoutButton: {
    bottom: 0,
    position: "sticky",
    margin: 0,
    borderRadius: 0,
    color: "#ffffff",
    width: 350,
  },
  description: {
    margin: 10,
  },
  cartText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  cartEmpty: {
    height: 400,

    width: 350,
    display: "flex",
    textAlign: "center",
  },
  homePageButton: {
    maxWidth: 345,
    borderRadius: 0,
    margin: "auto",
  },
  space: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 15,
  },
}));

function MediaControlCard({
  cartArray,
  currentUser,
  history,
  match,
  cartTotal,
  dispatch,
  cartItemsCount,
}) {
  const classes = useStyles();

  function compare_item(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  return currentUser === null ? (
    <div className={classes.cartText}>
      {/* <Button
        color="primary"
        variant="contained"
        onClick={history.push("/login")}
      >
        login to continue
      </Button> */}
      <Redirect to="/Login" />
    </div>
  ) : currentUser.role === "admin" ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : cartItemsCount < 1 ? (
    <div className={classes.screen}>
      <EmptyCart />
    </div>
  ) : (
    <div className={classes.screen}>
      <Grid container spacing={1}>
        <Card raised className={classes.root}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Typography align="center" variant="h4">
                Cart
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography align="center" variant="h6">
                Total Products in cart: {cartArray.length}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography align="center" component="h5" variant="h6">
                Total Price: Rs.{formatAmount(parseInt(cartTotal))}
              </Typography>
            </Grid>
          </Grid>
          {cartArray.sort(compare_item).map((el, index) => (
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
                    <Typography
                      className={classes.spaceBottom}
                      variant="h5"
                      component="h5"
                    >
                      {el.name}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Price/unit: RS.{formatAmount(parseInt(el.price))}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Variant: {el.option}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Quanity: {el.quantity}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      Total: RS.{formatAmount(parseInt(el.quantity * el.price))}
                    </Typography>
                    <Typography className={classes.spaceBottom}>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          dispatch(removeItem(el));
                        }}
                      >
                        -
                      </Button>
                      <Button
                        className={classes.button}
                        variant="text"
                        color="primary"
                      >
                        {el.quantity}
                      </Button>

                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          dispatch(addItem(el));
                        }}
                      >
                        +
                      </Button>

                      <Button
                        className={classes.Delete}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          dispatch(clearItemFromCart(el));
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          ))}
          <Grid container spacing={2}>
            <Grid item className={classes.space} md={12} xs={12}>
              {currentUser === null ? (
                <div>
                  <Button
                    color="primary"
                    onClick={history.push("/login")}
                    fullWidth
                    variant="contained"
                    disableElevation
                  >
                    <strong> Login To Continue</strong>
                  </Button>
                </div>
              ) : (
                <Button
                  className={classes.checkoutButton}
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    history.push(`${match.url}/checkOutAddress`);
                  }}
                >
                  <strong> check out</strong>
                </Button>
              )}
            </Grid>

            <Grid className={classes.space} item md={12} xs={12}>
              <Button
                className={classes.checkoutButton}
                color="primary"
                variant="contained"
                onClick={() => {
                  history.push("/");
                }}
              >
                <strong>Back To shopping</strong>
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  cartArray: selectCartItems,
  cartTotal: selectCartItemsPrice,
  currentUser: selectCurrentUser,
  cartItemsCount: selectCartItemsCount,
});
export default connect(mapStateToProps)(withRouter(MediaControlCard));
