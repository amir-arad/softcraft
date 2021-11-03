/** @jsxRuntime classic */
/** @jsx jsx */

import { FC, HTMLAttributes } from 'react';
import { FrameLines, FrameLinesProps, Text } from '@arwes/core';
import { jsx, useTheme } from '@emotion/react';

import { WithAnimatorOutputProps } from '@arwes/animation';
import { createStyles } from './AppHeader.styles';

const Frame: FC<HTMLAttributes<HTMLDivElement> & FrameLinesProps<HTMLDivElement> & WithAnimatorOutputProps> =
    FrameLines;

export const AppHeader: FC = () => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <header css={styles.root}>
            <Frame animator={{ manager: 'stagger' }} css={styles.frame} hideTopLines hideShapes>
                <div css={styles.container}>
                    <Text as="h1" blink={false}>
                        <a href="/">Home</a>
                    </Text>
                    <Text as="nav" css={styles.nav} blink={false}>
                        <ul css={styles.navList}>
                            <li css={styles.navItem}>
                                <a href="/models">Models</a>
                            </li>
                            <li css={styles.navItem}>
                                <a href="/datesets">Data-Sets</a>
                            </li>
                        </ul>
                    </Text>
                </div>
            </Frame>
        </header>
    );
};
