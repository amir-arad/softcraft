/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { Button, Table, Text } from '@arwes/core';
import React, { FC } from 'react';
import { getFromMap, logStore } from '../model';

import { FormatDistance } from 'react-date-fns-hooks/src/index';
import { jsx } from '@emotion/react';
import { useAppState } from '../hooks/app-state';
import { useRequireAuth } from '../hooks/authentication';

const headers = [
    { id: '1', data: 'Job ID' },
    { id: '2', data: 'Type' },
    { id: '3', data: 'Parameters' },
    { id: '4', data: 'Created' },
    { id: '5', data: 'Status' },
    { id: '6', data: 'Actions' },
];

const columnWidths = ['15%', '20%', '20%', '15%', '15%', '15%'];

export const HomePage: FC = () => {
    const auth = useRequireAuth();
    const state = useAppState();
    logStore(state);
    const trainings = getFromMap(state.trainings, auth.user.trainings);
    const dataset = trainings.map((t, index) => {
        const dataset = state.dataSets[t.dataSet];
        const qdit = state.qdits[t.subjectQdit];
        if (!dataset || !qdit) {
            throw new Error('missing values');
        }
        return {
            id: index,
            columns: [
                { id: '1', data: t.id },
                { id: '2', data: 'Training' },
                { id: '3', data: `dataset: '${dataset.title}' qdit: ${qdit.id}` },
                { id: '4', data: <FormatDistance date={t.start} includeSeconds={true} addSuffix={true} /> },
                { id: '5', data: t.hasEnded ? 'stopped' : 'running' },
                {
                    id: '6',
                    data: t.hasEnded ? (
                        ''
                    ) : (
                        <Button
                            onClick={() => {
                                t.hasEnded = true;
                            }}
                        >
                            <Text>Cancel</Text>
                        </Button>
                    ),
                },
            ],
        };
    });
    return (
        <>
            <Text as="h1">Running Jobs</Text>
            <Table headers={headers} dataset={dataset} columnWidths={columnWidths} />
        </>
    );
};
// inspiration: https://docs.docker.com/engine/reference/commandline/ps/

/**
 * training and executions
 - running time
 - progress bar 
 - call to action: cancel
##### cancel wizard
"are you sure?"
 */
