import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectProduct } from "./../redux/product/product.selector";
import { selectCurrentUser, selectUser } from "./../redux/user/user.selector";
import { selectCartItemsCount } from "./../redux/cart/cart.selector";
import Typography from "@material-ui/core/Typography";

import { updateProductByIdStart } from "./../redux/product/product.actions";
import { Redirect, withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//todo dispatch to next checkout process after dispatch .i.e (implemention checkout component template)
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "auto",
    // boxShadow: "none",
    // background: "none",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  typo: {
    marginBottom: 20,
    marginTop: 10,
  },
  space: {
    margin: "0",
    paddingTop: 20,
    paddingBottom: 20,
    background: "#E6EFF1",
  },
  text: {
    textAlign: "center",
  },
  button:{
    borderRadius:0,
    color:'#ffffff'
  }
});
const UpdateProductForm = function ({
  product: {
    name,
    price,
    category,
    subCategory,

    options,
    featured,
    discount,
    _id,
    inStock,
  },
  productState: { isProductUpdating, productUpdateError, isProductUpdated },
  dispatch,
  match,
  history,
  product,
}) {
  const [buttonClick, buttonClickStatus] = useState(false);

  const classes = useStyles();
  const [updateProduct, setProduct] = useState({
    name,
    price,
    category,
    subCategory,

    options,
    featured,
    discount,
    inStock,
    _id,
  });

  const handleChange = (e) => {
    setProduct(() => ({
      ...updateProduct,
      [e.target.id]: e.target.value,
    }));
  };
  const handlePriceChange = (e) => {
    setProduct(() => ({
      ...updateProduct,
      price: parseInt(e.target.value),
    }));
  };
  const handleChangeVariantsKey = (e) => {
    if (
      options === undefined ||
      options === null ||
      e.target.value.length === 0
    ) {
      const options = {};
      const key = e.target.value === 0 ? "variants" : e.target.value.trim();
      Object.values(options)[0] = [""];
      setProduct(() => ({
        ...updateProduct,
        options: {
          [key]: [""],
        },
      }));
    } else {
      const key = e.target.value === 0 ? "variants" : e.target.value.trim();

      setProduct(() => ({
        ...updateProduct,
        options: {
          [key]: Object.values(updateProduct.options)[0],
        },
      }));
    }
  };
  const handleChangeVariants = (e) => {
    if (e.target.value.length === 0) {
      setProduct(() => ({
        ...updateProduct,
        [e.target.id]: {
          [Object.keys(updateProduct.options)]: [""],
        },
      }));
    } else {
      setProduct(() => ({
        ...updateProduct,
        [e.target.id]: {
          [Object.keys(updateProduct.options)[0]]: e.target.value
            .split(",")
            .map((el, index) => el.trim()),
        },
      }));
    }
  };

  return product ? (
    <div className={classes.space}>
      <Container fixed>
        <Card raised className={classes.root}>
          <CardContent>
            <Typography
              className={classes.typo}
              align="center"
              component="h1"
              variant="h4"
            >
              Update Product
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  onChange={handleChange}
                  label="Product Name"
                  defaultValue={product.name}
                  fullWidth
                  autoComplete="Product Name"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="price"
                  name="price"
                  type="number"
                  label="Product price"
                  fullWidth
                  defaultValue={parseInt(price)}
                  onChange={handlePriceChange}
                  autoComplete="Product price"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="category"
                  name="category"
                  label="category"
                  fullWidth
                  defaultValue={category}
                  onChange={handleChange}
                  autoComplete="Product category"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="subCategory"
                  name="subCategory"
                  label="Brand"
                  fullWidth
                  onChange={handleChange}
                  defaultValue={subCategory}
                  autoComplete="shipping address-level2"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="optionsKey"
                  name="optionsKey"
                  label="optionsKey"
                  placeholder="e.g flavours"
                  fullWidth
                  defaultValue={
                    options === undefined ||
                    options === null ||
                    Object.keys(options).length === 0
                      ? null
                      : Object.keys(options)[0]
                  }
                  onChange={handleChangeVariantsKey} //write a custom fxn
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  id="options"
                  name="options"
                  label="options"
                  fullWidth
                  placeholder="e.g chocolate,coffee,vanilla"
                  defaultValue={
                    options === undefined || options === null
                      ? null
                      : Object.values(options)[0].join(",")
                  }
                  onChange={handleChangeVariants} //write a custom fxn
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="discount"
                  name="discount"
                  label="Discount % "
                  fullWidth
                  type="number"
                  onChange={handleChange}
                  defaultValue={discount}
                  autoComplete="Discount "
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="inStock"
                  name="inStock"
                  label="Stock Count"
                  fullWidth
                  type="number"
                  onChange={(e) => {
                    e.target.value > 0
                      ? setProduct(() => ({
                          ...updateProduct,
                          [e.target.id]: true,
                        }))
                      : setProduct(() => ({
                          ...updateProduct,
                          [e.target.id]: false,
                        }));
                  }}
                  defaultValue={inStock === true ? 10 : 0}
                  autoComplete="Discount "
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="featured"
                  name="featured"
                  label="mark featured"
                  fullWidth
                  type="number"
                  onChange={(e) => {
                    e.target.value > 0
                      ? setProduct(() => ({
                          ...updateProduct,
                          [e.target.id]: true,
                        }))
                      : setProduct(() => ({
                          ...updateProduct,
                          [e.target.id]: false,
                        }));
                  }}
                  defaultValue={featured === true ? 1 : 0}
                  autoComplete="Discount "
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className={classes.button}
                  onClick={() => {
                    dispatch(
                      updateProductByIdStart({
                        ...updateProduct,
                      })
                    );
                  }}
                  size="small"
                >
                  next
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {(isProductUpdated && productUpdateError === undefined) ||
        productUpdateError !== undefined ? (
          <div>
            <Snackbar
              open={true}
              className={classes.text}
              autoHideDuration={2000}
              onClose={() => {
                buttonClickStatus(false);
                history.goBack();
              }}
              message={`${
                isProductUpdated && productUpdateError === undefined
                  ? " Updated the product successfully"
                  : "Some thing went wrong"
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
                  isProductUpdated && productUpdateError === undefined
                    ? " Updated the product successfully"
                    : "Some thing went wrong"
                }`}
              </Alert>
            </Snackbar>{" "}
          </div>
        ) : null}
      </Container>
    </div>
  ) : (
    <div>
      <Redirect to="/" />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  userDetails: selectUser,
  cartItemsCount: selectCartItemsCount,
  productState: selectProduct,
});
export default connect(mapStateToProps)(withRouter(UpdateProductForm));
