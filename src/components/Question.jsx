import {
  Box,
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

class Question extends React.Component {
  state = {
    isWrongAnswer: false,
    selectedAnswer: -1,
    helperText: undefined,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.question !== this.props.question) {
      this.setState({ selectedAnswer: -1 });
    }
  }

  handleChange = (event) => {
    this.setState({ selectedAnswer: +event.target.value });
  };

  onNext = () => {
    let helperText = undefined;
    let isValid = true;
    if (this.state.selectedAnswer === -1) {
      isValid = false;
      helperText = "Please select an answer.";
    } else if (
      this.state.selectedAnswer !== this.props.question.correctAnswer
    ) {
      isValid = false;
      helperText = "Wrong answer!";
    }

    if (!isValid && this.props.showCorrectAnswer) {
      helperText = `Correct answer: \n ${
        this.props.question.answers[this.props.question.correctAnswer]
      }`;
    }

    this.setState({ helperText });
    this.props.onNext({ isValid });
  };

  showPreviousQuestion = () => {
    this.setState({ helperText: undefined });
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
        direction={this.props.direction}
        mountOnEnter
        unmountOnExit
      >
        <Card className={classes.container}>
          <CardHeader
            title={`${this.props.index + 1}. ${this.props.question.question}`}
          ></CardHeader>
          <CardContent>
            {this.props.question.image ? (
              <Box style={{ textAlign: "center" }}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/img/" + this.props.question.image
                  }
                  alt={this.props.question.image}
                />
              </Box>
            ) : (
              ""
            )}
            <FormControl
              component="fieldset"
              className={classes.formControl}
              // TODO: if disabled show success or fail icon
              disabled={this.props.disableControls}
              fullWidth
            >
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
            {this.props.hidePrevious ? (
              ""
            ) : (
              <Button
                className={classes.leftAlign}
                color="primary"
                onClick={this.showPreviousQuestion}
                disabled={this.props.index === 0}
              >
                Previous
              </Button>
            )}
            {this.props.disableControls ? (
              ""
            ) : (
              <Button
                className={classes.rightAlign}
                color="primary"
                onClick={this.onNext}
              >
                Next
              </Button>
            )}
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
  container: { marginBottom: theme.spacing(2), marginTop: theme.spacing(2) },
});

export default withStyles(styles)(Question);
