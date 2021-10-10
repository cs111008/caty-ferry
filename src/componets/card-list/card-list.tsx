import Grid from '@mui/material/Grid';
import {CardItem} from '../index';
import { ICatInterface } from '../../interfaces/cat.interface';

const CardList = (props:{cards: ICatInterface[]}) => {
    return (
        <Grid container spacing={4}>
            {props.cards.map((cat) => (
              <CardItem cat={cat} key={cat.id} />
            ))}
          </Grid>
    );
}

export default CardList;