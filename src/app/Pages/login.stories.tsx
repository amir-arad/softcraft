import { AppStateDecorator } from '../hooks/app-state';
import { AuthDecorator } from '../hooks/authentication';
import { LoginPage } from './login';
import React from 'react';
import { StyleDecorator } from '../style';
import { stateBuilder } from '../model';

export default {
    title: 'Pages/Login',
    component: LoginPage,
    decorators: [
        AppStateDecorator(stateBuilder().user({ name: 'alice' }).user({ name: 'bob' }).build()),
        AuthDecorator(null),
        StyleDecorator,
    ],
};

export const Primary = (): JSX.Element => <LoginPage></LoginPage>;
