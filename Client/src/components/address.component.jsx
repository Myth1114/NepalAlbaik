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
import { updateAddressStart } from "./../redux/user/user.actions";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "auto",
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
    margin: "0",
  },
});
const AddressForm = function ({
  user: { name, _id },
  user,
  dispatch,
  history,
  userDetails: { error },
}) {
  const classes = useStyles();
  const [address, setAddress] = useState({
    name,
    postalCode: "32900",
    country: "Nepal",
    province: "5",
    city: "Bhairahawa",
  });

  
  const handleChange = (e) => {
    setAddress(() => ({
      ...address,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className={classes.space}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Get current location
          </Typography>

          <Typography variant="h6" gutterBottom>
            Shipping address
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="phoneNumber"
                name="Number"
                onChange={handleChange}
                label="Phone Number"
                fullWidth
                autoComplete="contact Info"
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
                label="Ward no"
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
                value="Bhairahawa"
                disabled
                autoComplete="shipping address-level2"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                onChange={handleChange}
                value="5"
                disabled
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
                onChange={handleChange}
                value="32900"
                disabled
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
                fullWidth
                onClick={() => {
                  dispatch(updateAddressStart({ ...address, _id }));
                  history.push("/profile");
                }}
                size="small"
              >
                next
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  userDetails: selectUser,
});
export default connect(mapStateToProps)(withRouter(AddressForm));
