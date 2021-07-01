import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { makeStyles } from "@material-ui/core/styles";
import uuid from "react-uuid";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
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
  text: {
    textAlign: "center",
  },
});
const DemoCarousel = ({ carouselArray, children, carouselWidth, xs, md }) => {
  const classes = useStyles();
  return (
    <Carousel
      useKeyboardArrows
      showArrows={false}
      showThumbs={false}
      autoPlay
      infiniteLoop
    >
      {children.map((el, index) => (
        <div className={classes.root} key={uuid()}>
          <img onClick={(e) => {}} src={el} alt="" />
        </div>
      ))}
    </Carousel>
  );
};
export default DemoCarousel;
