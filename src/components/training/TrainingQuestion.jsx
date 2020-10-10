import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Slide,
  withStyles,
} from "@material-ui/core";
import React from "react";

class TrainingQuestion extends React.Component {
  state = {
    isWrongAnswer: false,
    selectedAnswer: -1,
    helperText: undefined,
    direction: "left",
  };

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question) {
      this.setState({ selectedAnswer: -1 });
    }
  }

  handleChange = (event) => {
    this.setState({ selectedAnswer: +event.target.value });
  };

  checkIfCorrect = () => {
    let helperText = undefined;
    if (this.state.selectedAnswer === -1) {
      helperText = "Please select an answer.";
    } else if (
      this.state.selectedAnswer !== this.props.question.correctAnswer
    ) {
      helperText = "Wrong answer :( please choose another option.";
    }
    this.setState({ helperText, direction: "right" });

    // if helper text was not set: correct answer, go to the next question
    if (!helperText) {
      this.props.onNext();
    }
  };

  showPreviousQuestion = () => {
    this.setState({ helperText: undefined, direction: "left" });
    this.props.onPrevious();
  };

  handleClose = () => {
    this.setState({ helperText: undefined });
  };

  render() {
    const { classes } = this.props;
    if (this.props.hidden) {
      return <></>;
    }

    return (
      <Slide
        in={this.props.hidden === false}
        direction={this.state.direction}
        mountOnEnter
        unmountOnExit
      >
        <Card>
          <CardHeader
            title={`${this.props.index + 1}. ${this.props.question.question}`}
          ></CardHeader>
          <CardContent>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                name="quiz-question"
                value={this.state.selectedAnswer}
                onChange={this.handleChange}
              >
                {this.props.question.answers.map((answer, index) => (
                  <FormControlLabel
                    value={index}
                    control={<Radio />}
                    label={answer}
                    key={`answer-${index}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormHelperText className={classes.formHelper}>
              {this.state.helperText}
            </FormHelperText>
          </CardContent>
          <CardActions>
            <Button
              className={classes.leftAlign}
              color="primary"
              onClick={this.showPreviousQuestion}
              disabled={this.props.index === 0}
            >
              Previous
            </Button>
            <Button
              className={classes.rightAlign}
              color="primary"
              onClick={this.checkIfCorrect}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      </Slide>
    );
  }
}
const styles = (theme) => ({
  formControl: { padding: theme.spacing(2) },
  formHelper: { textAlign: "center", color: theme.palette.error.main },
  leftAlign: { marginRight: "auto" },
  rightAlign: { marginLeft: "auto" },
});
export default withStyles(styles)(TrainingQuestion);
