/** @jsxRuntime classic */
/** @jsx jsx */

import { Jobs, JobsProps } from './jobs';

import { AppStateDecorator } from '../hooks/app-state';
import { Meta } from '@storybook/react';
import { StyleDecorator } from '../style';
import { jsx } from '@emotion/react';
import { stateBuilder } from '../model';

export default {
    title: 'Component/Jobs',
    component: Jobs,
    decorators: [
        AppStateDecorator(
            stateBuilder()
                .qdit({ id: '1' })
                .qdit({ id: '2' })
                .dataset({ id: '1', title: 'data X' })
                .program({ id: '1', title: 'program X' })

                .training({ id: '1', dataSet: '1', srcQdit: '1', dstQdit: '2' })
                .training({ id: '2', dataSet: '1', srcQdit: '2', dstQdit: '1' })
                .training({ id: '3', dataSet: '1', srcQdit: '1', dstQdit: '1' })
                .training({ id: '4', dataSet: '1', srcQdit: '2', dstQdit: '2' })
                .programExecution({ id: '1', program: '1', executingQdit: '1' })
                .programExecution({ id: '2', program: '1', executingQdit: '2' })
                .planning({ id: '1', query: 'short query?' })
                .planning({
                    id: '2',
                    query:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' +
                        ' ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation?',
                })
                .build()
        ),
        StyleDecorator,
    ],
    args: {
        trainings: ['1', '2', '3', '4'],
        programExecutions: ['1', '2'],
        plannings: ['1', '2'],
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
