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
import Card from "@material-ui/core/Card";
import { signUpStart, signOutSuccess } from "./../redux/user/user.actions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { selectCurrentUser, selectUser } from "./../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        MuscleNepal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  typo: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
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
  },
  margin: {
    maxWidth: 450,
    margin: "auto",
  },
  text: {
    textAlign: "center",
  },
  screen: {
    background: "#E6EFF1",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: "auto",
    paddingRight: "auto",
  },
}));

const SignUp = ({
  dispatch,
  history,
  userDetails: { error, currentUser, signUpstartStatus, signedUp },
}) => {
  const classes = useStyles();
  const [buttonClick, buttonClickStatus] = useState(false);
  const [message, setMessage] = useState(" ");

  const [user, setUser] = useState({});

  const onClose = () => {
    buttonClickStatus(false);
    if (user.password === user.currentPassword && error === undefined) {
      history.goBack();
    }
  };
  const handleChange = (e) => {
    // this fxn reads the target value and maps it to the state
    setUser(() => {
      return {
        ...user,
        [e.target.id]: e.target.value,
      };
    });
  };

  return signedUp === true ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : currentUser !== null ? (
    <div>
      <Redirect to="/" />
    </div>
  ) : (
    <div className={classes.screen}>
      <Card raised className={classes.margin}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    onChange={(e) => {
                      handleChange(e, "name");
                    }}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => {
                      handleChange(e, "email");
                    }}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => {
                      handleChange(e, "password");
                    }}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.typo}
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => {
                    handleChange(e, "confirmPassword");
                  }}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                />
              </Grid>
              {buttonClick === true ? (
                <div>
                  <Snackbar
                    open={buttonClick}
                    className={classes.text}
                    autoHideDuration={2000}
                    onClose={onClose}
                    message={message}
                  >
                    <Alert onClose={onClose} severity="error">
                      {message}
                    </Alert>
                  </Snackbar>
                </div>
              ) : null}
              {error !== undefined ? (
                <div>
                  <Snackbar
                    open={true}
                    className={classes.text}
                    autoHideDuration={2000}
                    onClose={() => {
                      dispatch(signOutSuccess());
                    }}
                    message={error.message}
                  >
                    <Alert
                      onClose={() => {
                        dispatch(signOutSuccess());
                      }}
                      severity="error"
                    >
                      {error.message}
                    </Alert>
                  </Snackbar>
                </div>
              ) : null}
              <Container>
                <Typography
                  className={classes.typo}
                  align="center"
                  variant="subtitle1"
                >
                  Click the verification link sent to your email and then
                  proceed to Login
                </Typography>
              </Container>
              <Button
                onClick={() => {
                  if (user.password === user.confirmPassword) {
                    dispatch(signUpStart(user));
                  } else {
                    setMessage("passwords do not match");
                    buttonClickStatus(() => true);
                  }
                }}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={
                  !user.email || !user.password || !user.confirmPassword
                }
              >
                Sign Up
              </Button>

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Card>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userDetails: selectUser,
});
export default connect(mapStateToProps)(withRouter(SignUp));
