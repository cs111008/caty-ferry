import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { ICatInterface } from '../../interfaces/cat.interface';

const Vote = (props: { cat: ICatInterface, onVote: Function }) => {
  return (
    <ButtonGroup size='medium' sx={{ ml: 'auto' }}>
      <Button size="medium" onClick={() => props.onVote(props.cat, 1)}><ThumbUpAltOutlinedIcon /></Button>
      <Button size="medium" onClick={() => props.onVote(props.cat, 0)}><ThumbDownAltOutlinedIcon /></Button>
    </ButtonGroup>
  );
}

export default Vote;