import { Box } from "@mui/system";
import { useTraining } from "../hooks/use-training.hook";
import { Choose } from "./content/choose";
import { Training } from "./content/training";
import { Mode } from "../types/mode";
import { Exam } from "./content/exam";

export const Content = () => {
  const { started, mode } = useTraining();

  let component = <Choose/>;
  if (started && mode === Mode.TRAINING) {
    component = <Training/>;
  }
  if (started && mode === Mode.EXAM) {
    component = <Exam/>;
  }

  return (
    <Box p={4} mb={2}>
      {component}
    </Box>
  );
}
