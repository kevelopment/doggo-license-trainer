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
  Slide
} from "@mui/material";
import type { Question as QuestionType } from "../../types/question";
import { Box } from "@mui/system";
import { useState } from "react";
import Image from "next/image";


export type Direction = 'left' | 'right' | 'up' | 'down';
type QuestionProps = {
  hidden: boolean;
  direction: Direction;
  onNext: (isValid: boolean) => void;
  onPrevious: () => void;
  index: number;
  question: QuestionType;
  disableControls?: boolean;
  hidePrevious?: boolean;
  showCorrectAnswer?: boolean;
}

export const Question = ({
                           hidden,
                           direction,
                           index,
                           question,
                           disableControls,
                           hidePrevious,
                           showCorrectAnswer,
                           onNext,
                           onPrevious,
                         }: QuestionProps) => {
  const [helperText, setHelperText] = useState<string>();
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  if (hidden) {
    return <></>;
  }

  const handleChange = (_, value: string) => {
    setSelectedAnswer(+value);
  };

  const showPrevious = () => {
    setHelperText(undefined);
    onPrevious();
  };

  const showNext = () => {
    let text = '';
    let isValid = true;
    if (selectedAnswer === -1) {
      isValid = false;
      text = "Bitte wählen Sie eine Antwort aus.";
    } else if (
      selectedAnswer !== question.correctAnswer
    ) {
      isValid = false;
      text = "Leider falsch 😔";
    }

    if (!isValid && showCorrectAnswer) {
      text = `Correct answer: \n ${
        question.answers[question.correctAnswer]
      }`;
    }

    // scroll to top when next question is shown
    window.scrollTo(0, 0);
    setHelperText(text);
    onNext(isValid);
  };

  return (
    <Slide
      in={!hidden}
      direction={direction}
      mountOnEnter
      unmountOnExit
    >
      <Card>
        <CardHeader
          title={`${index + 1}. ${question.question}`}
        ></CardHeader>
        <CardContent>
          {question.image && (
            <Box style={{ textAlign: "center" }}>
              <Image
                width={'300'}
                height={'180'}
                src={`/img/${question.image}`}
                alt={question.image}
              />
            </Box>
          )}
          <FormControl
            component="fieldset"
            // TODO: if disabled show success or fail icon
            disabled={disableControls}
            fullWidth
          >
            <RadioGroup
              name="quiz-question"
              value={selectedAnswer}
              onChange={handleChange}
            >
              {question.answers.map((answer, index) => (
                <FormControlLabel
                  value={index}
                  control={<Radio/>}
                  label={answer}
                  key={`answer-${index}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {helperText?.length &&
              <FormHelperText variant={"outlined"} error>
                {helperText}
              </FormHelperText>
          }
        </CardContent>
        <CardActions>
          {hidePrevious ? null : (
            <Button
              color="primary"
              onClick={showPrevious}
              disabled={index === 0}
            >
              Zurück
            </Button>
          )}
          {disableControls ? null : (
            <Button
              color="primary"
              onClick={showNext}
            >
              Weiter
            </Button>
          )}
        </CardActions>
      </Card>
    </Slide>);
}
