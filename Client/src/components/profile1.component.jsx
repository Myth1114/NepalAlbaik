import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { signOutStart } from "./../redux/user/user.actions";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import Avatar from "./avatar.component";
import { selectCurrentUser, selectUser } from "./../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
//todo write effect to make get api call to get user address
const useStyles = makeStyles({
  root: {
    margin: "auto",
    maxWidth: 345,
    padding: 10,

    // background: "#E6EFF1",

    borderRadius: 0,
  },
  media: {
    height: 90,
    justifyContent: "center",
  },
  center: {
    textAlign: "center",
    margin: 10,
    justifyContent: "center",
  },
  margin: {
    marginBottom: 10,
    minWidth: "70%",
    background: "#f2720c",

    borderRadius: 0,
  },
  bg: {
    borderRadius: 0,
    minHeight: 250,
  },
  parentbg: {
    // background: "#252b2b",
    borderRadius: 0,
  },
  view: {
    paddingTop: 20,
    paddingBottom: 20,
    minHeight: "40vw",
    background: "#E6EFF1",
  },
});

const MediaCard = ({ history, dispatch, user, match }) => {
  const classes = useStyles();

  return (
    <div className={classes.view}>
      <Card raised align="center" className={classes.root}>
        <CardActionArea>
          <Typography gutterBottom className={classes.center} variant="h5">
            Profile
          </Typography>
          <Avatar alt={`${user.name}`} src={`${user.photo}`} />

          <CardContent className={classes.bg}>
            <Typography
              gutterBottom
              className={classes.center}
              variant="h5"
              component="h2"
            >
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              className={classes.center}
              color="textSecondary"
              component="p"
            >
              {user.email}
            </Typography>
            <Typography className={classes.center}>{user._id}</Typography>
          </CardContent>
        </CardActionArea>

        <Button
          color="secondary"
          variant="contained"
          className={classes.margin}
          onClick={() => {
            history.push("/orders");
          }}
        >
          View Your Orders
        </Button>
        <Button
          color="secondary"
          variant="contained"
          className={classes.margin}
          onClick={() => {
            dispatch(signOutStart());
            history.push("/");
          }}
        >
          Sign Out account
        </Button>
      </Card>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  userDetails: selectUser,
});
export default connect(mapStateToProps)(withRouter(MediaCard));
