import React from "react";
import { gql, useMutation } from '@apollo/client';
import CheckoutItem from "./checkout-item.component";

const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($item: Item!){
        removeItemFromCart(item: $item) @client
    }
`;

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!){
        addItemToCart(item: $item) @client
    }
`;

const CLEAR_ITEM = gql`
    mutation ClearItem($item: Item!){
        clearItem(item: $item) @client
    }
`;

const CheckoutItemContainer = (props) => {
    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
    const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);
    const [clearItem] = useMutation(CLEAR_ITEM);

    return (
        <CheckoutItem {...props} clearItem={item => {
            console.log(item)
            return clearItem({variables: {item}}) }
        } addItem={item => addItemToCart({variables: {item}})} removeItem={item => removeItemFromCart({variables: {item}})} />
    )
};

export default CheckoutItemContainer
