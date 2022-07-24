import { Box, Link, Typography } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';

export const Footer = () => {
  return (
    <Box
         bgcolor={"primary.main"}
         width={'100%'}
         sx={{ position: 'fixed', left: '0', bottom: '0', textAlign: 'center' }}>
      <Typography
        variant={'caption'}
        color="background.paper"
      >
        Designed and Created with&nbsp;
        <FavoriteIcon color={'secondary'}
                      sx={{ mb: '-2px' }}
                      fontSize={'inherit'}/>
        &nbsp;by&nbsp;
        <Link
          color={"secondary"}
          href={"https://www.github.com/kevelopment"}>Kevin&nbsp;Adam</Link>
        &nbsp;©&nbsp;
        <Link color="secondary" href={"https://www.kevelopment.dev"}>Kevelopment</Link>
        &nbsp;2022
      </Typography>
    </Box>
  );
}
