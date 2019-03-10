import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router, routerMiddleware } from 'connected-react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { configureStore } from '../shared/store';
import App from '../shared/App';
import createHistory from '../shared/store/history';

const browserHistory = createHistory();

const client = new ApolloClient({
    uri: 'https://ex.bookwell.com.au/graphiql',
    fetchOptions: {
        mode: 'no-cors',
    },
    link: new HttpLink({ uri: 'https://ex.bookwell.com.au/graphiql' }),
    cache: new InMemoryCache(),
});

const store =
    window.store ||
    configureStore({
        initialState: window.__PRELOADED_STATE__,
        middleware: [routerMiddleware(browserHistory)],
    });

hydrate(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <App />
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById('app')
);

if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept();
    }

    if (!window.store) {
        window.store = store;
    }
}
