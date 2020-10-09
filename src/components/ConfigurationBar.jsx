import React from "react";
import { AppBar, Toolbar, Typography, withStyles } from "@material-ui/core";

class ConfigurationBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            Doggo-Trainer
          </Typography>
          <Typography variant="h6" className={classes.stepIndicator} noWrap>
            Question{" "}
            {`${this.props.currentQuestionIndex + 1} / ${
              this.props.maxNumberQuestions + 1
            }`}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
  stepIndicator: {
    right: 0,
  },
});
export default withStyles(styles)(ConfigurationBar);
