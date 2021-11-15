/** @jsxRuntime classic */
/** @jsx jsx */

import { Meta, Story } from '@storybook/react';
import { Select, SelectProps } from './select';

import { ArwesTheme } from '@arwes/core';
import { StyleDecorator } from '../style';
import { jsx } from '@emotion/react';

export default {
    title: 'Select',
    component: Select,
    decorators: [
        (Story: Story) => (
            <div
                css={({ space }: ArwesTheme) => ({
                    margin: '100 auto',
                    padding: space(2),
                    maxWidth: 500,
                    flex: 1,
                    overflowY: 'auto',
                })}
            >
                <Story />
            </div>
        ),
        StyleDecorator,
    ],
    args: {
        labelText: 'Thing',
        value: '',
        onChange: (event) => console.log(event.target.value),
        children: <option value="1">option 1</option>,
    } as SelectProps,
} as Meta;

export const Primary = (args: SelectProps) => <Select {...args} />;

export const ManyValues = (args: SelectProps) => (
    <Select {...args}>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
        <option value="2">option 2</option>
    </Select>
);
