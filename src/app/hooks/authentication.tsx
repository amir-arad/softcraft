import React, { FC, ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { useAppState } from './app-state';

type AuthState = ReturnType<typeof useProvideAuth>;
const authContext = createContext<AuthState>({
    userId: null,
    signin: () => {
        throw new Error(`unintialized authentication context`);
    },
});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ user = null, children }: { user?: null | string; children: ReactNode }) {
    const auth = useProvideAuth(user);
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const AuthDecorator = (user: null | string) => (Story: FC) =>
    (
        <ProvideAuth user={user}>
            <Story />
        </ProvideAuth>
    );
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuthenticatedUserId = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth(defaultUserId: null | string) {
    const [loggedInUserId, setLoggedInUserId] = useState<null | string>(defaultUserId);
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = async (userId: string | null) => {
        setLoggedInUserId(userId);
        return userId;
    };
    // Return the user object and auth methods
    return {
        userId: loggedInUserId,
        signin,
    };
}

export const useRequireAuth = () => {
    const auth = useAuthenticatedUserId();
    const state = useAppState();
    return useMemo(() => {
        const userId = auth.userId;
        if (!userId) {
            throw new Error('must be logged in');
        }
        const user = state.users[userId];
        if (!user) {
            throw new Error("can't find user " + userId);
        }
        return { ...auth, userId, user };
    }, [auth, state.users]);
};
