import { Box, Typography } from "@mui/material"

export const Footer = () => {
  return (
      <Box py={1}
           bgcolor={"primary.main"}
           width={'100%'}
           sx={{ position: 'fixed', left: '0', bottom: '0', textAlign: 'center' }}>
        <Typography
          variant={'caption'}
          color="background.paper"
        >
          Designed and Created by Kevin Adam © Kevelopment 2022
        </Typography>
      </Box>
  );
}
