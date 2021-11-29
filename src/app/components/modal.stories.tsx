/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { Meta, Story, StoryFn } from '@storybook/react';
import { Modal, ModalProps } from './modal';

import { ArwesTheme } from '@arwes/core';
import React from 'react';
import { StyleDecorator } from '../style';
import { jsx } from '@emotion/react';

export default {
    title: 'Component/Modal',
    component: Modal,
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
    argTypes: {
        isOpen: {
            type: 'boolean',
        },
    },
    args: {} as ModalProps,
} as Meta;

const Template: StoryFn<ModalProps> = (args: ModalProps) => (
    <>
        Text outside of modal
        <Modal {...args}> Text inside modal</Modal>
    </>
);
export const Closed = Template.bind({});
Closed.args = {
    isOpen: false,
};
export const Open = Template.bind({});
Open.args = {
    isOpen: true,
};
