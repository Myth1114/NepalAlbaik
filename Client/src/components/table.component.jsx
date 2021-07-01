import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Button from "@material-ui/core/Button";
import { fetchBrandProductStart } from "./../redux/product/product.actions";
import {
  selectProductList,
  selectProduct,
} from "./../redux/product/product.selector";
import uuid from 'react-uuid';
import CardContent from "@material-ui/core/CardContent";
import Spinner from "./../components/spinner.component";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    maxWidth: 1000,
    margin: "auto",
  },
});

function BasicTable({
  productArray,
  searchCategory,
  dispatch,
  history,
  match,
  productState: { error, isProductListLoading },
}) {
  const classes = useStyles();
  useEffect(() => {
    // todo write a fxn to fetch the products by category
    dispatch(fetchBrandProductStart({ category: searchCategory }));
  }, [dispatch, searchCategory]);

  function createData(
    name,
    price,
    category,
    subCategory,
    variant,
    options,

    discount,
    _id
  ) {
    return {
      name,
      price,
      category,
      subCategory,
      variant,
      options,

      discount,
      _id,
    };
  }


  if (productArray !== null) {
    var productArrayDest = productArray.map((el, index) => {
      const {
        name,
        price,
        category,
        subCategory,
        variant,
        options,

        discount,
        _id,
      } = el;

      return createData(
        name,
        price,
        category,
        subCategory,
        variant,
        options,

        discount,
        _id
      );
    });
    var rows = productArrayDest;
  }
  

  return productArray === null &&
    isProductListLoading === false &&
    error === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : productArray === null &&
    isProductListLoading === true &&
    error === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : productArray !== null &&
    isProductListLoading === false &&
    error !== undefined ? (
    <div>error</div>
  ) : (
    <div>
      {" "}
      <CardContent className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">category</TableCell>
                <TableCell align="right">subCategory</TableCell>
                <TableCell align="right">variant</TableCell>

                <TableCell align="right">discount</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={uuid()}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {parseInt(row.price)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.category}
                  </TableCell>
                  <TableCell align="right">{row.subCategory}</TableCell>
                  <TableCell align="right">
                    {row.options === undefined ||
                    row.options === null ||
                    Object.keys(row.options).length === 0 ||
                    row.options[Object.keys(row.options)[0]].length === 0
                      ? "No Options"
                      : Object.values(row.options).join(",")}
                  </TableCell>

                  <TableCell align="right">{row.discount}</TableCell>
                  <TableCell align="right">
                    {
                      <Button
                        onClick={() => {
                          history.push(`product-info/updateProduct/${row._id}`);
                        }}
                      >
                        change
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  productArray: selectProductList,
  productState: selectProduct,
});
export default connect(mapStateToProps)(withRouter(BasicTable));
