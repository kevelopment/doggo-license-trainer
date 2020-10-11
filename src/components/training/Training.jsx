import { Box } from "@material-ui/core";
import React from "react";
import shuffle from "../../helper/ArrayHelper";
import NavigateBackFab from "../buttons/NavigateBackFab";
import TrainingQuestion from "./TrainingQuestion";

class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      questions: shuffle(props.questions),
    };
    this.props.setIndex(this.state.currentIndex);
    this.props.setMaxIndex(this.state.questions.length);
  }

  incrementCurrentIndex = () => {
    let { currentIndex } = this.state;
    let nextIndex = ++currentIndex;
    if (nextIndex > this.props.questions.length) {
      nextIndex = 0;
    }

    this.props.setIndex(nextIndex);
    this.setState({ currentIndex: nextIndex });
  };

  decrementCurrentIndex = () => {
    let { currentIndex } = this.state;
    let previousIndex = --currentIndex;
    if (previousIndex < 0) {
      previousIndex = 0;
    }

    this.props.setIndex(previousIndex);
    this.setState({ currentIndex: previousIndex });
  };

  stopTraining = () => {
    this.props.setIndex(0);
    this.setState({ currentIndex: 0 });
  };

  renderQuestions = (questions) => {
    return questions.map((question, index) => (
      <TrainingQuestion
        question={question}
        onNext={this.incrementCurrentIndex}
        onPrevious={this.decrementCurrentIndex}
        index={this.state.currentIndex}
        hidden={index !== this.state.currentIndex}
        key={`question-${index}`}
      />
    ));
  };

  render() {
    return (
      <Box>
        {this.renderQuestions(this.props.questions)}
        <NavigateBackFab onClick={this.stopTraining} />
      </Box>
    );
  }
}

export default Training;