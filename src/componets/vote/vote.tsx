import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Vote = (props:{}) => {
  return (
    <ButtonGroup size="small" aria-label="small button group">
    <Button size="small"><ThumbUpAltIcon /></Button>
    <Button size="small"><ThumbDownAltIcon /></Button>
  </ButtonGroup>
  );
}

export default Vote;