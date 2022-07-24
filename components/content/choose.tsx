import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Mode } from "../../types/mode";
import { useTraining } from "../../hooks/use-training.hook";
import { ModeCardContent } from "./card/mode-card-content";
import { useScreenSize } from "../../hooks/useScreenSize.hook";
import { useMemo } from "react";

export const Choose = () => {
  const { start } = useTraining();
  const { isMobile } = useScreenSize();

  const entries = useMemo(() => ([
    {
      onClick: () => start(Mode.TRAINING),
      buttonText: 'Trainingsmodus',
      description: 'Beantworte alle Fragen in zufälliger Reihenfolge nacheinander.',
      title: 'Trainieren'
    },
    {
      onClick: () => start(Mode.EXAM),
      buttonText: 'Prüfungsmodus',
      description: 'Simuliere eine Prüfung, bei der 35 zufällige Fragen innerhalb von 45 Minuten beantwortet werden müssen.',
      title: 'Prüfen'
    }
  ]), []);

  return (
    <Card>
      <CardHeader
        title="Modus wählen"
        sx={{ textAlign: "center", mt: isMobile ? 0 : 2 }}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Grid container>
          {entries.map(entry => (
            <ModeCardContent
              key={entry.title}
              title={entry.title}
              description={entry.description}
              buttonText={entry.buttonText}
              onClick={entry.onClick}
            />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
