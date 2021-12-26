import { observeDeep, syncedStore } from '@syncedstore/core';
import { MappedTypeDescription } from '@syncedstore/core/types/doc';
import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator';
import { customAlphabet } from 'nanoid';
import { customSpaceThemeWords } from '../lib/space-words';

export const id = customAlphabet('0123456789ABCDEF', 10);

export function* ids() {
    while (true) yield id();
}

export function* friendlyIds() {
    while (true) yield friendlyId();
}

export function friendlyId(): string {
    return uniqueNamesGenerator({ dictionaries: [adjectives, colors, customSpaceThemeWords] });
}

export function idsFromMap(store: Partial<EntityStore<Entity>>): Id[] {
    return Object.values(store)
        .filter((i): i is Entity => !!i)
        .map((i) => i.id);
}

export function getQditGeneration(qdit: Qdit): number {
    return qdit.dataSetsTrained.length;
}

export function selectQdit(state: ApplicationState, qditId: Id): Qdit {
    const qdit = state.qdits[qditId];
    if (!qdit) throw new Error(`Qdit ${qditId} not found`);
    return qdit;
}

export function selectQditVECA(state: ApplicationState, qditId: Id): Veca {
    // This currently allows negative values, we should probably max(v, 0) them before displaying the VECABIG)
    const qdit = selectQdit(state, qditId);
    return [...qdit.dataSetsTrained].reduce((acc, ds) => {
        const [v, e, c, a] = selectDataset(state, ds).effect;
        return [acc[0] + v, acc[1] + e, acc[2] + c, acc[3] + a];
    }, VECA_0);
}

export function selectDataset(state: ApplicationState, datasetId: Id): Dataset {
    const dataset = state.dataSets[datasetId];
    if (!dataset) throw new Error(`Dataset ${datasetId} not found`);
    return dataset;
}

export type InnerApplicationState = {
    users: EntityStore<User>;
    qdits: EntityStore<Qdit>;
    dataSets: EntityStore<Dataset>;
    programs: EntityStore<Program>;
    programExecutions: EntityStore<ProgramExecution>;
    trainings: EntityStore<Training>;
    plannings: EntityStore<Planning>;
};
export type Entity = { id: Id };
export type EntityStore<T extends Entity> = Record<Id, T>;
export enum JobState {
    STARTED,
    CANCELLED,
    COMPLETED,
}
export type Job = {
    start: Milliseconds;
    jobState: JobState;
};

export function jobStateName(jobState: JobState) {
    switch (jobState) {
        case JobState.STARTED:
            return 'started';
        case JobState.CANCELLED:
            return 'cancelled';
        case JobState.COMPLETED:
            return 'completed';
        default:
            throw new Error(`unknown COMPLETED: ${jobState}`);
    }
}
export function addToMap<T extends Entity>(store: Partial<EntityStore<T>>, entity: T) {
    store[entity.id] = entity;
}

export function getFromMap<T extends Entity>(store: Partial<EntityStore<T>>, ids: Id[]) {
    return ids.map((id) => store[id]) as T[];
}

export function logStore(store: unknown) {
    console.log('app state', JSON.parse(JSON.stringify(store, undefined, 2)));
    observeDeep(store, () => {
        console.log('app state', JSON.parse(JSON.stringify(store, undefined, 2)));
    });
}
export type ApplicationState = MappedTypeDescription<InnerApplicationState>;

export function stateBuilder() {
    const users: User[] = [];
    const qdits: Qdit[] = [];
    const dataSets: Dataset[] = [];
    const programs: Program[] = [];
    const programExecutions: ProgramExecution[] = [];
    const trainings: Training[] = [];
    const plannings: Planning[] = [];
    return {
        user(user: Partial<User> & { name: string }) {
            users.push({
                id: id(),
                qdits: [],
                dataSets: [],
                programs: [],
                programExecutions: [],
                trainings: [],
                plannings: [],
                ...user,
            });
            return this;
        },
        qdit(qdit: Partial<Qdit>) {
            qdits.push({
                id: friendlyId(),
                dataSetsTrained: [],
                ...qdit,
            });
            return this;
        },
        dataset(dataset: Partial<Dataset> & { title: string }) {
            dataSets.push({
                id: id(),
                trainingTime: 0,
                effect: VECA_0,
                ...dataset,
            });
            return this;
        },
        program(program: Partial<Program> & { title: string }) {
            programs.push({
                id: id(),
                executionTime: 0,
                maxModelGeneration: 0,
                minAttributes: VECA_0,
                playerDescription: program.title,
                masterDescription: program.title,
                outputTemplate: program.title,
                ...program,
            });
            return this;
        },
        programExecution(programExecution: Partial<ProgramExecution> & { program: Id; executingQdit: Id }) {
            programExecutions.push({
                id: id(),
                arguments: {},
                start: Date.now(),
                jobState: JobState.STARTED,
                ...programExecution,
            });
            return this;
        },
        training(training: Partial<Training> & { dataSet: Id; srcQdit: Id; dstQdit: Id }) {
            trainings.push({
                id: id(),
                start: Date.now(),
                jobState: JobState.STARTED,
                ...training,
            });
            return this;
        },
        planning(planning: Partial<Planning> & { query: Text }) {
            plannings.push({
                id: id(),
                start: Date.now(),
                jobState: JobState.STARTED,
                resultPrograms: [],
                ...planning,
            });
            return this;
        },
        build(): ApplicationState {
            const state = syncedStore<ApplicationState>({
                users: {},
                qdits: {},
                dataSets: {},
                programs: {},
                programExecutions: {},
                trainings: {},
                plannings: {},
            });
            for (const user of users) addToMap(state.users, user);
            for (const qdit of qdits) addToMap(state.qdits, qdit);
            for (const dataset of dataSets) addToMap(state.dataSets, dataset);
            for (const program of programs) addToMap(state.programs, program);
            for (const programExecution of programExecutions) addToMap(state.programExecutions, programExecution);
            for (const training of trainings) addToMap(state.trainings, training);
            for (const planning of plannings) addToMap(state.plannings, planning);
            return state;
        },
    };
}

export const VECA_0: Veca = [0, 0, 0, 0];
export type Veca = [number, number, number, number];
export type Text = string;
export type Milliseconds = number;
export type Id = string;

export type User = {
    id: Id;
    name: string;
    qdits: Id[];
    dataSets: Id[];
    plannings: Id[];
    programs: Id[];
    programExecutions: Id[];
    trainings: Id[];
};

export type Qdit = {
    id: Id;
    dataSetsTrained: Id[];
};

export type Dataset = {
    id: Id;
    title: string;
    trainingTime: Milliseconds;
    effect: Veca;
};

export type Program = {
    id: Id;
    title: string;
    executionTime: Milliseconds;
    maxModelGeneration: number;
    minAttributes: Veca;
    playerDescription: Text;
    masterDescription: Text;
    outputTemplate: Text;
};

export type ProgramExecution = {
    id: Id;
    program: Id;
    executingQdit: Id;
    arguments: Record<string, string>;
    start: Milliseconds;
    jobState: JobState;
};

export type Training = {
    id: Id;
    dataSet: Id;
    srcQdit: Id;
    dstQdit: Id;
    start: Milliseconds;
    jobState: JobState;
};

export type Planning = {
    id: Id;
    query: Text;
    start: Milliseconds;
    jobState: JobState;
    resultPrograms: Id[];
};
