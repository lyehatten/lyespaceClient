import React from 'react';
import Main from './components/Main';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1A302D",
    },
    secondary: {
      main: '#56C681',
    }
  },
});


const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <CssBaseline/>
      <MuiThemeProvider theme={theme}>
        <Main />
      </MuiThemeProvider>
    </React.Fragment>
  );
}

export default App;
