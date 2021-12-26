/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import 'react-svg-radar-chart/build/css/index.css';

import { Meta, StoryFn } from '@storybook/react';

import { StyleDecorator } from '../style';
import { friendlyId, VECA_0 } from '../model';
import { jsx } from '@emotion/react';
import { QditCard, QditCardProps } from './qditCard';

export default {
    title: 'Component/QditCard',
    component: QditCard,
    decorators: [StyleDecorator],
    args: {
        id: friendlyId(),
        value: VECA_0,
        datasetNames: ['dataset1', 'dataset2'],
    },
} as Meta;

const Template: StoryFn<QditCardProps> = (args: QditCardProps) => <QditCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    id: friendlyId(),
    value: VECA_0,
    datasetNames: ['dataset1', 'dataset2'],
};

export const Large = Template.bind({});
Large.args = {
    id: friendlyId(),
    value: VECA_0,
    datasetNames: [
        'dataset1',
        'dataset2',
        'dataset3',
        'dataset4',
        'dataset5',
        'VeryLongDatasetName',
        'dataset7',
        'dataset8',
        'dataset9',
        'dataset10',
    ],
};
export const NoDatasets = Template.bind({});
NoDatasets.args = {
    id: friendlyId(),
    value: VECA_0,
    datasetNames: [],
};
