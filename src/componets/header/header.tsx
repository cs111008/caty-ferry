import './header.css';
import AppBar from '@mui/material/AppBar';
import PetsIcon from '@mui/icons-material/Pets';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <NavLink to="/" className='nav-link'>
          <PetsIcon sx={{ mr: 2, fontSize: 50 }} />
        </NavLink>
        <NavLink to="/" className='nav-link'>
          <Typography variant="h6" color="inherit" noWrap>
            Catty Ferry
          </Typography>
        </NavLink>
      </Toolbar>
      <Button variant="outlined" sx={{ color: '#FFF' }} size="small">
        <NavLink className='nav-link' to="/upload">Add new cat</NavLink>
      </Button>
    </AppBar>
  );
}

export default Header;