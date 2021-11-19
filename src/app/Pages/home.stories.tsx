import { AuthDecorator } from '../hooks/authentication';
import { HomePage } from './home';
import React from 'react';
import { StyleDecorator } from '../style';

export default {
    title: 'Pages/Home',
    component: HomePage,
    decorators: [AuthDecorator('alice'), StyleDecorator],
};

export const Primary = (): JSX.Element => <HomePage></HomePage>;
