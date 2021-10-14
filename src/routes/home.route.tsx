import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import useCatActions from '../hooks/use-cat-actions.hook';
import useCatsLoading from '../hooks/use-cats-loading';
import Container from '@mui/material/Container';
import { CardList } from '../componets';


const Home = () => {
    const { isLoading } = useCatActions();
    useCatsLoading();

    const loader = (
        <Container fixed>
            <Box sx={{ display: 'flex', height: '60vh' }} justifyContent="center">
                <CircularProgress />
            </Box>
        </Container>
    )
    return isLoading ? loader : <CardList />

}
export default Home;