/** @jsxRuntime classic */
/** @jsx jsx */

import { FC, HTMLAttributes, useCallback } from 'react';
import { FrameLines, FrameLinesProps, Text } from '@arwes/core';
import { jsx, useTheme } from '@emotion/react';

import { Link } from 'react-router-dom';
import { WithAnimatorOutputProps } from '@arwes/animation';
import { createStyles } from './page-header.styles';
import { useRequireAuth } from '../hooks/authentication';

const Frame: FC<HTMLAttributes<HTMLDivElement> & FrameLinesProps<HTMLDivElement> & WithAnimatorOutputProps> =
    FrameLines;

export const AppHeader: FC = () => {
    const auth = useRequireAuth();
    const theme = useTheme();
    const styles = createStyles(theme);
    const logout = useCallback(() => auth.signin(null), [auth]);
    return (
        <header css={styles.root}>
            <Frame animator={{ manager: 'stagger' }} css={styles.frame} hideTopLines hideShapes>
                <div css={styles.container}>
                    <Text as="h1" blink={false}>
                        <Link to="/">Hello, {auth.user.name}</Link>
                    </Text>
                    <Text as="nav" css={styles.nav} blink={false}>
                        <ul css={styles.navList}>
                            <li css={styles.navItem}>
                                <Link to="/qdits">QDits</Link>
                            </li>
                            <li css={styles.navItem}>
                                <Link to="/datesets">Data-Sets</Link>
                            </li>
                            <li css={styles.navItem}>
                                <Link to="/" onClick={logout}>
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </Text>
                </div>
            </Frame>
        </header>
    );
};
