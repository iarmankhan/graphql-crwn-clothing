import {gql} from '@apollo/client';

import {addItemToCart, getCartItemCount, getCartTotal, removeItemFromCart} from './cart.utils'

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }
    
    extend type User {
        id: String!
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        RemoveItemFromCart(item: Item!): [Item]!
        ClearItem(item: Item!): [Item]!
        SetUser(user: User!): User!
    }
`;

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`;

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`

const GET_CART_TOTAL = gql`
    {
        total @client
    }
`;

const SET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

export const resolvers = {
    Mutation: {
        setUser: (_root, {user}, {cache}) => {
            cache.writeQuery({
                query: SET_CURRENT_USER,
                data: {
                    currentUser: user
                }
            });

            return user
        },

        toggleCartHidden: (_root, _args, {cache}) => {
            const {cartHidden} = cache.readQuery({query: GET_CART_HIDDEN})

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: {
                    cartHidden: !cartHidden
                }
            })

            return !cartHidden;
        },

        addItemToCart: (_root, {item}, {cache}) => {
            const {cartItems} = cache.readQuery({query: GET_CART_ITEMS})

            const newCartItems = addItemToCart(cartItems, item);

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: {
                    itemCount: getCartItemCount(newCartItems)
                }
            })

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {
                    cartItems: newCartItems
                }
            })

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: {
                    total: getCartTotal(newCartItems)
                }
            });

            return newCartItems
        },

        removeItemFromCart: (_root, {item}, {cache}) => {
            const {cartItems} = cache.readQuery({query: GET_CART_ITEMS})

            const newCartItems = removeItemFromCart(cartItems, item)

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: {
                    itemCount: getCartItemCount(newCartItems)
                }
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {
                    cartItems: newCartItems
                }
            })

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: {
                    total: getCartTotal(newCartItems)
                }
            });

            return newCartItems
        },

        clearItem: (_root, {item}, {cache}) => {
            const {cartItems} = cache.readQuery({query: GET_CART_ITEMS});
            const newCartItems = cartItems.filter(
                cartItem => cartItem.id !== item.id
            );
            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: {
                    itemCount: getCartItemCount(newCartItems)
                }
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {
                    cartItems: newCartItems
                }
            })

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: {
                    total: getCartTotal(newCartItems)
                }
            });

            return newCartItems
        }
    }
};
