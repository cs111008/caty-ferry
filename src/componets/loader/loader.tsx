import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Loader = () => {
    return (
        <Container fixed>
            <Box sx={{ display: 'flex', height: '60vh' }} justifyContent="center">
                <CircularProgress />
            </Box>
        </Container>
    );
}

export default Loader;