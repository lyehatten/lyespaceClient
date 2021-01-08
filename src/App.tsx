import React from 'react';
import Main from './components/Main';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'font-awesome/css/font-awesome.min.css';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0097a7",
    },
    secondary: {
      main: '#b2ebf2',
    },
  },
});


const App: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
