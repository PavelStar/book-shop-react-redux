import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Books from "./pages/Books/Books";
import Home from "./pages/Home/Home";
import Error from "./pages/Error";
import BookInfo from './pages/BookInfo/BookInfo';
import HistoryPage from './pages/History/HistoryPage';

const AppRouter = () => {
    return (
        
            <Switch>
                <Route path="/books">
                    <Books />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/book">
                    <BookInfo />
                </Route>
                <Route path="/error">
                    <Error />
                </Route>
                <Route path="/history">
                    <HistoryPage />
                </Route>
                <Redirect to="/home" />
            </Switch>
        
    )
}

export default AppRouter
