import React, { useState, useEffect } from "react";
import Carousel from "./carousel.component";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SimpleCard from "./cardBody.component";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductOption,
  selectProduct,
} from "./../redux/product/product.selector";
import Typography from "@material-ui/core/Typography";
import { fetchProductByIdStart } from "./../redux/product/product.actions";
import Description from "./description.component";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

import { addItem } from "./../redux/cart/cart.actions";
import OptionsAccordion from "./optionsAccordion.component";
import { selectCartItemsPrice } from "./../redux/cart/cart.selector";
import Spinner from "./../components/spinner.component";
import Slider from "./slider.component";
import { selectCurrentUser } from "./../redux/user/user.selector";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorComponent from "./ErrorComponent";
import MuiAlert from "@material-ui/lab/Alert";
import { brandCleanUp } from "./../redux/product/product.actions";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  container: {
    padding: 20,
  },
  grid: {
    flexGrow: 1,
  },
  Description: {
    margin: theme.spacing(0),
  },
  radio: {
    marginTop: 15,
    marginBottom: 15,
  },
  camaflauge: {
    boxShadow: 0,
    background: "none",
  },
  button: {
    borderRadius: 0,
    position: "sticky",
    marginBottm: 10,
    bottom: 0,
    color: "#FFFFFF",
  },
  spaceBottom: {
    marginBottom: 10,
    marginTop: 10,
  },

  card: {
    boxShadow: "none",
  },
  carouselCard: {
    height: 350,
    width: 350,
    margin: "auto",
    boxShadow: "none",
  },
}));

const ProductDetailPage = ({
  productId,
  totalCartPrice,

  match,
  dispatch,
  history,
  productOption,

  productState: { isProductLoading, error, product },
  currentUser,
}) => {
  useEffect(() => {
    dispatch(fetchProductByIdStart(match.params.id));
    return function () {
      dispatch(brandCleanUp());
    };
  }, [dispatch, match.params.id]);
  const relatedField =
    match.params.field === "subCategory"
      ? match.params.searchTerm.split("-").join(" ")
      : match.params.field === "tags"
      ? "Search Results"
      : match.params.field === "featured"
      ? "Featured"
      : match.params.searchTerm;
  const classes = useStyles();
  const [buttonClick, buttonClickStatus] = useState(false);
  return isProductLoading === false &&
    error === undefined &&
    product === null ? (
    <div>
      <Spinner />
    </div>
  ) : isProductLoading === true && error === undefined && product === null ? (
    <div>
      <Spinner />
    </div>
  ) : isProductLoading === false && error === undefined && product !== null ? (
    <div>
      <Grid className={classes.container} container spacing={3}>
        <Grid item md={6} xs={12}>
          {/* <Container fixed> */}
          <Card className={classes.card}>
            <Card className={classes.carouselCard}>
              <Carousel>{product.image}</Carousel>
            </Card>

            <SimpleCard productInfo={product} />
          </Card>
          {/* </Container> */}
        </Grid>

        <Grid className={classes.container} item md={6} xs={12}>
          {/* <Container className={classes.container}> */}
          <Description product={product} />
          {product.options ? (
            // <Card className={classes.radio}>
            //   <CardContent>
            //     {/* <OptionsButton
            //       optionsKey={Object.keys(product.options)[0]}
            //       optionsArray={Object.values(product.options)[0]}
            //     /> */}

            //   </CardContent>
            // </Card>
            <OptionsAccordion
              className={classes.radio}
              optionsKey={Object.keys(product.options)[0]}
              optionsArray={Object.values(product.options)[0]}
            />
          ) : null}
          {currentUser === null ? (
            <Button
              color="primary"
              onClick={() => {
                history.push("/login");
              }}
              className={classes.button}
              fullWidth
              variant="contained"
              disableElevation
            >
              Login To Continue
            </Button>
          ) : currentUser.role === "admin" ? null : (
            <div>
              {" "}
              <div>
                <Button
                  color="primary"
                  onClick={() => {
                    dispatch(
                      addItem({
                        ...product,
                        price:
                          product.price -
                          (product.price * product.discount) / 100,
                        quantity: 1,
                        option: productOption,
                      })
                    );
                    buttonClickStatus(true);
                  }}
                  className={classes.button}
                  fullWidth
                  disabled={product.inStock ? false : true}
                  variant="contained"
                  disableElevation
                >
                  <strong>
                    {product.inStock ? "Add to cart" : "Out of stock"}
                  </strong>
                </Button>

                <Snackbar
                  open={buttonClick}
                  className={classes.text}
                  autoHideDuration={2000}
                  onClose={() => {
                    buttonClickStatus(false);
                  }}
                  message={`${product.name} added to Cart`}
                >
                  <Alert
                    onClose={() => {
                      buttonClickStatus(false);
                    }}
                    severity="info"
                  >
                    {`${product.name} added to Cart`}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          )}
          <Typography
            className={classes.spaceBottom}
            align="center"
            component="h5"
            variant="h5"
          >
            {`See more in ${relatedField}`}
          </Typography>
          <Slider
            field={match.params.field}
            searchTerm={match.params.searchTerm}
          />
          {/* </Container> */}
        </Grid>
      </Grid>
    </div>
  ) : (
    <ErrorComponent />
  );
};

const mapStateToProps = createStructuredSelector({
  productState: selectProduct,
  productOption: selectProductOption,
  totalCartPrice: selectCartItemsPrice,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(ProductDetailPage));
//isProductLoading,error,product,selectProduct
