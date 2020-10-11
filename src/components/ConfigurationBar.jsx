import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React from "react";

class ConfigurationBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" className={"no-selection"}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Doggo-Trainer
          </Typography>
          {this.props.showTimer ? (
            <Typography variant="h6" noWrap>
              Time remaining: {this.props.timeRemaining}
            </Typography>
          ) : (
            ""
          )}
          {this.props.showQuestion ? (
            <Typography variant="h6" noWrap>
              Question{" "}
              {`${this.props.currentQuestionIndex + 1} / ${
                this.props.maxNumberQuestions + 1
              }`}
            </Typography>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme) => ({
  title: {
    flexGrow: 1,
  },
  rightAlign: {
    marginLeft: "auto",
  },
  leftAlign: {
    marginRight: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
});
export default withStyles(styles)(ConfigurationBar);
