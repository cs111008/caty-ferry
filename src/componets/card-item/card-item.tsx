import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

import {Favorite, Vote} from '../index'
import { ICatInterface } from '../../interfaces/cat.interface';

const CardItem = (props: {cat:ICatInterface}) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Grid item key={props.cat.id} xs={12} sm={6} md={4}>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 1,
            height: 1
          }}
          image={props.cat.url}
          alt={props.cat.id}
        />
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={6} md={7}>
              <Favorite selected={selected} setSelected={setSelected}/>
            </Grid>
            <Grid item xs={6} md={4}>
              <Vote />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardItem;