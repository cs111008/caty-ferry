import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PetsIcon from '@mui/icons-material/Pets';

import Grid from '@mui/material/Grid';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6, borderTop: '2px solid red' }} component="footer">
      <Grid container spacing={1}>
        <Grid item md={5} sx={{ borderTop: '2px solid red' }} ></Grid>
        <Grid item md={2} sx={{pl: '3%'}} >
          <PetsIcon />
        </Grid>
        <Grid item md={5} sx={{ borderTop: '2px solid red' }}></Grid>
      </Grid>
      <Typography variant="h6" align="center" gutterBottom>
        Cat API demo app
      </Typography>
    </Box>
  );
}

export default Footer;