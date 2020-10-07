import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  CardActions,
  Button,
  FormGroup,
} from "@material-ui/core";
import React from "react";

export default class TrainingQuestion extends React.Component {
  state = {
    question: {},
    isCorrect: false,
  };

  componentDidMount() {
    const question = {};
    this.props.question.answers.forEach((answer) => {
      question[answer] = false;
    });
    this.setState({ question });
  }

  handleChange = (event) => {
    const { question } = this.state;
    question[event.target.name] = event.target.checked;
    this.setState({ question, isCorrect: false });
  };

  checkIfCorrect = () => {
    const answers = Object.values(this.state.question);
    const isValidLength = answers.filter((v) => v).length === 1;
    const isCorrectSelection = answers.some(
      (v, index) => v === true && index === this.props.question.correctAnswer
    );

    if (isValidLength === false || isCorrectSelection === false) {
      this.setState({ isCorrect: false });
      return;
    }
    this.setState({ isCorrect: true });
  };

  render() {
    return (
      <Card>
        <CardHeader title={this.props.question.question}></CardHeader>
        <CardContent>
          <FormGroup>
            {this.props.question.answers.map((answer, index) => (
              <FormControlLabel
                style={
                  this.state.isCorrect &&
                  index === this.props.question.correctAnswer
                    ? { background: "#66FF99" }
                    : {}
                }
                control={
                  <Checkbox
                    checked={this.state.question[index]}
                    name={answer}
                    onChange={this.handleChange}
                  ></Checkbox>
                }
                label={answer}
              />
            ))}
          </FormGroup>
        </CardContent>
        <CardActions>
          <Button
            style={{ marginLeft: "auto" }}
            size="small"
            color="primary"
            onClick={this.checkIfCorrect}
          >
            Next
          </Button>
        </CardActions>
      </Card>
    );
  }
}
