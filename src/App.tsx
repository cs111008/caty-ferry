import * as React from 'react';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header, Footer } from './componets/index';
import { AppRoute } from './routes/index';
import { APP_CONSTANTS } from './constants/app.constants';

const theme = createTheme();

export default function App() {

  return (
    <ThemeProvider theme={theme}>

      <SnackbarProvider
        maxSnack={APP_CONSTANTS.MAX_NOTIFICATIONS}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
          <CssBaseline />
          <Header />
          <main>
            <Container sx={{ py: 8 }} maxWidth="md">
              <AppRoute />
            </Container>
          </main>
          <Footer />
      </SnackbarProvider>

    </ThemeProvider>
  );
}