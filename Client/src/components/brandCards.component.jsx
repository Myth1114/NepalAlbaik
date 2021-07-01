import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { connect } from "react-redux";
import { fetchBrandProductStart } from "./../redux/product/product.actions";
import { selectProductList } from "./../redux/product/product.selector";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import BrandGridList from "./brandGridList.compoent";
import uuid from "react-uuid";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    marginBottom: 20,
    maxWidth: 400,
    maxHeight: 400,
  },

  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  div: {
    margin: "auto",
    maxWidth: 800,
  },
}));

function MediaControlCard({
  url,
  element,
  history,
  dispatch,
  brandArray,
  searchTerm,
}) {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() =>
    //make a dispatch to bring in the data for the product
    {
      dispatch(fetchBrandProductStart({ searchTerm }));
    }, [searchTerm, dispatch]);
  const correspondingArray = brandArray.filter(
    (el, index) => el.subCategory === searchTerm
  );

  return (
    <div className={classes.div}>
      {`this is ${searchTerm}`}
      <BrandGridList tileData={correspondingArray} />
      {correspondingArray.map((el, index) => (
        <CardContent key={uuid()}>
          <Card
            onClick={() => {
              history.push(`/product/${el._id}`);
            }}
            className={classes.root}
          >
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {el.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {el.category}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {el.price}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {el.size} -{el.unit}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </CardContent>
      ))}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  brandArray: selectProductList,
});

export default connect(mapStateToProps)(withRouter(MediaControlCard));
