import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Spinner from "./../components/spinner.component";
import {
  fetchBrandProductStart,
 
} from "./../redux/product/product.actions";
import {
  selectProductList,
  selectProduct,
} from "./../redux/product/product.selector";
import uuid from 'react-uuid';
//import { Carousel } from 'react-bootstrap'
import "./slider.css";

//import SideNav from './side-nav/sideNav'
const Slider = ({
  history,
  dispatch,
  match,
  products,
  field,
  searchTerm,
  productState: { isProductListLoading, error },
}) => {
  const indexCount =
    match.params.field === "featured"
      ? 10
      : match.params.field === undefined || match.params.field === null
      ? 10
      : 4;
  useEffect(() => {
    dispatch(fetchBrandProductStart({ [field]: searchTerm }));
  }, [dispatch, field, searchTerm]);
  return isProductListLoading === false &&
    error === undefined &&
    products === null ? (
    <div>
      <Spinner />
    </div>
  ) : isProductListLoading === true &&
    products === null &&
    error === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : isProductListLoading === false &&
    products === null &&
    error !== undefined ? (
    <div>Error</div>
  ) : (
    <Fragment>
  
      <div className="scrollingCategory ">
        {products
          .filter(
            (el, index, array) =>
              (index < indexCount && el._id !== match.params.id) ||
              array.length === 1
          )
          .map((el) => (
            <div
              key={uuid()}
              onClick={() => {
                history.push(
                  `/product/searchTerm/${field}/${searchTerm}/${el._id}`
                );
              }}
              className="catImage"
            >
              <div className="im-container">
                <center>
                  <img src={`${el.image[0]}`} alt={el.name}></img>
                </center>
              </div>
              <div className="catTex">
             
                  <Typography align="center" variant="subtitle2">
                    {el.name
                      .split(" ")
                      .filter((el, index) => index < 3)
                      .join(" ")}
                  </Typography>
               
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  products: selectProductList,
  productState: selectProduct,
});
export default connect(mapStateToProps)(withRouter(Slider));
