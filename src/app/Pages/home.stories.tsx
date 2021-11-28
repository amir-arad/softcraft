import { AppStateDecorator } from '../hooks/app-state';
import { AuthDecorator } from '../hooks/authentication';
import { HomePage } from './home';
import React from 'react';
import { StyleDecorator } from '../style';
import { stateBuilder } from '../model';

export default {
    title: 'Pages/Home',
    component: HomePage,
    decorators: [
        AppStateDecorator(
            stateBuilder()
                .user({ id: '1', name: 'alice', qdits: ['1'], dataSets: ['1'], trainings: ['1'] })

                .qdit({ id: '1' })
                .qdit({ id: '2' })

                .dataset({ id: '1', title: 'data X' })
                .training({ id: '1', dataSet: '1', srcQdit: '1', dstQdit: '2' })
                .build()
        ),
        AuthDecorator('1'),
        StyleDecorator,
    ],
};

export const Primary = (): JSX.Element => <HomePage></HomePage>;
