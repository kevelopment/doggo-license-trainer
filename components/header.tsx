import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import React from "react";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useTraining } from "../hooks/use-training.hook";
import { useTheme } from "../hooks/use-theme.hook";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useMediaQuery } from "usehooks-ts";
import { toTime } from "../utils/time";
import { Mode } from "../types/mode";


const Header = () => {
  const { questions, currentIndex, timeLeft, started, mode } = useTraining();
  const { isDark, toggle } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { m, s } = toTime(timeLeft);
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <PetsIcon sx={{ mr: 1 }}/>
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
