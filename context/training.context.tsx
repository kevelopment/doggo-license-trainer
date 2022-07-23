import React, { createContext, useCallback, useState } from 'react';
import { shuffle } from "../utils/shuffle";
import questions from '../public/data.json';
import { Question } from "../types/question";
import { Mode } from '../types/mode';
import { useCountdown } from "usehooks-ts";

export interface TrainingContextProps {
  questions: Question[];
  currentIndex: number;
  timeLeft: number;
  started: boolean;
  mode: Mode;
  start: (mode: Mode) => void;
  stop: () => void;
  reset: () => void;
  setIndex: (index: number) => void;
}

export const TrainingContext = createContext<TrainingContextProps>({} as TrainingContextProps);

export type TrainingProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

const TRAINING_DURATION = 30 * 60;
const initialValues = {
  questions: [],
  currentIndex: 0,
  timeLeft: TRAINING_DURATION,
  mode: Mode.TRAINING,
  started: false,
  start: () => undefined,
  stop: () => undefined,
  reset: () => undefined,
  setIndex: () => undefined,
};

const TrainingProvider = ({ children }: TrainingProviderProps) => {
  const [data, setData] = useState<TrainingContextProps>(initialValues);
  const [timeLeft, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: TRAINING_DURATION,
    countStop: 0,
    intervalMs: 1000
  });

  const startTraining = useCallback((mode: Mode) => {
    resetCountdown();
    switch (mode) {
      case Mode.EXAM:
        setData((prevData) => ({
          ...prevData,
          questions: shuffle<Question>(questions).slice(0, 45),
          currentIndex: 0,
          started: true,
          mode,
        }));
        startCountdown();
        break;
      case Mode.TRAINING:
        setData((prevData) => ({
          ...prevData,
          questions: shuffle<Question>(questions),
          currentIndex: 0,
          started: true,
          mode,
        }));
        break;
      default:
        throw new Error(`Unknown Mode: ${mode}`);
    }
  }, [resetCountdown, startCountdown]);

  const resetTraining = () => {
    setData(initialValues)
  }

  const stopTraining = () => {
    stopCountdown();
  };

  const setIndex = useCallback((index: number) => {
    setData(prevData => ({ ...prevData, currentIndex: index }));
  }, []);


  const context = {
    ...data,
    timeLeft,
    start: startTraining,
    setIndex,
    reset: resetTraining,
    stop: stopTraining,
  };
  return <TrainingContext.Provider value={context}>{children}</TrainingContext.Provider>;
};

export default TrainingProvider;
