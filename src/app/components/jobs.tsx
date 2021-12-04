/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

import {
    ApplicationState,
    Id,
    Job,
    JobState,
    Planning,
    ProgramExecution,
    Training,
    getFromMap,
    jobStateName,
} from '../model';
import { Button, Table, Text } from '@arwes/core';
import React, { FC, useState } from 'react';

import { FormatDistance } from 'react-date-fns-hooks/src/index';
import { Modal } from './modal';
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

// inspiration: https://docs.docker.com/engine/reference/commandline/ps/
export type JobsProps = { trainings?: Id[]; programExecutions?: Id[]; plannings?: Id[] };
export const Jobs: FC<JobsProps> = ({ trainings = [], programExecutions = [], plannings = [] }: JobsProps) => {
    const state = useAppState();
    const [jobToCancel, setJobToCancel] = useState<Job | null>(null);
    const trainingRows = getFromMap(state.trainings, trainings).map(trainingRow(state, setJobToCancel));
    const executionRows = getFromMap(state.programExecutions, programExecutions).map(
        programExecutionRow(state, setJobToCancel)
    );
    const planningRows = getFromMap(state.plannings, plannings).map(planningRow(setJobToCancel));
    return (
        <>
            <Table
                headers={headers}
                dataset={[...trainingRows, ...executionRows, ...planningRows]}
                columnWidths={columnWidths}
            />
            <Modal
                isOpen={jobToCancel?.jobState === JobState.STARTED}
                onRequestClose={() => setJobToCancel(null)}
                contentLabel="Cancellation"
            >
                <Text>Are you sure you want to stop the running Job?</Text>
                <div className="flex-break" />
                <div>
                    <Button
                        onClick={() => {
                            if (jobToCancel?.jobState === JobState.STARTED) jobToCancel.jobState = JobState.CANCELLED;
                            setJobToCancel(null);
                        }}
                    >
                        <Text>Yes</Text>
                    </Button>
                    <Button onClick={() => setJobToCancel(null)}>
                        <Text>No</Text>
                    </Button>
                </div>
            </Modal>
        </>
    );
};

const trainingRow = (state: ApplicationState, setJobToCancel: (t: Job) => void) => (t: Training) => {
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
            { id: '5', data: jobStateName(t.jobState) },
            {
                id: '6',
                data:
                    t.jobState !== JobState.STARTED ? (
                        ''
                    ) : (
                        <Button onClick={() => setJobToCancel(t)}>
                            <Text>Cancel</Text>
                        </Button>
                    ),
            },
        ],
    };
};
const programExecutionRow = (state: ApplicationState, setJobToCancel: (t: Job) => void) => (t: ProgramExecution) => {
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
            { id: '5', data: jobStateName(t.jobState) },
            {
                id: '6',
                data:
                    t.jobState !== JobState.STARTED ? (
                        ''
                    ) : (
                        <Button onClick={() => setJobToCancel(t)}>
                            <Text>Cancel</Text>
                        </Button>
                    ),
            },
        ],
    };
};
const planningRow = (setJobToCancel: (t: Job) => void) => (t: Planning) => {
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
            { id: '5', data: jobStateName(t.jobState) },
            {
                id: '6',
                data:
                    t.jobState !== JobState.STARTED ? (
                        ''
                    ) : (
                        <Button onClick={() => setJobToCancel(t)}>
                            <Text>Cancel</Text>
                        </Button>
                    ),
            },
        ],
    };
};
