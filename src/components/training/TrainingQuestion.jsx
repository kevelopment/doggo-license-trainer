import { withStyles } from "@material-ui/core";
import React from "react";
import Question from "../Question";

class TrainingQuestion extends React.Component {
  render() {
    return <Question {...this.props} />;
  }
}
const styles = (theme) => ({
  formControl: { padding: theme.spacing(2) },
  formHelper: { textAlign: "center", color: theme.palette.error.main },
  leftAlign: { marginRight: "auto" },
  rightAlign: { marginLeft: "auto" },
});
export default withStyles(styles)(TrainingQuestion);
