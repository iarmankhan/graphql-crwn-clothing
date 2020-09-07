import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, HttpLink, gql} from '@apollo/client';

import './index.css';
import App from './App';
import {resolvers, typeDefs} from './graphql/resolvers'

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                cartItems: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
});

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://crwn-clothing.com",
    }),
    cache,
    typeDefs,
    resolvers
});


client.writeQuery({
    query: gql`
        query GetCartData {
          cartItems,
          cartHidden,
          itemCount,
          currentUser,
          total,
          sections
        }
    `,
    data: {
        cartHidden: true,
        cartItems: [],
        itemCount: 0,
        currentUser: null,
        total: 0,
        sections: [
            {
                title: 'hats',
                imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
                id: 1,
                linkUrl: 'shop/hats'
            },
            {
                title: 'jackets',
                imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
                id: 2,
                linkUrl: 'shop/jackets'
            },
            {
                title: 'sneakers',
                imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
                id: 3,
                linkUrl: 'shop/sneakers'
            },
            {
                title: 'womens',
                imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
                size: 'large',
                id: 4,
                linkUrl: 'shop/womens'
            },
            {
                title: 'mens',
                imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
                size: 'large',
                id: 5,
                linkUrl: 'shop/mens'
            }
        ]
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root')
);
