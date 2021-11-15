import { AuthDecorator } from '../../use-auth';
import { LoginPage } from './login';
import React from 'react';
import { StyleDecorator } from '../../style';

export default {
    title: 'Component/Login',
    component: LoginPage,
    decorators: [AuthDecorator, StyleDecorator],
};

export const TextHeavy = (): JSX.Element => <LoginPage></LoginPage>;
