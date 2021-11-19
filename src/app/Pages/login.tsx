/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { ArwesTheme, Text } from '@arwes/core';
import React, { FC, useCallback } from 'react';
import { Select, SelectChangeEvent } from '../components/select';

import { AppFooter } from '../components/page-footer';
import { User } from '../model';
import { jsx } from '@emotion/react';
import { useAppState } from '../hooks/app-state';
import { useAuthenticatedUserId } from '../hooks/authentication';

export const LoginPage: FC = () => {
    const state = useAppState();
    const auth = useAuthenticatedUserId();
    const changeUser = useCallback(
        (event: SelectChangeEvent) => {
            auth.signin(event.target.value || null);
        },
        [auth]
    );
    const users = Object.values(state.users) as User[];
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
                <Select labelText={'User'} value={auth.userId || ''} onChange={changeUser}>
                    {users.map((u) => (
                        <option key={`user-` + u.id} value={u.id}>
                            {u.name}
                        </option>
                    ))}
                </Select>
            </div>
            <AppFooter />
        </>
    );
};
