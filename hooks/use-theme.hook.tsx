import { useContext } from "react";
import { TrainingContext } from "../context/training.context";
import { ThemeContext } from "../context/theme.context";

export const useTheme = () => ({
  ...useContext(ThemeContext),
});
