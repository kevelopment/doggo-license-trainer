import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import { Routes } from "../../App";
import NavigateBackFab from "../buttons/NavigateBackFab";

export default class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.props.setRoute(Routes.EXAM);
  }

  render() {
    return (
      <Box>
        <Card>
          <CardContent>To be developed...</CardContent>
        </Card>
        <NavigateBackFab />
      </Box>
    );
  }
}
