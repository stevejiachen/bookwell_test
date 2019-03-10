// @flow
import * as React from 'react';
import Helmet from 'react-helmet';
import Header from './components/Header';
import HomePage from './components/HomePage';
import bookwell from './assets/bookwell.png';
import './App.module.css';

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Route, Switch } from 'react-router';
import { MainContent } from './components/Layouts';
import CategoryVenueCity from './containers/CategoryVenueContainer/CategoryVenueCity';
import CategoryVenueAll from './containers/CategoryVenueContainer/CategoryVenueAll';
import CategoryVenueRegion from './containers/CategoryVenueContainer/CategoryVenueRegion';
import CategoryVenueSuburb from './containers/CategoryVenueContainer/CategoryVenueSuburb';
import NotFound from './components/NotFound';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#f37961',
            light: '#ff8a65',
        },
    },
});

const App = () => (
    <MuiThemeProvider theme={theme}>
        <div>
            <Helmet defaultTitle="Bookwell">
                <link rel="icon" type="image/png" href={bookwell} sizes="16x16" />
            </Helmet>
            <Header />
            <MainContent>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/venues/:category" exact component={CategoryVenueAll} />
                    <Route path="/venues/:category/:city" exact component={CategoryVenueCity} />
                    <Route path="/venues/:category/:city/:region" component={CategoryVenueRegion} />
                    <Route
                        path="/venues-suburb/:category/:suburb/:postcode"
                        component={CategoryVenueSuburb}
                    />
                    <Route path="*" componet={NotFound} />
                </Switch>
            </MainContent>
            {/*<HomePage />*/}
        </div>
    </MuiThemeProvider>
);

export default App;
