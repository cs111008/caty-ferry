import Grid from '@mui/material/Grid';
import { CardItem } from '../index';
import { ICatInterface } from '../../interfaces/cat.interface';

const CardList = (props: { cards: ICatInterface[], onFavorite: Function, onVote: Function }) => {
  return (
    <Grid container spacing={4}>
      {props.cards.map((cat) => (
        <CardItem cat={cat} key={cat.id} onFavorite={props.onFavorite} onVote={props.onVote} />
      ))}
    </Grid>
  );
}

export default CardList;