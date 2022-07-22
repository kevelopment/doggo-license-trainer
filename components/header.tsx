import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PetsIcon from '@mui/icons-material/Pets';
import React from "react";
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useTraining } from "../hooks/use-training.hook";
import { useTheme } from "../hooks/use-theme.hook";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const Header = () => {
  const { questions, currentIndex, timeLeft, started } = useTraining();
  const {theme, switchTheme} = useTheme();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box flexDirection="row" flexGrow={1} display="flex" alignItems="center">
          <PetsIcon sx={{ mr: 1 }}/>
          <Typography
            variant="h6"
            noWrap
          >
            Hundeführerschein Trainer
          </Typography>
        </Box>

        {started ?
          <Box flexDirection="row" flexGrow={2} display="flex" alignItems="center">
            <HourglassEmptyIcon/>
            <Typography variant="h6" noWrap>
              {/*{`${timeLeft.minutes()}:${timeLeft.seconds()} min`}*/}
              Time Left : {timeLeft} seconds
            </Typography>
          </Box>
          : null
        }

        {started ?
          <Box flexShrink={1}>
            <Typography variant="h6" noWrap>
              {currentIndex} / {questions.length}
            </Typography>
          </Box>
          : null}

        <IconButton onClick={switchTheme} color="secondary" >
          {theme === "light" ? <LightModeIcon/> : <DarkModeIcon/>}
        </IconButton>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
