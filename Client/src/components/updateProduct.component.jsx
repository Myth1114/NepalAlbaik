import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchProductByIdStart,
  brandCleanUp,
} from "./../redux/product/product.actions";
import { withRouter } from "react-router-dom";
import {
  selectProductById,
  selectProduct,
} from "./../redux/product/product.selector";
import { selectCurrentUser } from "./../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import Spinner from "./../components/spinner.component";
import UpdateProductForm from "./../components/updateForm.component";
import { Redirect } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
const UpdateProduct = ({
  dispatch,
  match,
  history,
  product,
  currentUser,
  productState: { isProductLoading, error },
}) => {
  useEffect(() => {
    dispatch(fetchProductByIdStart(match.params.productId));
    return function () {
      dispatch(brandCleanUp());
    };
  }, [dispatch, match.params.productId]);
  return currentUser === null || currentUser.role !== "admin" ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (product === null && isProductLoading === false && error === undefined) ||
    (product === null && isProductLoading === true && error === undefined) ? (
    <div>
      <Spinner />
    </div>
  ) : product === null && isProductLoading === false && error !== undefined ? (
    <ErrorComponent />
  ) : (
    <div>
      <UpdateProductForm product={product} />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  product: selectProductById,
  productState: selectProduct,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(withRouter(UpdateProduct));
