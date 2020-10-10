import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";
import { Routes } from "../App";

class Home extends React.Component {
  /**
   * Redirects to the Training components.
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
          <CircularProgress size={"10vh"} height={"50vh"} />
        </Box>
      );
    }

    return (
      <Card>
        <CardHeader title="Please select a training mode" />
        <CardContent>
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
        </CardContent>
        <CardContent>
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
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(Home);
