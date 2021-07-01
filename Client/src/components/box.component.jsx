import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
   display:"flex",
   justifyContent:"space-between",
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const BoxContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}  >
      {children}
    </Box>
  );
};
export default BoxContainer;
