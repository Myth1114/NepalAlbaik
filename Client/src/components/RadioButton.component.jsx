import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import uuid from 'react-uuid';
import { setProductOption } from "./../redux/product/product.actions";
function FormControlLabelPlacement({ dispatch, optionsArray, optionskey }) {

  const [selectedValue, setSelectedValue] = React.useState(" ");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    dispatch(setProductOption(event.target.value));
  };
  
  return optionsArray.map((el, index) => (
    <Grid key={uuid()} item md={12} xs={12}>
      <FormControl key={uuid()} component="fieldset">
        <FormLabel component="legend">{optionskey}</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value={el}
            control={
              <Radio
                checked={selectedValue === el}
                onChange={handleChange}
                color="primary"
                value={el}
              />
            }
            label={el}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  ));
}
export default connect(null)(FormControlLabelPlacement);
