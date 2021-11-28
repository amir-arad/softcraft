/** @jsxRuntime classic */
/** @jsx jsx */

import { Jobs, JobsProps } from './jobs';
import { id, ids, idsFromMap, stateBuilder } from '../model';

import { AppStateDecorator } from '../hooks/app-state';
import { Meta } from '@storybook/react';
import { StyleDecorator } from '../style';
import { jsx } from '@emotion/react';

const [qdit1, qdit2, dataset1, program1] = ids();
const longQuery = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation?`;
const state = stateBuilder()
    .qdit({ id: qdit1 })
    .qdit({ id: qdit2 })
    .dataset({ id: dataset1, title: 'data X' })
    .program({ id: program1, title: 'program X' })

    .training({ dataSet: dataset1, srcQdit: qdit1, dstQdit: qdit2 })
    .training({ dataSet: dataset1, srcQdit: qdit2, dstQdit: qdit1 })
    .training({ dataSet: dataset1, srcQdit: qdit1, dstQdit: qdit1 })
    .training({ dataSet: dataset1, srcQdit: qdit2, dstQdit: qdit2 })
    .programExecution({ program: program1, executingQdit: qdit1 })
    .programExecution({ program: program1, executingQdit: qdit2 })
    .planning({ query: 'short query?' })
    .planning({ query: longQuery })
    .build();

export default {
    title: 'Component/Jobs',
    component: Jobs,
    decorators: [AppStateDecorator(state), StyleDecorator],
    args: {
        trainings: idsFromMap(state.trainings),
        programExecutions: idsFromMap(state.programExecutions),
        plannings: idsFromMap(state.plannings),
    } as JobsProps,
} as Meta;

export const Primary = (args: JobsProps) => <Jobs {...args} />;
export const ManyValues = (args: JobsProps) => (
    <Jobs
        trainings={Array(10)
            .fill(args.trainings)
            .flatMap((i) => i)}
        programExecutions={Array(10)
            .fill(args.programExecutions)
            .flatMap((i) => i)}
        plannings={Array(10)
            .fill(args.plannings)
            .flatMap((i) => i)}
    />
);
export const Empty = () => <Jobs />;
