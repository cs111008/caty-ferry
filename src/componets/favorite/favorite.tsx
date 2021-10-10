import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Favorite = (props:{ selected: boolean, setSelected: Function }) => {
  return (
    <ToggleButton
      value="favorite"
      selected={props.selected}
      onChange={() => {
        props.setSelected(!props.selected);
      }}
      color='primary'
      size='small'
      sx={{ borderRadius: '50%' }}
    >
      <FavoriteIcon />
    </ToggleButton>
  );
}

export default Favorite;