import { Box, Card, CardContent } from "@material-ui/core";
import React from "react";
import shuffle from "../../helper/ArrayHelper";
import NavigateBackFab from "../buttons/NavigateBackFab";

export default class Exam extends React.Component {
  state = {
    currentIndex: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      questions: shuffle(props.questions).slice(0, 35),
    };
    this.props.setIndex(this.state.currentIndex);
    this.props.setMaxIndex(this.state.questions.length);
  }

  stopExam = () => {
    this.props.setIndex(0);
    this.setState({ currentIndex: 0 });
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
