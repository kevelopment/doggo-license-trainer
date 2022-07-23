import { Box, Button, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTraining } from "../../hooks/use-training.hook";
import { Direction, Question } from "./question";

export const Exam = () => {
  const { questions, currentIndex, stop, setIndex, reset } = useTraining();
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('left');

  const getResultPercentage = () => {
    if (correctAnswers === 0) {
      return 0;
    }
    return (correctAnswers / questions.length) * 100;
  };

  const onNext = (isValid: boolean) => {
    const nextIndex = currentIndex + 1;

    if (isValid) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (nextIndex === questions.length) {
      stop();
      setIsFinished(true);
      return;
    }

    setIndex(nextIndex);
    setDirection('left');
  };

  const onPrevious = () => {
    let previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
      previousIndex = 0;
    }

    setIndex(previousIndex);
    setDirection('right');
  }

  return (
    <Box>
      {isFinished ? (
          <Card sx={{ textAlign: 'center' }}>
            <CardHeader title="Geschafft 🥳" sx={{ p: 4 }}/>
            <CardContent>
              <Typography>
                Richtge Antworten: {correctAnswers} /{" "}
                {questions.length} ({getResultPercentage()}%)
              </Typography>
              <Box p={4}>
                <Button variant="contained" onClick={reset}>Zum Menü</Button>
              </Box>
            </CardContent>
          </Card>
        ) :
        questions.map((question, index) => (
          <Question
            key={`question-${index}`}
            hidden={currentIndex !== index}
            direction={direction}
            onNext={onNext}
            onPrevious={onPrevious}
            index={index}
            question={question}
            disableControls={isFinished}
            hidePrevious
            showCorrectAnswer
          />
        ))
      }
    </Box>
  );
}
