import { ProvideAuth, useAuthenticatedUserId } from './hooks/authentication';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import { HomePage } from './Pages/home';
import { LoginPage } from './Pages/login';
import { Page } from './components/page';
import { ProvideAppState } from './hooks/app-state';
import React from 'react';
import { StyleWrapper } from './style';
import { stateBuilder } from './model';

export function createApplicationState() {
    console.log('creating a new application state');
    return stateBuilder()
        .user({ id: '1', name: 'alice', qdits: ['1'], dataSets: ['1'], trainings: ['1'] })
        .user({ id: '2', name: 'bob' })

        .qdit({ id: '1' })
        .qdit({ id: '2' })

        .dataset({ id: '1', title: 'data X' })
        .training({ id: '1', dataSet: '1', srcQdit: '1', dstQdit: '2' })
        .build();
}

function App(): JSX.Element {
    return (
        <StyleWrapper>
            <ProvideAppState value={createApplicationState()}>
                <ProvideAuth>
                    <UserPages />
                </ProvideAuth>
            </ProvideAppState>
        </StyleWrapper>
    );
}

function UserPages() {
    // Get auth state and re-render anytime it changes
    const auth = useAuthenticatedUserId();
    if (auth.userId) {
        return (
            <Router>
                <Page>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/models" />
                            <Route path="/datesets" />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </main>
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
