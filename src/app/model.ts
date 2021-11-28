import { observeDeep, syncedStore } from '@syncedstore/core';

import { MappedTypeDescription } from '@syncedstore/core/types/doc';

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
        user(user: Partial<User> & { id: string; name: string }) {
            users.push({
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
        qdit(qdit: Partial<Qdit> & { id: string }) {
            qdits.push({
                generation: 0,
                attributes: 0,
                dataSetsTrained: [],
                ...qdit,
            });
            return this;
        },
        dataset(dataset: Partial<Dataset> & { id: string; title: string }) {
            dataSets.push({
                trainingTime: 0,
                effect: 0,
                ...dataset,
            });
            return this;
        },
        program(program: Partial<Program> & { id: string; title: string }) {
            programs.push({
                executionTime: 0,
                maxModelGeneration: 0,
                minAttributes: 0,
                playerDescription: program.title,
                masterDescription: program.title,
                outputTemplate: program.title,
                ...program,
            });
            return this;
        },
        programExecution(programExecution: Partial<ProgramExecution> & { id: string; program: Id; executingQdit: Id }) {
            programExecutions.push({
                arguments: {},
                start: Date.now(),
                hasEnded: false,
                ...programExecution,
            });
            return this;
        },
        training(training: Partial<Training> & { id: string; dataSet: Id; srcQdit: Id; dstQdit: Id }) {
            trainings.push({
                start: Date.now(),
                hasEnded: false,
                ...training,
            });
            return this;
        },
        planning(planning: Partial<Planning> & { id: string; query: Text }) {
            plannings.push({
                start: Date.now(),
                hasEnded: false,
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

export type Veca = number;
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
    generation: number;
    attributes: Veca;
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
    hasEnded: boolean;
};

export type Training = {
    id: Id;
    dataSet: Id;
    srcQdit: Id;
    dstQdit: Id;
    start: Milliseconds;
    hasEnded: boolean;
};

export type Planning = {
    id: Id;
    query: Text;
    start: Milliseconds;
    hasEnded: boolean;
    resultPrograms: Id[];
};
