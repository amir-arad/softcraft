/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React, { FC } from 'react';

import { Jobs } from '../components/jobs';
import { Text } from '@arwes/core';
import { jsx } from '@emotion/react';
import { logStore } from '../model';
import { useAppState } from '../hooks/app-state';
import { useRequireAuth } from '../hooks/authentication';

export const HomePage: FC = () => {
    const auth = useRequireAuth();
    const state = useAppState();
    logStore(state);
    return (
        <>
            <Text as="h1">Here is a list of all your jobs</Text>
            <Jobs trainings={auth.user.trainings} programExecutions={auth.user.programExecutions} />
        </>
    );
};
