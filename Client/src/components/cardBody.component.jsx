import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import formatAmount from "indian-currency-formatter";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "none",
    boxShadow: "none",
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
    padding: 0,
  },
  pos: {
    marginBottom: 12,
  },
  price: {
    fontSize: 26,
    color: "#DC143C",
  },
  priceCrossed: {
    fontSize: 15,
    marginLeft: 2,
    marginRight: 5,
    textDecoration: "line-through",
  },
});

export default function SimpleCard({ productInfo }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          <strong>
            {" "}
            {productInfo.name}({productInfo.size}
            {productInfo.unit})
          </strong>
        </Typography>
        <Typography component="h2" gutterBottom>
          Category: {productInfo.category}
        </Typography>

        {/* <Typography component="h2"  gutterBottom>
          Size/Variant: {productInfo.size}-{productInfo.unit}
        </Typography> */}
        <Typography component="h2" gutterBottom>
          By: {productInfo.subCategory.split("-").join(" ")}
        </Typography>

        <Typography component="h2" gutterBottom>
          Rs.
          <span className={classes.price}>
            {formatAmount(
              parseInt(
                productInfo.price -
                  productInfo.price * (productInfo.discount / 100)
              )
            )}
          </span>{" "}
          {productInfo.discount > 0 ? (
            <span className={classes.priceCrossed}>
              Rs:
              {formatAmount(parseInt(productInfo.price))}
            </span>
          ) : null}
          {productInfo.discount > 0 ? (
            <span>{productInfo.discount}% off</span>
          ) : null}
        </Typography>

        <Button className={classes.button} disableRipple color="primary">
          Availablity: {productInfo.inStock ? " In stock" : "Out of stock"}
        </Button>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
