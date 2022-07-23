import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Mode } from "../../types/mode";
import { useTraining } from "../../hooks/use-training.hook";

export const Choose = () => {
  const { start } = useTraining();

  return <Card>
    <CardHeader
      title="Modus auswählen"
      style={{ textAlign: "center" }}
    />
    <CardContent>
      <Box p={2}>
        <Typography variant={"h6"}>Training:</Typography>
        <Typography>
          Beantworte alle Fragen in zufälliger Reihenfolge nacheinander.
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => start(Mode.TRAINING)}
        >
          Training Starten
        </Button>
      </Box>
      <Box p={2}>
        <Typography>Prüfungsmodus</Typography>
        <Typography>
          Simuliere eine Prüfung, bei der 35 zufällige Fragen innerhalb von 45 Minuten beantwortet werden müssen.
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => start(Mode.EXAM)}
        >
          Prüfung starten
        </Button>
      </Box>
    </CardContent>
  </Card>;
}
