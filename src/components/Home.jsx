import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { Routes } from "../App";

class Home extends React.Component {
  /**
   * Redirects to the Training component.
   *
   * @memberof Home
   */
  startTraining = () => {
    this.props.history.push(Routes.TRAINING);
  };

  /**
   * Redirects to the Exam component.
   *
   * @memberof Home
   */
  startExam = () => {
    this.props.history.push(Routes.EXAM);
  };

  render() {
    if (this.props.isLoaded === false) {
      return (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={"10vh"} />
        </Box>
      );
    }

    const { classes } = this.props;
    return (
      <Card>
        <CardHeader title="Please select a mode to start" />
        <CardContent className={classes.container}>
          <Box flex={1} width={1} p={2}>
            <Typography>Training-Mode:</Typography>
            <Typography>
              Practice all Questions in a row with direct evaluation.
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.startTraining}
            >
              Start Training
            </Button>
          </Box>
          <Box flex={1} width={1} p={2}>
            <Typography>Exam-Mode</Typography>
            <Typography>
              Practice a certain number of Questions in a row with evaluation
              after all questions have been answered.
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.startExam}
            >
              Start Exam
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export default withRouter(withStyles(styles)(Home));
