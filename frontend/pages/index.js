import React from 'react';
// import ReactDOM from 'react-dom';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
// import App from '../components/App';
// import registerServiceWorker from '../lib/registerServiceWorker';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#26C6DA',
            contrastText: '#311B92',
            // dark: will be calculated from palette.primary.main, contrastText: will be
            // calculated to contast with palette.primary.main
        },
        secondary: {
            light: '#9C27B0',
            main: '#26C6DA',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#CDDC39',
        },
    // error: will use the default color
    },
});
export default () => (
    <MuiThemeProvider theme={theme}>
        <div>123</div>
    </MuiThemeProvider>
);
// registerServiceWorker();
