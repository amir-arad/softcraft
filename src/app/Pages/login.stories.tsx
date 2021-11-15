import { AuthDecorator } from '../use-auth';
import { LoginPage } from './login';
import React from 'react';
import { StyleDecorator } from '../style';

export default {
    title: 'Pages/Login',
    component: LoginPage,
    decorators: [AuthDecorator(null), StyleDecorator],
};

export const Primary = (): JSX.Element => <LoginPage></LoginPage>;
