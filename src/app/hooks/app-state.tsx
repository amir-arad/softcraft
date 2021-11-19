import { FC, createContext, useContext } from 'react';

import { ApplicationState } from '../model';
import React from 'react';
import { useSyncedStore } from '@syncedstore/react';

const storeContext = createContext<ApplicationState | null>(null);

export const ProvideAppState = storeContext.Provider;

export function useAppState(): ApplicationState {
    const state = useContext(storeContext);
    if (!state) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useAppState must be used within a ProvideAppState.');
    }
    return useSyncedStore(state);
}

// eslint-disable-next-line react/display-name
export const AppStateDecorator = (state: ApplicationState | null) => (Story: FC) =>
    (
        <ProvideAppState value={state}>
            <Story />
        </ProvideAppState>
    );
