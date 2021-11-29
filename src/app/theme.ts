import { ArwesThemeProviderProps } from '@arwes/core';
import lighten from 'polished/lib/color/lighten';

export const FONT_FAMILY_ROOT = '"Titillium Web", sans-serif';
export const FONT_FAMILY_MONOSPACE = '"Source Code Pro", monospace';

export const PALETTE_PRIMARY = '#62bffd';
export const PALETTE_SECONDARY = '#b1d8f1';
export const PALETTE_TEXT = '#a0c8e2';
export const PALETTE_NEUTRAL = '#030f18';

/**
 * convert hex color and alpha value to rgba expression
 * @param rgb CSS hex RGB string like '#62bffd'
 * @param a CSS decimal point alpha string like '.15'
 * @returns css rgba string like 'rgba(255, 0, 0, 0.5)'
 */
export function rgba(rgb: string, a: string) {
    return `rgba(${parseInt(rgb.substring(1, 3), 16)},${parseInt(rgb.substring(3, 5), 16)},${parseInt(
        rgb.substring(5, 7),
        16
    )},${a})`;
}

export const themeProviderProps: ArwesThemeProviderProps = {
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

// used by components copied from arwes playground

// The theme is not provided to components in a React context provider
// since the components should be rendered as decoupled from this interface.
// So in this playground application, the theme is imported directly into
// each component.
export const theme = {
    // typography: {
    //     content: FONT_FAMILY_ROOT,
    //     monospace: FONT_FAMILY_MONOSPACE,
    // },
    color: {
        background: '#001313',
        section: '#001a1a',
        // border: '#06d8d7',
        headings: '#00f8f8',
        content: '#7efcf6',
        active: '#d4f6fd',
        // error: '#ce003e',
    },
    // breakpoints: {
    //     tablet: 768,
    //     tabletUp: '@media (min-width: 768px)',
    //     tabletDown: '@media (max-width: 767px)',
    // },
};
