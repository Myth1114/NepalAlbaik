import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";
import InfoIcon from "@material-ui/icons/Info";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#000000",
    // marginTop: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "#aaa",
    textTransform: "uppercase",
    fontSize: 16,
    paddingLeft: 5,
    borderLeft: "4px solid #b78c33",
  },
  listUnstyled: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: 13,
    padding: 6,
  },
  list: {
    display: "flex",
    justifyContent: "start",
    color: "#aaa",
    margin: "5px 0px",
    textDecoration: "none",
  },
  icons: {
    marginRight: 8,
  },
  about: {
    margin: "auto",
    textAlign: "center",
    color: "#aaa",
  },
  para: {
    fontSize: 14,
    paddingTop: 30,
    padding: 10,
  },
  social: {
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
  },
  socialIcon: {
    margin: 5,
    width: 40,
    height: 40,
    lineHeight: 40,
    borderRadius: "50%",
    fontSize: 16,
    color: "#b78c33",
    border: "2px solid rgba(255, 255, 255, 0.3)",
  },
  copyRight: {
    marginTop: "15px",
    background: "#111",
    padding: "10px 0",
    color: "#999",
  },
}));

function BottomNavigation({ history }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.about}>
        <Typography align="justify" className={classes.para} component="p">
          We are MuscleNepal.com. We are simply known for delivering genuine
          sports nutrition supplements to health enthusiasts at very affordable
          rates. We offer a humongous range of health products across categories
          and all major brands.
        </Typography>
        <Typography align="justify" className={classes.social}>
          <InstagramIcon className={classes.socialIcon} />
          <FacebookIcon className={classes.socialIcon} />
        </Typography>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.footerInfoSingle}>
            <h2 className={classes.title}>Muscle Nepal</h2>
            <ul className={classes.listUnstyled}>
              <li
                onClick={() => {
                  history.push("/About-us");
                }}
                className={classes.list}
              >
                <InfoIcon className={classes.icons} />
                About Us
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className={classes.footerInfoSingle}>
            <h2 className={classes.title}> Contacts Us</h2>
            <ul className={classes.listUnstyled}>
              <li className={classes.list}>
                <PhoneIcon className={classes.icons} />
                Phone: 9824457278
              </li>
              <li
                onClick={() => {
                  history.push("/contactUs");
                }}
                className={classes.list}
              >
                <EmailIcon className={classes.icons} />
                Email: nepalmuscle@gmail.com
              </li>
              <li className={classes.list}>
                <LocationOnIcon className={classes.icons} />
                <Typography component="p">
                  Maitri Path,Bhairahawa,Haat Bajar
                </Typography>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={12}>
          <Typography className={classes.copyRight}>
            Copyright © 2021. Muscle Nepal.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default withRouter(BottomNavigation);
