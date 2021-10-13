import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {Favorite, Vote} from '../index'
import { ICatInterface } from '../../interfaces/cat.interface';

const CardItem = (props: {cat:ICatInterface, onFavorite: Function, onVote: Function}) => {
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
        <CardContent sx={{bgcolor: '#FEEAE6'}}>
          <Typography variant="body2" color="text.secondary">
            Votes : {props.cat.votes || 0}
          </Typography>
        </CardContent>
        <CardActions>
          <Favorite cat={props.cat} onFavorite={props.onFavorite}/>
          <Vote cat={props.cat} onVote={props.onVote} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default CardItem;