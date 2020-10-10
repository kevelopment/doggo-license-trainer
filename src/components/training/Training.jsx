import React from "react";
import shuffle from "../../helper/ArrayHelper";
import TrainingQuestion from "./TrainingQuestion";

export default class Training extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      questions: shuffle(props.questions),
    };
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
    return <>{this.renderQuestions(this.props.questions)}</>;
  }
}
