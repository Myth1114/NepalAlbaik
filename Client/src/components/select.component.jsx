import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BasicTable from "./table.component";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  grid: {
    marginTop: 20,
    marginBottom: 20,
    // justifyContent: "felx-end",
  },
  table: {
    minWidth: 1000,
  },
  select: {
    display: "flex",
    justifyContent: "center",
  },
}));

function SimpleSelect({ categoryList }) {
  const classes = useStyles();
  const [category, setCategory] = React.useState("Protein");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Grid className={classes.grid} container spacing={0}>
      <Grid item md={12} xs={12}>
        <Typography className={classes.grid} align="center" variant="h3">
          Product Table
        </Typography>
        <Typography align="center" component="h5" variant="h5">
          showing results for {category}
        </Typography>
      </Grid>
      <Grid className={classes.select} item md={12} xs={12}>
        <FormControl className={classes.formControl}>
          <Select
            value={category}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "Without label" }}
          >
            {categoryList.map((el, index) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12}>
        <BasicTable className={classes.table} searchCategory={category} />
      </Grid>
    </Grid>
  );
}
export default SimpleSelect;
