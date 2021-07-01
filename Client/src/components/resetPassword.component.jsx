import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { selectUser } from "./../redux/user/user.selector";
import {
  sendPasswordResetStart,
  signOutSuccess,
} from "./../redux/user/user.actions";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  screen: {
    background: "#ffffff",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
  },
}));

function ResetEmail({
  dispatch,
  match,
  history,
  user: {
    passwordResetLoading,
    passwordReset,
    passwordResetError,
    currentUser,
  },
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    email: null,
  });

  const handleChange = (e) => {
    setState((state) => ({
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    dispatch(sendPasswordResetStart(state));
  };

  return currentUser !== null ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (
    <div className={classes.screen}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Send password reset link
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="email"
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
              className={classes.submit}
            >
              Send Reset Link
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
        {passwordReset === true || passwordResetError !== undefined ? (
          <div>
            {" "}
            <Snackbar
              open={true}
              className={classes.text}
              autoHideDuration={2000}
              onClose={() => {
                passwordResetError !== undefined
                  ? dispatch(signOutSuccess())
                  : history.push("/Login");
              }}
              message={
                passwordResetError !== undefined
                  ? "Some thing went wrong"
                  : "Reset Link sent"
              }
            >
              <Alert
                onClose={() => {
                  passwordResetError !== undefined
                    ? history.push(match.url)
                    : history.push("/Login");
                }}
                severity="error"
              >
                {passwordResetError !== undefined
                  ? "Some thing went wrong"
                  : "Reset Link sent"}
              </Alert>
            </Snackbar>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  user: selectUser,
});
export default connect(mapStateToProps)(withRouter(ResetEmail));
