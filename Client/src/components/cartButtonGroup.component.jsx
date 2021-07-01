import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "./../redux/cart/cart.actions";

function DisableElevation({ product, dispatch }) {
  return (
    <ButtonGroup disableElevation variant="contained" color="primary">
      <Button
        onClick={() => {
          dispatch(addItem(product));
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          dispatch(removeItem(product));
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          dispatch(clearItemFromCart(product));
        }}
      >
        x
      </Button>
    </ButtonGroup>
  );
}

export default connect(null)(DisableElevation);
