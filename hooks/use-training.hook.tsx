import { useContext } from "react";
import { TrainingContext } from "../context/training.context";

export const useTraining = () => ({
  ...useContext(TrainingContext),
});
