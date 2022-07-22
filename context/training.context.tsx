import React, { createContext, useState } from 'react';
import { shuffle } from "../utils/shuffle";
import questions from '../public/data.json';
import useCountDown from 'react-countdown-hook';
import { Question } from "../types/question";

export interface TrainingContextProps {
  questions: Question[];
  currentIndex: number;
  timeLeft: number;
  started:boolean;
}

enum Mode {
  EXAM,
  TRAINING
}

export const TrainingContext = createContext<TrainingContextProps>({} as TrainingContextProps);

export type TrainingProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

const initialValues = {
  questions: [],
  currentIndex: 0,
  timeLeft: 0,
  started: false,
};

const TrainingProvider = ({ children }: TrainingProviderProps) => {
  const [data, setData] = useState<TrainingContextProps | null>(initialValues);
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(30 * 60 * 1000, 1000);

  const startTraining = (mode: Mode) => {
    reset();
    switch (mode) {
      case Mode.EXAM:
        setData({
          questions: shuffle<Question>(questions).slice(0, 45),
          currentIndex: 0,
          timeLeft,
          started: true,
        });
        break;
      case Mode.TRAINING:
        setData({
          questions: shuffle<Question>(questions),
          currentIndex: 0,
          timeLeft,
          started: true
        });
        break;
      default:
        throw new Error(`Unknown Mode: ${mode}`);
    }
    start();
  }

  const contextValues = {
    questions: data?.questions ?? [],
    currentIndex: data?.currentIndex ?? 0,
    timeLeft,
    started: data?.started ?? false,
  };

  return <TrainingContext.Provider value={contextValues}>{children}</TrainingContext.Provider>;
};

export default TrainingProvider;
