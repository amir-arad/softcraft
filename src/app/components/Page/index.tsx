/** @jsxRuntime classic */
/** @jsx jsx */

import { ArwesThemeProvider, ArwesThemeProviderProps, StylesBaseline } from '@arwes/core';
import { BleepsProvider, BleepsProviderProps } from '@arwes/sounds';
import { Global, jsx } from '@emotion/react';

import { AnimatorGeneralProvider } from '@arwes/animation';
import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';
import { FC } from 'react';
import SOUND_ASSEMBLE_URL from '/sounds/assemble.mp3';
import SOUND_CLICK_URL from '/sounds/click.mp3';
import SOUND_OBJECT_URL from '/sounds/object.mp3';
import SOUND_TYPE_URL from '/sounds/type.mp3';
import lighten from 'polished/lib/color/lighten';

const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';

const PALETTE_PRIMARY = '#62bffd';
const PALETTE_SECONDARY = '#b1d8f1';
const PALETTE_TEXT = '#a0c8e2';
const PALETTE_NEUTRAL = '#030f18';

const themeProviderProps: ArwesThemeProviderProps = {
    themeSettings: {
        palette: {
            primary: { main: PALETTE_PRIMARY },
            secondary: { main: PALETTE_SECONDARY },
            text: {
                root: PALETTE_TEXT,
                headings: PALETTE_SECONDARY,
                link: lighten(0.1, PALETTE_SECONDARY),
                linkHover: lighten(0.2, PALETTE_SECONDARY),
            },
            neutral: { main: PALETTE_NEUTRAL },
        },
    },
};

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

export const Page: FC = ({ children }) => {
    return (
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
                        <Global
                            styles={{
                                body: {
                                    overflow: 'hidden',
                                },
                            }}
                        />
                        <AppHeader />
                        <div
                            css={({ space }) => ({
                                margin: '0 auto',
                                padding: space(2),
                                maxWidth: 1000,
                                flex: 1,
                                overflowY: 'auto',
                            })}
                        >
                            {children}
                        </div>
                        <AppFooter />
                    </div>
                </BleepsProvider>
            </AnimatorGeneralProvider>
        </ArwesThemeProvider>
    );
};
