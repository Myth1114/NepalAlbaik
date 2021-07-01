import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Map from "./mabox.component";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  icons: {
    marginRight: 8,
    display: "flex",
    paddingTop: 20,
    paddingBottom: 20,
  },
  screen: {
    height: "100%",
  },
  avator: {
    width: "8em",
    height: "8em",
    boxShadow: "0px 0px 10px 1px #b2b2b28f",
  },
  grid: {
    padding: 20,
  },
}));
export default function About() {
  const classes = useStyles();
  return (
    <div className={classes.screen}>
      <Typography align="center" variant="h4">
        About MuscleNepal
      </Typography>
      {/* <Container maxWidth="lg"> */}
      <div className={classes.icons}>
        <LocationOnIcon />
        <Typography component="p">
          Office at - Shantinagar,Bhairahawa
        </Typography>
      </div>

      <Map className={classes.mapBox} />
      <Grid className={classes.grid} container direction="column">
        <Grid item>
          <h3>About us</h3>
          <Typography component="p" variant="body1">
            We are Musclenepal.com We are simply known for delivering genuine
            sports nutrition supplements to health enthusiasts at very
            affordable rates. We offer a humongous range of health products
            across categories and all major brands.
          </Typography>
          <h3>Our Mission</h3>
          <Typography component="p" variant="body1">
            Our basic mission is to help you to achieve your transformation
            goal. You can rely on us for the personal fitness training guide and
            for the consultant of entire necessary dietary supplements. We are
            here to help you achieve your goal and accomplish our own mission.
            We are with you as your nutritionist, your supplement expert,
            provider of all the necessary tools and products you need to burn
            fat.
          </Typography>
          <h3>We are committed to:</h3>
          <Typography component="p" variant="body1" gutterBottom>
            Take each and every individual’s goal equally seriously as they are
            doing. Inspire them with ‘Never Back Down’ perspective. Serving to
            them produce roadmaps to realize their goal with success. We have a
            tendency to live our success supported the satisfaction of our
            customers. We have a tendency to believe forever being truthful in
            each facet of the business.
          </Typography>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* <BottomNavigation /> */}
    </div>
  );
}
