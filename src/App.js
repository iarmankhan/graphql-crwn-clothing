import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {default as CheckoutPage} from './pages/checkout/checkout.container';

import {default as Header} from './components/header/header.container';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {gql, useMutation, useQuery} from "@apollo/client";

const App = () => {

    const SET_CURRENT_USER = gql`
        mutation SetUser($user: User) {
            setUser(user: $user) @client
        }
    `;

    const [setCurrentUser] = useMutation(SET_CURRENT_USER)

    useEffect(() => {

        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        variables: {
                            user: {
                                id: snapShot.id,
                                ...snapShot.data()
                            }
                        }
                    });
                });
            }
            setCurrentUser({variables: {user: null} });
        });

        return () => {
            unsubscribeFromAuth();
        }
    }, [setCurrentUser]);

    const GET_CURRENT_USER = gql`
        {
            currentUser @client
        }
    `;

    const {data} = useQuery(GET_CURRENT_USER);

    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route
                    exact
                    path='/signin'
                    render={() =>
                        data.currentUser ? (
                            <Redirect to='/'/>
                        ) : (
                            <SignInAndSignUpPage/>
                        )
                    }
                />
            </Switch>
        </div>
    );
};

export default App;
