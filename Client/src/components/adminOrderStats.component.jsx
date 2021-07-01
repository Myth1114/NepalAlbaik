import React, { useEffect } from "react";
import { connect } from "react-redux";
import { selectOrder } from "./../redux/order/order.selector";
import { createStructuredSelector } from "reselect";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "./../components/spinner.component";

import {
  clearOrderState,
  fetchOrderStatsStart,
} from "./../redux/order/order.actions";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ErrorComponent from "./ErrorComponent";
import AdminProducts from "./adminProducts.component";
import AdminOrderScreen from "./adminOrderScreen.component";

const useStyles = makeStyles({
  root: {
    height: 150,

    textAlign: "center",
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
    paddingTop: 50,
    paddingBottom: 50,
  },
  screen: {
    minHeight: "50vw",
    background: "#E6EFF1",
  },
  grid: {
    display: "flex",
    alignItems: "space-around",
  },
  topProducts: {
    display: "flex",
    justifyContent: "space-between",
  },
});
const OrderStats = ({
  dispatch,
  orderState: { orderStatsLoading, orderStats, orderStatsError },
}) => {
  const classes = useStyles();
  useEffect(() => {
    dispatch(fetchOrderStatsStart());
    return function () {
      dispatch(clearOrderState());
    };
  }, [dispatch]);
  function compare_item(a, b) {
    // a should come before b in the sorted order
    if (a._id < b._id) {
      return -1;
      // a should come after b in the sorted order
    } else if (a._id > b._id) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }

  return orderStatsLoading === false &&
    orderStats === null &&
    orderStatsError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : orderStatsLoading === true &&
    orderStats === null &&
    orderStatsError === undefined ? (
    <div>
      <Spinner />
    </div>
  ) : orderStatsLoading === false &&
    orderStats === null &&
    orderStatsError !== undefined ? (
    <ErrorComponent />
  ) : (
    <div>
      <Container className={classes.screen} fixed>
        <Grid className={classes.pos} container spacing={1}>
          {orderStats.sort(compare_item).map((el, index) => (
            <Grid item md={6} xs={12}>
              <Card raised className={classes.root} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Orders {el._id}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {el.totalOrderNum}
                  </Typography>
                  <Typography color="textSecondary">
                    Total Price: Rs: {parseInt(el.totalOrderSum)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item md={12} xs={12}>
            <AdminProducts className={classes.pos} />
          </Grid>
          <Grid item md={12} xs={12}>
            <AdminOrderScreen className={classes.pos} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  orderState: selectOrder,
});
export default connect(mapStateToProps)(OrderStats);
