import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import OptionsButton from "./RadioButton.component";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
   
  },
  radio: {
    marginTop: 15,
    marginBottom: 15,
  },
  text: {
    textAlign: "justify",
    // textJustify: "inter - word",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SimpleAccordion = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.radio} elevation={3}>
        <Accordion square className={classes.text}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{props.optionsKey} </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Card raised className={classes.root}> */}
            <CardContent>
              <OptionsButton {...props} />
            </CardContent>
            {/* </Card> */}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </div>
  );
};

export default connect(null)(SimpleAccordion);

