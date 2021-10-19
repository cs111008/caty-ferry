import Grid from '@mui/material/Grid';
import useCatActions from '../../hooks/use-cat-actions.hook';
import { CardItem, NoCatFound } from '../index';

const CardList = () => {
  const { cats } = useCatActions();
  return cats.length ? (
    <Grid container spacing={4}>
      {cats.map((cat) => (
        <CardItem cat={cat} key={cat.id} />
      ))}
    </Grid>) : (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '60vh' }}
    >
      <Grid item xs={8} >
        <NoCatFound />
      </Grid>
    </Grid>);
}

export default CardList;