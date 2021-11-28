import { ids, stateBuilder } from '../model';

import { AppStateDecorator } from '../hooks/app-state';
import { AuthDecorator } from '../hooks/authentication';
import { HomePage } from './home';
import React from 'react';
import { StyleDecorator } from '../style';

const [user1, qdit1, qdit2, dataset1, training1] = ids();
export default {
    title: 'Pages/Home',
    component: HomePage,
    decorators: [
        AppStateDecorator(
            stateBuilder()
                .user({ id: user1, name: 'alice', qdits: [qdit1], dataSets: [dataset1], trainings: [training1] })

                .qdit({ id: qdit1 })
                .qdit({ id: qdit2 })

                .dataset({ id: dataset1, title: 'data X' })
                .training({ id: training1, dataSet: dataset1, srcQdit: qdit1, dstQdit: qdit2 })
                .build()
        ),
        AuthDecorator(user1),
        StyleDecorator,
    ],
};

export const Primary = (): JSX.Element => <HomePage></HomePage>;
