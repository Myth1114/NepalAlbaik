import React from "react";
import Marquee from "react-fast-marquee";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
  },
}));
const HomeMarquee = ({ children }) => {
  const classes = useStyles();
  return (
    <Marquee pauseOnClick={true} delay={4} speed={40} className={classes.root}>
      {children}
    </Marquee>
  );
};

export default HomeMarquee;
