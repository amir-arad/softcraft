import { ProvideAuth, useAuthenticatedUserId } from './hooks/authentication';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { friendlyIds, ids, stateBuilder } from './model';

import { DataSet } from './Pages/dataset';
import { HomePage } from './Pages/home';
import { LoginPage } from './Pages/login';
import { Page } from './components/page';
import { ProvideAppState } from './hooks/app-state';
import React from 'react';
import { StyleWrapper } from './style';
import { Qdits } from './Pages/qdits';

export function createApplicationState() {
    const [alice, bob, dataset1, dataset2, training] = ids();
    const [qdit1, qdit2] = friendlyIds();
    console.log('creating a new application state');
    return stateBuilder()
        .dataset({ id: dataset1, title: 'data X', effect: [0, 0, 1, 2] })
        .dataset({ id: dataset2, title: 'data Y', effect: [3, -2, -1, 4] })
        .user({ id: alice, name: 'alice', qdits: [qdit1, qdit2], dataSets: [dataset1], trainings: [training] })
        .user({ id: bob, name: 'bob' })

        .qdit({ id: qdit1, dataSetsTrained: [dataset1, dataset2] })
        .qdit({ id: qdit2 })

        .training({ id: training, dataSet: dataset1, srcQdit: qdit1, dstQdit: qdit2 })
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
                            <Route path="/qdits" element={<Qdits />} />
                            <Route path="/datesets" element={<DataSet />} />
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
