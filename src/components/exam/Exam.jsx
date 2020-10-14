import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";
import React from "react";
import shuffle from "../../helper/ArrayHelper";
import NavigateBackFab from "../buttons/NavigateBackFab";
import Question from "../Question";

const EXAM_TIME = 45 * 60;
// const QUESTIONS_IN_EXAM = 35;
const QUESTIONS_IN_EXAM = 2;

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      questions: shuffle(props.questions).slice(0, QUESTIONS_IN_EXAM),
      timeRemaining: EXAM_TIME,
      correctAnswers: 0,
      direction: "down",
    };
    this.props.setIndex(this.state.currentIndex);
    this.props.setMaxIndex(this.state.questions.length);
    this.props.setTimeRemaining(this.state.timeRemaining);
  }

  componentDidMount = () => {
    this.startTimer();
  };

  startTimer = () => {
    this.interval = setInterval(() => {
      const { timeRemaining } = this.state;
      const newTimeRemaining = timeRemaining - 1;
      this.setState({ timeRemaining: newTimeRemaining });
      this.props.setTimeRemaining(this.state.timeRemaining);
    }, 1000);
  };

  stopTimer = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.setState({ timeRemaining: EXAM_TIME });
      this.props.setTimeRemaining(this.state.timeRemaining);
    }
  };

  incrementCurrentIndex = ({ isValid }) => {
    const { currentIndex, correctAnswers } = this.state;
    const nextIndex = currentIndex + 1;

    if (isValid) {
      this.setState({ correctAnswers: correctAnswers + 1 });
    }

    if (nextIndex === this.state.questions.length) {
      this.stopTimer();
      this.setState({ isFinished: true });
      return;
    }

    this.props.setIndex(nextIndex);
    this.setState({
      currentIndex: nextIndex,
      direction: "left",
    });
  };

  decrementCurrentIndex = () => {
    let { currentIndex } = this.state;
    let previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      previousIndex = 0;
    }

    this.props.setIndex(previousIndex);
    this.setState({ currentIndex: previousIndex, direction: "right" });
  };

  stopExam = () => {
    this.props.setIndex(0);
    this.stopTimer();
    this.setState({
      currentIndex: 0,
      timeRemaining: undefined,
      correctAnswers: 0,
    });
  };

  getResultPercentage = () => {
    if (this.state.correctAnswers === 0) {
      return 0;
    }

    return (
      (this.state.questions.length / this.state.correctAnswers) *
      100
    ).toFixed(3);
  };

  renderQuestions = (questions) => {
    // show all questions if isFinished

    return questions.map((question, index) => (
      <Question
        question={question}
        onNext={this.incrementCurrentIndex}
        index={this.state.currentIndex}
        hidden={this.state.currentIndex !== index && !this.state.isFinished}
        direction={this.state.direction}
        key={`question-${index}`}
        hidePrevious
        disableControls={this.state.isFinished === true}
        showCorrectAnswer
      />
    ));
  };

  render() {
    return (
      <Box>
        {this.state.isFinished ? (
          <Card style={{ marginBottom: "8px" }}>
            <CardHeader title="Finished!"></CardHeader>
            <CardContent>
              <Typography>
                Correct answers: {this.state.correctAnswers} /{" "}
                {this.state.questions.length}
              </Typography>
              <Typography>In percent: {this.getResultPercentage()}%</Typography>
            </CardContent>
          </Card>
        ) : (
          ""
        )}
        {this.renderQuestions(this.state.questions)}
        <NavigateBackFab onClick={this.stopExam} />
      </Box>
    );
  }
}

export default Exam;
