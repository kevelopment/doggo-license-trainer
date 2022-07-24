import { AppBar, Button, Dialog, DialogTitle, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import React, { useState } from "react";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useTraining } from "../hooks/use-training.hook";
import { useTheme } from "../hooks/use-theme.hook";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { toTime } from "../utils/time";
import { Mode } from "../types/mode";
import { useScreenSize } from "../hooks/useScreenSize.hook";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";

const Header = () => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const { questions, currentIndex, timeLeft, started, mode, reset } = useTraining();
  const { isDark, toggle } = useTheme();
  const { isMobile } = useScreenSize();

  const onCancel = () => {
    setOpenConfirmDialog(false);
  };

  const onConfirm = () => {
    setOpenConfirmDialog(false);
    reset();
  };

  const { m, s } = toTime(timeLeft);
  return (
    <AppBar position="sticky">
      <Dialog open={openConfirmDialog}>
        <DialogTitle>{`${mode === Mode.EXAM ? 'Prüfung' : 'Training'} wirklich abbrechen?`}</DialogTitle>
        <Box p={2} display={'flex'} justifyContent={'space-between'} width={'100%'}>
          <Button variant={'outlined'} onClick={onConfirm} fullWidth={false}><CheckIcon/>&nbsp;Ja</Button>
          <Button variant={'outlined'} onClick={onCancel}><CloseIcon/>&nbsp;Nein</Button>
        </Box>
      </Dialog>
      <Toolbar>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {started ?
              <IconButton onClick={() => setOpenConfirmDialog(true)} color="secondary">
                <ArrowBackIosNewIcon/>
              </IconButton>
              : <PetsIcon sx={{ mr: 2 }}/>
            }
            {!isMobile &&
                <Typography
                    variant="h6"
                    noWrap
                >
                    Hundeführerschein Trainer
                </Typography>
            }
          </Grid>
          {started && mode === Mode.EXAM ?
            <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <HourglassEmptyIcon/>
              <Typography variant="h6" noWrap>
                {`${m}:${s}`}
              </Typography>
            </Grid>
            : null}

          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {started ?
              <Typography variant="h6" noWrap>
                {Math.max(currentIndex, currentIndex + 1)} / {questions.length}
              </Typography>
              : null}
            <IconButton onClick={toggle} color="secondary">
              {isDark ? <DarkModeIcon/> : <LightModeIcon/>}
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
