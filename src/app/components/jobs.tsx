/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import { ApplicationState, Id, Planning, ProgramExecution, Training, getFromMap } from '../model';
import { Button, Table, Text } from '@arwes/core';

import { FC } from 'react';
import { FormatDistance } from 'react-date-fns-hooks/src/index';
import { jsx } from '@emotion/react';
import { useAppState } from '../hooks/app-state';

const headers = [
    { id: '1', data: 'Job ID' },
    { id: '2', data: 'Type' },
    { id: '3', data: 'Parameters' },
    { id: '4', data: 'Created' },
    { id: '5', data: 'Status' },
    { id: '6', data: 'Actions' },
];

const columnWidths = ['10%', '10%', '35%', '20%', '13%', '12%'];

export type JobsProps = { trainings?: Id[]; programExecutions?: Id[]; plannings?: Id[] };
export const Jobs: FC<JobsProps> = ({ trainings = [], programExecutions = [], plannings = [] }: JobsProps) => {
    const state = useAppState();
    const trainingRows = getFromMap(state.trainings, trainings).map(trainingRow(state));
    const executionRows = getFromMap(state.programExecutions, programExecutions).map(programExecutionRow(state));
    const planningRows = getFromMap(state.plannings, plannings).map(planningRow);
    return (
        <Table
            headers={headers}
            dataset={[...trainingRows, ...executionRows, ...planningRows]}
            columnWidths={columnWidths}
        />
    );
};

const trainingRow = (state: ApplicationState) => (t: Training) => {
    const dataset = state.dataSets[t.dataSet];
    const srcQdit = state.qdits[t.srcQdit];
    const dstQdit = state.qdits[t.dstQdit];
    if (!dataset || !srcQdit || !dstQdit) {
        throw new Error('missing values');
    }
    return {
        id: 'Training_' + t.id,
        columns: [
            { id: '1', data: t.id },
            { id: '2', data: 'Training' },
            {
                id: '3',
                data: `dataset: '${dataset.title}'' | source Qdit: ${srcQdit.id} | destination Qdit: ${dstQdit.id}`,
            },
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
};
const programExecutionRow = (state: ApplicationState) => (t: ProgramExecution) => {
    const executingQdit = state.qdits[t.executingQdit];
    const program = state.programs[t.program];
    if (!executingQdit || !program) {
        throw new Error('missing values');
    }
    return {
        id: 'Execution_' + t.id,
        columns: [
            { id: '1', data: t.id },
            { id: '2', data: 'Execution' },
            {
                id: '3',
                data: `program: '${program.title}' | executing Qdit: ${executingQdit.id}`,
            },
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
};
const planningRow = (t: Planning) => {
    return {
        id: 'Planning_' + t.id,
        columns: [
            { id: '1', data: t.id },
            { id: '2', data: 'Planning' },
            {
                id: '3',
                data: t.query,
            },
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
