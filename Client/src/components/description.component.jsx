import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import uuid from 'react-uuid'
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 15,
  },

  details: {
    margin: 5,
    wordSpacing: ".3rem",
    textAlign: "justify",
    // textJustify: "inter - word",
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SimpleAccordion = ({ product }) => {
  const { description, titles } = product;
  const titleArray = Object.values(titles);
  const descriptionArray = Object.values(description);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {titleArray.map((el, index) => {
        return (
          <Paper key={uuid()} elevation={3}>
            <Accordion square key={uuid()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                key={uuid()}
              >
                <Typography className={classes.heading}>{el}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.details}>
                  {descriptionArray[index]}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        );
      })}
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
};

export default connect(null)(SimpleAccordion);
