/** @jsxRuntime classic */
/** @jsx jsx */
import { FC, HTMLAttributes } from 'react';
import { FrameLines, FrameLinesProps, Text } from '@arwes/core';

import { WithAnimatorOutputProps } from '@arwes/animation';
import { jsx } from '@emotion/react';

const Frame: FC<HTMLAttributes<HTMLDivElement> & FrameLinesProps<HTMLDivElement> & WithAnimatorOutputProps> =
    FrameLines as any;

const AppFooter: FC = () => {
    return (
        <header
            css={({ space }) => ({
                padding: space(2),
                userSelect: 'none',

                p: {
                    margin: 0,
                },
            })}
        >
            <Frame
                animator={{ manager: 'stagger' }}
                style={{
                    display: 'block',
                }}
                hideBottomLines
                hideShapes
            >
                <div
                    css={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text as="p">
                        <a href="https://www.helios.games/" target="helios" referrerPolicy="no-referrer">
                            &copy; Project Helios
                        </a>
                    </Text>
                </div>
            </Frame>
        </header>
    );
};

export { AppFooter };
