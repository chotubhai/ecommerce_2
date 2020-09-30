import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {LandingPage} from './screens/landingPage';
import {ProductViewPage} from './screens/productViewPage';
import {SearchPage} from './screens/searchPage';
import {Cart} from './screens/cart';

export const App = () => {
    return (
        <Router>
            <Route path="/" exact component={LandingPage} />
            <Route path="/productview" component={ProductViewPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/cart" component={Cart} />
        </Router>
    )
}
