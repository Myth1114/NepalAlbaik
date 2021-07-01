import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  empty: {
    paddingTop:500,
    position: "relative",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  emptyImage: {
    animation: "$fadeIn .5s ease-in-out",
    animationIterationCount: 2,
    margin: "auto",
    opacity: 0.4,
  },
  figCaption: {
    fontSize: "16px",
    color: "#EA2027",
    padding: 1,
    textAlign: "center",
    fontWeight: 500,
  },
  "@keyframes fadeIn": {
    "0%": {
      transform: "translate(2px, 2px) rotate(0deg)",
    },
    "10%": {
      transform: "translate(-2px, -3px) rotate(-1deg)",
    },
    "40%": {
      transform: "translate(2px, -2px) rotate(1deg)",
    },
    "60%": {
      transform: "translate(-4px, 2px) rotate(0deg)",
    },
    "100%": {
      transform: "translate(2px, -3px) rotate(-1deg)",
    },
  },
}));
export default function ErrorComponent() {
  const classes = useStyles();
  return (
    <div className={classes.empty}>
      <figure>
        <img
          src="/images/error.png"
          alt="empty"
          className={classes.emptyImage}
        />
        <figcaption className={classes.figCaption}>
          Something Went Wrong!!!!
        </figcaption>
      </figure>
    </div>
  );
}
