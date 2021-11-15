/** @jsxRuntime classic */
/** @jsx jsx */
import { ArwesTheme, FrameLines, FrameLinesProps, Text } from '@arwes/core';
import { FC, HTMLAttributes } from 'react';

import { WithAnimatorOutputProps } from '@arwes/animation';
import { jsx } from '@emotion/react';

type Frameprops = HTMLAttributes<HTMLDivElement> & FrameLinesProps<HTMLDivElement> & WithAnimatorOutputProps;
const Frame: FC<Frameprops> = FrameLines;

export const AppFooter: FC = () => {
    return (
        <header
            css={({ space }: ArwesTheme) => ({
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
