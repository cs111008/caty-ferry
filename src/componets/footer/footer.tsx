import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PetsIcon from '@mui/icons-material/Pets';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper' }} component="footer">
      <AppBar position="static" color="primary">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit">
              <><PetsIcon /> Demo Cat App</>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Footer;