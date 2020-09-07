import React from "react";
import {gql, useQuery} from '@apollo/client';

import Header from "./header.component";

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`

const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

const HeaderContainer = () => {
    const {data: {cartHidden}} = useQuery(GET_CART_HIDDEN)
    const {data: {currentUser}} = useQuery(GET_CURRENT_USER)

    return <Header currentUser={currentUser} hidden={cartHidden}/>
}

export default HeaderContainer
