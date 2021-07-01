import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(() => ({
  root: {
  
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10,
  },

  card1: {
    background: "#68ae00",
    color: "white",
    textAlign: "center",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px;",
    "&:hover": {
      background: "#3C3C3C",
    },
  },
  card2: {
    background: "#FC8213",
    color: "white",
    textAlign: "center",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px;",
    "&:hover": {
      background: "#3C3C3C",
    },
  },
  card3: {
    background: "#337AB7",
    color: "white",
    textAlign: "center",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px;",
    "&:hover": {
      background: "#3C3C3C",
    },
  },
}));

function DashBoard({ orderStats }) {
  const classes = useStyles();

  return orderStats.map((el, index) => (
    <Card key={} className={classes.card1}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h3" component="h2">
            100
          </Typography>
          <Typography variant="body2" component="p">
            No. of Products
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  ));
}
export default DashBoard;
