import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ICatInterface } from '../../interfaces/cat.interface';

const Favorite = (props: { onFavorite: Function, cat: ICatInterface }) => {
  return (
    <ToggleButton
      value="favorite"
      selected={props.cat.isFavourite || false}
      onChange={() => {
        props.onFavorite(props.cat);
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