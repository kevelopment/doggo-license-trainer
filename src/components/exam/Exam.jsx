import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import NavigateBackFab from "../buttons/NavigateBackFab";

export default class Exam extends React.Component {
  stopExam = () => {
    console.log("stopping exam");
  };

  render() {
    return (
      <Box>
        <Card>
          <CardContent>To be developed...</CardContent>
        </Card>
        <NavigateBackFab onClick={this.stopExam} />
      </Box>
    );
  }
}
