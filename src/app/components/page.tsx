/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { Global, jsx } from '@emotion/react';

import { AppFooter } from './page-footer';
import { AppHeader } from './page-header';
import { ArwesTheme } from '@arwes/core';
import { FC } from 'react';
import React from 'react';

export const Page: FC = ({ children }) => {
    return (
        <>
            <Global
                styles={{
                    body: {
                        overflow: 'hidden',
                    },
                }}
            />
            <AppHeader />
            <div
                css={({ space }: ArwesTheme) => ({
                    margin: '0 auto',
                    padding: space(2),
                    width: 1000,
                    flex: 1,
                    overflowY: 'auto',
                })}
            >
                {children}
            </div>
            <AppFooter />
        </>
    );
};
