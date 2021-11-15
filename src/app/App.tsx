import { ProvideAuth, useAuth } from './hooks/authentication';
import { Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';

import { LoginPage } from './Pages/login';
import { Page } from './components/page';
import React from 'react';
import { StyleWrapper } from './style';

function App(): JSX.Element {
    return (
        <StyleWrapper>
            <ProvideAuth>
                <UserPages />
            </ProvideAuth>
        </StyleWrapper>
    );
}

function UserPages() {
    // Get auth state and re-render anytime it changes
    const auth = useAuth();
    if (auth.user) {
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
    } else {
        return <LoginPage />;
    }
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
