import ToggleButton from '@mui/material/ToggleButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import { ICatInterface } from '../../interfaces/cat.interface';
import useCatActions from '../../hooks/use-cat-actions.hook';

const Favorite = (props: { cat: ICatInterface }) => {
  const { handleFavoriteCat } = useCatActions();
  return (
    <>
      {props.cat.disableFavorite && (
        <CircularProgress
          size={50}
          sx={{
            color: 'primary',
            position: 'absolute',
            zIndex: 1,
            ml: '-5px'
          }}
        />
      )}
      <Tooltip arrow title={props.cat.isFavourite ? 'Unfavourite' : 'Favourite'}>
        <ToggleButton
          value="favorite"
          selected={props.cat.isFavourite || false}
          onChange={handleFavoriteCat(props.cat)}
          color='error'
          size='small'
          sx={{ borderRadius: '50%' }}
        >
          <FavoriteIcon />
        </ToggleButton>
      </Tooltip>
    </>
  );
}

export default Favorite;