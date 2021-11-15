/** @jsxRuntime classic */
/** @jsx jsx */

import { ArwesThemeProvider, StylesBaseline } from '@arwes/core';
import { BleepsProvider, BleepsProviderProps } from '@arwes/sounds';
import { FONT_FAMILY_ROOT, themeProviderProps } from './theme';

import { AnimatorGeneralProvider } from '@arwes/animation';
import { FC } from 'react';
import SOUND_ASSEMBLE_URL from '/sounds/assemble.mp3';
import SOUND_CLICK_URL from '/sounds/click.mp3';
import SOUND_OBJECT_URL from '/sounds/object.mp3';
import SOUND_TYPE_URL from '/sounds/type.mp3';
import { jsx } from '@emotion/react';

const globalStyles = {
    'html, body': {
        fontFamily: FONT_FAMILY_ROOT,
    },
};

const generalAnimator = {
    duration: {
        enter: 200,
        exit: 200,
        stagger: 50,
    },
};

const bleepsProviderProps: BleepsProviderProps = {
    audioSettings: {
        common: {
            volume: 0.4,
        },
        categories: {
            interaction: {
                volume: 0.3,
            },
        },
    },
    playersSettings: {
        object: { src: [SOUND_OBJECT_URL] },
        assemble: { src: [SOUND_ASSEMBLE_URL], loop: true },
        type: { src: [SOUND_TYPE_URL], loop: true },
        click: { src: [SOUND_CLICK_URL] },
    },
    bleepsSettings: {
        object: { player: 'object' },
        assemble: { player: 'assemble' },
        type: { player: 'type' },
        click: { player: 'click' },
    },
};

export const StyleWrapper: FC = ({ children }) => (
    <ArwesThemeProvider {...themeProviderProps}>
        <StylesBaseline styles={globalStyles} />
        <AnimatorGeneralProvider animator={generalAnimator}>
            <BleepsProvider {...bleepsProviderProps}>
                <div
                    css={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </div>
            </BleepsProvider>
        </AnimatorGeneralProvider>
    </ArwesThemeProvider>
);
export const StyleDecorator = (Story: FC) => (
    <StyleWrapper>
        <Story />
    </StyleWrapper>
);
