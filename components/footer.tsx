import { Box, Typography } from "@mui/material"

export const Footer = () => {
  return (
    <footer>
      <Box py={1}
           width={'100%'}
           sx={{ position: 'fixed', left: '0', bottom: '0', textAlign: 'center' }}>
        <Typography
          component={'p'}
          variant={'caption'}
          color={'textSecondary'}
        >
          Designed and Created by Kevin Adam © Kevelopment 2022 All rights reserved
        </Typography>
      </Box>
    </footer>
  );
}
