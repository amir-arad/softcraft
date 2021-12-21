import { ids, stateBuilder } from '../model';

import { AppStateDecorator } from '../hooks/app-state';
import { AuthDecorator } from '../hooks/authentication';
import { DataSet } from './dataset';
import React from 'react';
import { StyleDecorator } from '../style';

const [user1, dataset1, dataset2] = ids();
export default {
    title: 'Pages/Dataset',
    component: DataSet,
    decorators: [
        AppStateDecorator(
            stateBuilder()
                .user({ id: user1, name: 'alice', dataSets: [dataset1, dataset2] })
                .dataset({ id: dataset1, title: 'data X' })
                .dataset({ id: dataset2, title: 'data Y', effect: [3, -2, -1, 4] })
                .build()
        ),
        AuthDecorator(user1),
        StyleDecorator,
    ],
};

export const Primary = (): JSX.Element => <DataSet></DataSet>;
