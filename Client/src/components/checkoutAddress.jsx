import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser, selectUser } from "./../redux/user/user.selector";
import { selectCartItemsCount } from "./../redux/cart/cart.selector";
import { updateOrderAddress } from "../redux/order/order.actions";
import { Redirect, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    // margin: "auto",
    margin: "20px auto",
    // boxShadow: "none",
    background: "#ffffff",
  },
  button: {
    color: "#ffffff",
    borderRadius: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  space: {
    // margin: "0",
    background: "#E6EFF1",

    padding: "20px 2.5px",
  },
  text: {
    textAlign: "center",
    margin: "15px 5px",
  },
});
const CheckOutAddressForm = function ({
  cartItemsCount,
  dispatch,
  match,
  history,
}) {
  const classes = useStyles();
  const [address, setAddress] = useState({
    PhoneNumber: "",
    streetName: "",
    Ward: "",
    city: "",

    postalCode: "",
    province: "",
    country: "Nepal",
  });
  const handleChange = (e) => {
    setAddress(() => ({
      ...address,
      [e.target.id]: e.target.value,
    }));
  };

  return cartItemsCount > 0 ? (
    <div className={classes.space}>
      <Container fixed>
        <Card raised className={classes.root}>
          <CardContent>
            <Typography
              className={classes.text}
              // variant="h6"
              variant="h5"
              gutterBottom
            >
              Your Delivery Address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="PhoneNumber"
                  name="PhoneNumber"
                  type="number"
                  onChange={handleChange}
                  label="Phone Number"
                  fullWidth
                  autoComplete="Contact Info"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  id="streetName"
                  name="streetName"
                  label="streetname/Landmark"
                  fullWidth
                  onChange={handleChange}
                  autoComplete="shipping address-line1"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="Ward"
                  name="Ward"
                  label="District"
                  fullWidth
                  onChange={handleChange}
                  autoComplete="shipping address-line2"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  onChange={handleChange}
                  autoComplete="shipping address-level2"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  placeholder="Enter province no."
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="postalCode"
                  name="postalCode"
                  label="Zip / Postal code"
                  fullWidth
                  type="number"
                  onChange={handleChange}
                  autoComplete="shipping postal-code"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  onChange={handleChange}
                  value="Nepal"
                  disabled
                  autoComplete="shipping country"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={
                    address.PhoneNumber.length < 9 ||
                    address.PhoneNumber.length > 14 ||
                    address.streetName.length < 3 ||
                    address.city.length <= 2
                      ? true
                      : false
                  }
                  fullWidth
                  onClick={() => {
                    const addressString = address;

                    dispatch(updateOrderAddress({ ...addressString }));
                    history.push(`${match.url}/reviewOrder`);
                  }}
                  size="small"
                >
                  <strong>next</strong>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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
});
export default connect(mapStateToProps)(withRouter(CheckOutAddressForm));
