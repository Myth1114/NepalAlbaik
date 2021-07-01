import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import { selectCurrentUser } from "./../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

const useStyles = (user) => {
  return makeStyles((theme) => ({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
      justifyContent: "center",
    },
    image: {
      width: 200,
      height: 200,

      backgroundSize: "cover",
      backgroundPosition: "center",

      margin: -24,
      padding: 24,
    },
  }));
};

const ImageAvatars = ({ user }) => {
  const classes = useStyles(user)();

  return (
    <div className={classes.root}>
      <Avatar alt={user.name} src={user.photo} />
    </div>
  );
};
const mapStateToProps = createStructuredSelector({ user: selectCurrentUser });

export default connect(mapStateToProps)(ImageAvatars);
