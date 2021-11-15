/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { ArwesTheme, Text } from '@arwes/core';
import React, { FC, useCallback } from 'react';
import { Select, SelectChangeEvent } from '../components/select';

import { AppFooter } from '../components/page-footer';
import { jsx } from '@emotion/react';
import { useAuth } from '../use-auth';

export const LoginPage: FC = () => {
    const auth = useAuth();
    const changeUser = useCallback(
        (event: SelectChangeEvent) => {
            auth.signin(event.target.value || null);
        },
        [auth]
    );
    return (
        <>
            <div
                css={({ space }: ArwesTheme) => ({
                    margin: '1 auto',
                    padding: space(2),
                    maxWidth: 1000,
                    flex: 1,
                    overflowY: 'auto',
                })}
            >
                <Text as="h1">Log In </Text>
                <Select labelText={'User'} value={auth.user || ''} onChange={changeUser}>
                    <option value="alice">alice</option>
                    <option value="bob">bob</option>
                </Select>
            </div>
            <AppFooter />
        </>
    );
};
