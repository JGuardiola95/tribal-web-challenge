import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
// import white from '@material-ui/core/colors/white';

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: orange,
    secondary: {
      main: '#fff',
    },
  },
  status: {
    danger: 'orange',
  },
});

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        < App />
      </MuiThemeProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
