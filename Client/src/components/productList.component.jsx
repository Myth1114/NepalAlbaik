import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import Spinner from "./../components/spinner.component";
import {
  fetchBrandProductStart,
  clearProductList,
} from "./../redux/product/product.actions";
import {
  selectProductList,
  selectProduct,
} from "./../redux/product/product.selector";
import { connect } from "react-redux";
import ErrorComponent from "./ErrorComponent";
import formatAmount from "indian-currency-formatter";
import Pagination from "@material-ui/lab/Pagination";
import uuid from "react-uuid";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 230,
    marginBottom: 10,
    height: 280,
    margin: "auto",
    // boxShadow: "none",
    // background: "none",
    background: "#ffffff",
  },
  paginate: {
    "& > *": {
      marginTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      display: "flex",
      justifyContent: "center",
    },
  },

  screen: {
    // minHeight: "50vw",
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
  media: {
    marginLeft: 5,
    height: 0,
    paddingTop: "56.25%",
  },
  spaceBottom: {
    margin: "20",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },

  text: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5, // justifyContent: "felx-end",
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
  header1: {
    fontSize: 12,
  },
  searchTerm: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  price: {
    fontSize: 16,
    color: "#DC143C",
  },
}));
const ProductList = ({
  productListArray,
  product: { isProductListLoading, error, searchTerm, productLength },
  product,
  dispatch,
  history,
  match,
}) => {
  const classes = useStyles();
  const [field, setField] = useState(
    match.url.split("/")[match.url.split("/").length - 2]
  );
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(
      fetchBrandProductStart({
        [match.params.field]: match.params.searchTerm,
        page,
      })
    );

    return function () {
      dispatch(clearProductList());
    };
  }, [dispatch, match.params.field, match.params.searchTerm, page]);

  return productListArray === null &&
    isProductListLoading === false &&
    error === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : productListArray === null &&
    isProductListLoading === true &&
    error === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : productListArray === null &&
    isProductListLoading === false &&
    error !== undefined ? (
    <div>
      <ErrorComponent />
    </div>
  ) : (
    <div className={classes.screen}>
      <Grid className={classes.grid} container spacing={1}>
        <Grid item md={12} xs={12}>
          <Typography
            className={classes.searchTerm}
            align="center"
            component="h5"
            variant="h4"
          >
            {match.params.searchTerm.split("-").join(" ")}
          </Typography>
        </Grid>

        {productListArray.map((el, index, array) => (
          <Grid
            key={uuid()}
            item
            md={array.length < 3 ? 6 : array.length === 3 ? 4 : 3}
            xs={6}
          >
            <Card raised className={classes.root}>
              <CardMedia
                className={classes.cover}
                image={el.image[0]}
                title="Live from space album cover"
                onClick={() => {
                  history.push(`${match.url}/${el._id}`);
                }}
              />
              <CardContent>
                <Typography variant="subtitle1" component="p"></Typography>
                <Typography align="center" variant="subtitle1" component="p">
                  <strong className={classes.text}>
                    {el.name
                      .split(" ")
                      .filter((el, index) => index < 3)
                      .join(" ")}
                  </strong>
                </Typography>
                <Typography
                  className={classes.text}
                  variant="subtitle1"
                  align="center"
                >
                  {field === "category"
                    ? `Brand: ${el.subCategory.split("-").join(" ")}`
                    : `Category: ${el.category.split("-").join(" ")}`}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  Rs.
                  <span className={classes.price}>
                    {formatAmount(
                      parseInt(el.price - (el.price * el.discount) / 100)
                    )}
                    {"  "}
                  </span>
                  {el.discount > 0 ? <span>{el.discount}% off</span> : null}
                </Typography>
                <Typography align="center" variant="subtitle2">
                  <span></span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className={classes.paginate}>
        <Pagination
          count={Math.ceil(productLength / 8)}
          onClick={(e) => {
            setPage(parseInt(e.target.textContent));
          }}
          page={page}
          color="primary"
          hidePrevButton
          hideNextButton
        />
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  productListArray: selectProductList,
  product: selectProduct,
});
export default connect(mapStateToProps)(withRouter(ProductList));
