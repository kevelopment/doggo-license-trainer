import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export type ModeCardContentProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

export const ModeCardContent = ({ title, description, buttonText, onClick }: ModeCardContentProps) => {
  return (
    <Grid item container
          p={2}
          md={6}
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flexGrow: 1 }}>
      <Typography variant={"h6"}>{title}</Typography>
      <Typography>
        {description}
      </Typography>
      <Box my={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </Box>
    </Grid>
  );
}
