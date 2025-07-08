import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './components/Main';

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

function App(): JSX.Element {
  return (
    <div>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
