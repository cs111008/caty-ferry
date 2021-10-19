import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const NoCatFound = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        image={`${process.env.PUBLIC_URL}/cat-not-found.gif`}
        alt='cat-not-found.gif'
      />
      <CardContent>
        <Typography color="text.secondary" align='center' variant='h4'>
          No Cat Found
        </Typography>
        <Typography color="text.secondary" align='center' variant='h5'>
          Please upload a cat
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoCatFound;