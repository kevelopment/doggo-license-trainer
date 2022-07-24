import { Box } from "@mui/system";
import { useTraining } from "../hooks/use-training.hook";
import { Choose } from "./content/choose";
import { Training } from "./content/training";
import { Mode } from "../types/mode";
import { Exam } from "./content/exam";
import { useScreenSize } from "../hooks/useScreenSize.hook";

export const Content = () => {
  const { started, mode } = useTraining();
  const {isMobile} = useScreenSize();

  let component = <Choose/>;
  if (started && mode === Mode.TRAINING) {
    component = <Training/>;
  }
  if (started && mode === Mode.EXAM) {
    component = <Exam/>;
  }

  return (
    <Box p={isMobile ? 1: 4} mb={isMobile ? 6: 4}>
      {component}
    </Box>
  );
}
