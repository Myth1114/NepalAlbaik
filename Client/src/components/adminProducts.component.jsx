import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProduct } from "./../redux/product/product.selector";
import { fetchProductCategoryStart } from "./../redux/product/product.actions";
import { brandCleanUp } from "./../redux/product/product.actions";
import { selectCurrentUser } from "./../redux/user/user.selector";
import Spinner from "./spinner.component";
import SimpleSelect from "./select.component";
import { Redirect } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";


const AdminProducts = ({
  productState: { fetchingCategoryList, categoryList, categoryListError },
  dispatch,
  currentUser,
}) => {
  useEffect(() => {
    dispatch(fetchProductCategoryStart());
    // todo write a cleanup fxn to reinit the product reducer
    return function cleanup() {
      //! this cleanup fxn was commented out
      dispatch(brandCleanUp());
    };
  }, [dispatch]);
  return currentUser === null || currentUser.role !== "admin" ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : categoryList === null &&
    fetchingCategoryList === false &&
    categoryListError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : categoryList === null &&
    fetchingCategoryList === true &&
    categoryListError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : categoryList !== null &&
    fetchingCategoryList === false &&
    categoryListError === undefined ? (
    <div>
      <SimpleSelect categoryList={categoryList} />
    </div>
  ) : (
    <ErrorComponent />
  );
};
const mapStateToProps = createStructuredSelector({
  productState: selectProduct,
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(AdminProducts);
