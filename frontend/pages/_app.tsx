import * as React from 'react';
import App, {Container} from 'next/app';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {ThemeProvider} from 'styled-components';
import {ApolloProvider} from 'react-apollo';
import withData from '../lib/withData';
import theme from '../lib/theme';

// material theme
const MuiTheme = createMuiTheme({
    palette: theme
});

class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {};
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        // this exposes the query to the user
        pageProps.query = ctx.query;
        return {pageProps};
    }

    render() {
        const {Component, apollo, pageProps} = this.props;

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <ThemeProvider theme={theme}>
                        <MuiThemeProvider theme={MuiTheme}>
                            <Component {...pageProps} />
                        </MuiThemeProvider>
                    </ThemeProvider>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withData(MyApp);
