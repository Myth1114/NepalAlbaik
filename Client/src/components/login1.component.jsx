import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { googleSignInStart } from "./../redux/user/user.actions";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { emailSignInStart, signOutSuccess } from "./../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser, selectUser } from "./../redux/user/user.selector";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { clearOrderState } from "./../redux/order/order.actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    height: 500,

    paddingLeft: 10,
    paddingRight: 10,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  screen: {
    background: "#E6EFF1",
    paddingTop: 20,
    paddingBottom: 20,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "	#4285F4",
    color: "#ffffff",
  },
}));
const LoginForm = ({ dispatch, match, currentUser, userDetails, history }) => {
  const classes = useStyles();
  useEffect(() => {
    dispatch(signOutSuccess());
    return function () {
      dispatch(clearOrderState());
    };
  }, [dispatch]);

  const [buttonClick, buttonClickStatus] = useState(false);
  const [user, setUser] = useState({
    name: "",
    password: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e, key) => {
    // this fxn reads the target value and maps it to the state
    setUser(() => {
      return {
        ...user,
        [key]: e.target.value,
      };
    });
  };

  return (
    <div className={classes.screen}>
      <Container component="div" maxWidth="xs">
        <CssBaseline />
        <Card raised align="center" className={classes.root}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="email"
                id="email"
                onChange={(e) => {
                  handleChange(e, "email");
                }}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
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

              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  dispatch(emailSignInStart(user));
                  buttonClickStatus(() => true);
                }}
                color="primary"
                disabled={!user.email.length || !user.password}
                className={classes.submit}
              >
                Sign In
              </Button>

              {}

              {currentUser ? <Redirect to={`${history.goBack()}`} /> : null}
              {userDetails.error ? (
                <Snackbar
                  open={buttonClick}
                  className={classes.text}
                  autoHideDuration={3000}
                  onClose={() => {
                    buttonClickStatus(false);
                    dispatch(signOutSuccess());
                  }}
                  message={`${userDetails.error.message}`}
                >
                  <Alert
                    onClose={() => {
                      buttonClickStatus(false);
                      dispatch(signOutSuccess());
                      window.location.reload();
                    }}
                    severity="error"
                  >
                    {userDetails.error.message}
                  </Alert>
                </Snackbar>
              ) : null}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  dispatch(googleSignInStart());
                }}
              >
                Sign In With Google
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href={`${match.url}/resetPassword`} variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signupForm" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </Card>
      </Container>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userDetails: selectUser,
});
export default connect(mapStateToProps)(withRouter(LoginForm));
