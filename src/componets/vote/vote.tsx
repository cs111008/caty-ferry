import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { ICatInterface } from '../../interfaces/cat.interface';
import useCatActions from '../../hooks/use-cat-actions.hook';

const Vote = (props: { cat: ICatInterface }) => {
  const { handleVoteCat } = useCatActions();
  return (
    <ButtonGroup size='medium' sx={{ ml: 'auto' }} disabled={props.cat.disableVoting}>
      <Tooltip arrow title='Vote Up'>
        <Button size="medium" onClick={handleVoteCat(props.cat, 1)}><ThumbUpAltOutlinedIcon /></Button>
      </Tooltip>
      <Tooltip arrow title='Vote Down'>
        <Button size="medium" onClick={handleVoteCat(props.cat, 0)}><ThumbDownAltOutlinedIcon /></Button>
      </Tooltip>
    </ButtonGroup>
  );
}

export default Vote;