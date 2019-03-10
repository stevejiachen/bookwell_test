import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Html from './components/HTML';
import App from '../shared/App';
import fetch from 'node-fetch';
// import ApolloClient from 'apollo-boost';
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    addTypename: false,
    link: createHttpLink({
        uri: 'https://ex.bookwell.com.au/graphiql',
        fetch: fetch,
        fetchOptions: {
            mode: 'no-cors',
        },
    }),
    cache: new InMemoryCache(),
});

const serverRenderer = () => (req, res) => {
    const content = renderToString(
        <ApolloProvider client={client}>
            <Provider store={req.store}>
                <Router location={req.url} context={{}}>
                    <App />
                </Router>
            </Provider>
        </ApolloProvider>
    );

    const state = JSON.stringify(req.store.getState());

    return res.send(
        '<!doctype html>' +
            renderToString(
                <Html
                    css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
                    scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
                    state={state}
                >
                    {content}
                </Html>
            )
    );
};

export default serverRenderer;
