import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Spinner from "./../components/spinner.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectProduct } from "./../redux/product/product.selector";
import { createStructuredSelector } from "reselect";
import uuid from "react-uuid";
import formatAmount from "indian-currency-formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 265,
    marginBottom: 10,
    margin: "auto",
    boxShadow: "none",
    background: "none",
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

  grid: {
    text: "justify",
    display: "flex",
    // justifyContent: "felx-end",
  },

  price: {
    fontSize: 16,
    color: "#DC143C",
  },
}));
const Listing = ({
  productState: { searchListLoading, searchList, searchListError },
  history,
  tags,
  match,
}) => {
  const classes = useStyles();
  return searchList === null &&
    searchListLoading === false &&
    searchListError === undefined ? null : searchList === null &&
    searchListLoading === true &&
    searchListError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : searchList === null &&
    searchListLoading === false &&
    searchListError !== undefined ? null : searchList === null ||
    searchList === undefined ||
    searchList.length < 1 ? null : (
    <div>
      <Container className={classes.screen} fixed>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item md={12} xs={12}>
            <Typography align="center" component="h5" variant="h5">
              products from your search
            </Typography>
          </Grid>

          {searchList.map((el, index, array) => (
            <Grid key={uuid()} item md={array.length < 3 ? 6 : 4} xs={12}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  image={el.image[0]}
                  title="Live from space album cover"
                  onClick={() => {
                    history.push(`/product/searchTerm/tags/${tags}/${el._id}`);
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="p"></Typography>
                  <Typography align="center" variant="subtitle1" component="p">
                    <strong>
                      {el.name
                        .split(" ")
                        .filter((el, index) => index < 3)
                        .join(" ")}
                    </strong>
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
      </Container>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  productState: selectProduct,
});
export default connect(mapStateToProps)(withRouter(Listing));
