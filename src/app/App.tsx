import { Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';

import { Page } from './components/Page';
import React from 'react';

function App(): JSX.Element {
    return (
        <Router>
            <Page>
                <Switch>
                    <Route exact path="/">
                        <main>Home</main>
                    </Route>
                    <Route path="/models">
                        <main>Models</main>
                    </Route>
                    <Route path="/datesets">
                        <main>Data-Sets</main>
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Page>
        </Router>
    );
}

function NoMatch() {
    const location = useLocation();

    return (
        <h3>
            Unknown path <code>{location?.pathname}</code>
        </h3>
    );
}

export default App;
