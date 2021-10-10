import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Header, Footer } from './componets/index';
import { Home, Upload } from './routes/index';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/upload" component={Upload} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}