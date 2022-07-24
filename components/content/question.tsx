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
  Typography
} from "@mui/material";
import type { Question as QuestionType } from "../../types/question";
import { Box } from "@mui/system";
import { useState } from "react";
import Image from "next/image";
import { useScreenSize } from "../../hooks/useScreenSize.hook";


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
  const [helperText, setHelperText] = useState<{ isValid: boolean, text: string } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const { isMobile } = useScreenSize();

  if (hidden) {
    return <></>;
  }

  const handleChange = (_, value: string) => {
    setHelperText(null);
    setSelectedAnswer(+value);
  };

  const showPrevious = () => {
    onPrevious();
  };

  const showNext = () => {
    let text = '';
    let isValid = true;
    if (selectedAnswer === -1) {
      isValid = false;
      text = "Bitte wähle eine Antwort aus.";
    } else if (
      selectedAnswer !== question.correctAnswer
    ) {
      isValid = false;
      text = "Leider nicht richtig  😔";
    }

    if (!isValid && showCorrectAnswer) {
      text = `Richtige Antwort: \n ${
        question.answers[question.correctAnswer]
      }`;
    }

    // scroll to top when next question is shown
    window.scrollTo(0, 0);
    setHelperText({ isValid, text });
    onNext(isValid);
  };

  return (
    <Slide
      in={!hidden}
      direction={direction}
      mountOnEnter
      unmountOnExit
    >
      <Card sx={{ p: isMobile ? 1 : 2 }}>
        <CardHeader title={`${index + 1}. ${question.question}`} titleTypographyProps={{ variant: 'h6' }}/>
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
                  sx={{ pb: isMobile ? 1 : 0 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {helperText &&
              <FormHelperText error={!helperText.isValid} title={helperText.text} sx={{ textAlign: 'center', pt: 2 }}>
                  <Typography>
                    {helperText.text}
                  </Typography>
              </FormHelperText>
          }
        </CardContent>
        <CardActions sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          {hidePrevious ? null : (
            <Button
              color="primary"
              variant="outlined"
              onClick={showPrevious}
              disabled={index === 0}
              sx={{ float: 'left' }}
            >
              Zurück
            </Button>
          )}
          {disableControls ? null : (
            <Button
              color="primary"
              variant="outlined"
              onClick={showNext}
              sx={{ float: 'right' }}
            >
              Weiter
            </Button>
          )}
        </CardActions>
      </Card>
    </Slide>);
}
