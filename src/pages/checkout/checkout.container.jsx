import React from "react";
import {gql, useQuery} from '@apollo/client'
import CheckoutPage from "./checkout.component";

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

const CheckoutPageContainer = () => {
    const {data: {cartItems}} = useQuery(GET_CART_ITEMS);
    const {data: {total}} = useQuery(GET_CART_TOTAL);
    return (<CheckoutPage cartItems={cartItems} total={total} />);
};

export default CheckoutPageContainer
