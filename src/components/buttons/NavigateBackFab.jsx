import { Fab, withStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router-dom";
import { Routes } from "../../App";

class NavigateBackFab extends React.Component {
  navigateBack = () => {
    this.props.onClick();
    this.props.history.push(Routes.HOME);
  };

  render() {
    const { classes } = this.props;
    return (
      <Fab
        color="secondary"
        variant="extended"
        className={classes.fab}
        onClick={this.navigateBack}
      >
        <ArrowBack className={classes.fabIcon} />
        Back
      </Fab>
    );
  }
}

const styles = (theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
  fabIcon: {
    marginRight: theme.spacing(1),
  },
});

export default withRouter(withStyles(styles)(NavigateBackFab));
