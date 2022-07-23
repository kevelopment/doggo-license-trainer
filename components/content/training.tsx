import React, { useState } from 'react';
import { Direction, Question } from "./question";
import { Box } from "@mui/system";
import { useTraining } from "../../hooks/use-training.hook";

export const Training = () => {
  const { questions, currentIndex, setIndex } = useTraining();
  const [direction, setDirection] = useState<Direction>('down');

  const onNext = (isValid: boolean) => {
    let nextIndex = currentIndex + 1;
    if (nextIndex > questions.length) {
      nextIndex = 0;
    }

    if (!isValid) {
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
  };

  return (
    <Box>
      {
        questions.map((question, index) => (
          <Question
            question={question}
            onNext={onNext}
            onPrevious={onPrevious}
            index={currentIndex}
            hidden={index !== currentIndex}
            direction={direction}
            key={`question-${index}`}
          />
        ))
      }
    </Box>
  );
}
