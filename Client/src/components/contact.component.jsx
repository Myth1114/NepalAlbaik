import React, { useState } from "react";
import emailjs from "emailjs-com";
import TextField from "@material-ui/core/TextField";
import { selectCurrentUser } from "./../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router"; // import "./ContactUs.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
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
  button: {
    borderRadius: 0,
    position: "sticky",
    color:'#ffffff',

    bottom: 0,
  },
  grid: {
    marginBottom: 10,
    background: "#FFFFFF",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  container: {
    dispaly: "flex",
    paddingTop: 50,
    paddingBottom: 50,
    flexDirection: "column",
    justifyContent: "center",
    background: "#E6EFF1",
  },
  textArea: {
    minWidth: "100%",
    minHeight: 40,
  },
});
function ContactUs({ history, match, currentUser }) {
  const [buttonClick, buttonClickStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(0);
  const classes = useStyles();

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rmph9tg",
        "template_pll569f",
        e.target,

        "user_3XwrYOCjQpZF593GPDTNL"
      )
      .then(
        (result) => {
          // history.push("/");
          setMessage("Thank you...we will get back to you");
          buttonClickStatus(true);
          setCheck(1);
        },
        (error) => {
          history.push(match.url);
          setMessage("Could not send email , please try again later");
          buttonClickStatus(true);
          setCheck(2);
          //implement a snack bar
        }
      );
  }

  return (
    <div className={classes.container}>
      <Container>
        <Card raised className={classes.root}>
          <Typography align="center" variant="h4">
            Email us
          </Typography>
          <CardContent>
            <form className={classes.form} onSubmit={sendEmail}>
              <Grid item xs={12} sm={12}>
                Phone
                <TextField
                  type="number"
                  required
                  className={classes.grid}
                  id="PhoneNumber"
                  name="PhoneNumber"
                  fullWidth
                  placeholder="Enter your contact Number"
                  autoComplete="Contact Info"
                  variant="outlined"
                />
              </Grid>
              {currentUser ? (
                <div>
                  <Grid item xs={12} sm={12}>
                    email
                    <TextField
                      required
                      className={classes.grid}
                      id="email"
                      name="email"
                      value={currentUser.email}
                      fullWidth
                      autoComplete="Contact Info"
                      variant="outlined"
                    />
                  </Grid>
                </div>
              ) : null}
              <Grid item xs={12}>
                Name
                <TextField
                  required
                  id="user_name"
                  className={classes.grid}
                  name="user_name"
                  fullWidth
                  placeholder="e.g John Doe"
                  variant="outlined"
                />
              </Grid>
              Message
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="write to us"
                  rowsMin={3}
                  required
                  className={classes.textArea}
                  placeholder="Write your message here"
                  id="message"
                  name="message"
                  variant="outlined"
                />
              </Grid>
              {currentUser === null ? (
                <Button
                  color="primary"
                  onClick={() => {
                    history.push("/login");
                  }}
                  className={classes.button}
                  fullWidth
                  variant="contained"
                  disableElevation
                >
                  Login To Continue
                </Button>
              ) : (
                <div>
                  <input type="submit" value="Send" />
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        open={buttonClick}
        className={classes.text}
        autoHideDuration={2000}
        onClose={() => {
          buttonClickStatus(false);
          check === 1 ? history.push("/") : history.push(match.url);
        }}
        message={message}
      >
        <Alert
          onClose={() => {
            buttonClickStatus(false);
            check === 1 ? history.push("/") : history.push(match.url);
          }}
          severity="info"
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(withRouter(ContactUs));
