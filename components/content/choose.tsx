import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Mode } from "../../types/mode";
import { useTraining } from "../../hooks/use-training.hook";
import { ModeCardContent } from "./card/mode-card-content";

export const Choose = () => {
  const { start } = useTraining();

  return (
    <Card>
      <CardHeader
        title="Modus wählen"
        sx={{ textAlign: "center", mt: 2 }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Grid container>
          <ModeCardContent onClick={() => start(Mode.TRAINING)}
                           buttonText={'Trainingsmodus'}
                           description={'Beantworte alle Fragen in zufälliger Reihenfolge nacheinander.'}
                           title={'Trainieren'}
          />
          <ModeCardContent onClick={() => start(Mode.EXAM)}
                           buttonText={'Prüfungsmodus'}
                           description={'Simuliere eine Prüfung, bei der 35 zufällige Fragen innerhalb von 45 Minuten beantwortet werden müssen.'}
                           title={'Prüfen'}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
