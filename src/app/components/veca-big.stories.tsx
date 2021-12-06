/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import 'react-svg-radar-chart/build/css/index.css';

import { Meta, StoryFn } from '@storybook/react';
import { VecaBig, VecaProps } from './veca-big';

import { StyleDecorator } from '../style';
import { VECA_0 } from '../model';
import { jsx } from '@emotion/react';

export default {
    title: 'Component/VecaBig',
    component: VecaBig,
    decorators: [StyleDecorator],
    args: {
        size: 500,
        value: VECA_0,
    },
} as Meta;

const Template: StoryFn<VecaProps> = (args: VecaProps) => <VecaBig {...args} />;

export const Zero = Template.bind({});
Zero.args = {
    value: VECA_0,
};

export const Large = Template.bind({});
Large.args = {
    value: [1, 2, 3, 4],
    size: 500,
};
export const Small = Template.bind({});
Small.args = {
    value: [1, 2, 3, 4],
    size: 200,
};
