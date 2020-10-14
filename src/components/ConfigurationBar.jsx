import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import moment from "moment";
import React from "react";

class ConfigurationBar extends React.Component {
  render() {
    const timeLeft = moment.duration(this.props.timeRemaining, "seconds");
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
            <Typography className={classes.timer} variant="h6" noWrap>
              {`Time remaining: ${timeLeft.minutes()}:${timeLeft.seconds()} min`}
            </Typography>
          ) : (
            ""
          )}
          {this.props.showQuestion ? (
            <Typography variant="h6" noWrap>
              Question{" "}
              {`${this.props.currentQuestionIndex + 1} / ${
                this.props.maxNumberQuestions
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
  timer: {
    marginRight: theme.spacing(4),
  },
});
export default withStyles(styles)(ConfigurationBar);
