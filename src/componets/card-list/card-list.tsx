import Grid from '@mui/material/Grid';
import useCatActions from '../../hooks/use-cat-actions.hook';
import { CardItem } from '../index';

const CardList = () => {
  const { cats } = useCatActions();
  return (
    <Grid container spacing={4}>
      {cats.map((cat) => (
        <CardItem cat={cat} key={cat.id} />
      ))}
    </Grid>
  );
}

export default CardList;