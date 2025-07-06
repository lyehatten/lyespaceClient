import React from 'react';
import Main from './components/Main';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A302D',
    },
    secondary: {
      main: '#56C681',
    },
  },
});

const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </>
);

export default App;
