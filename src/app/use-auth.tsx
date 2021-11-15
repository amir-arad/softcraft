import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

type AuthContext = ReturnType<typeof useProvideAuth>;
const authContext = createContext<AuthContext>({
    user: null,
    signin: () => {
        throw new Error(`unintialized authentication context`);
    },
});
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const AuthDecorator = (Story: FC) => (
    <ProvideAuth>
        <Story />
    </ProvideAuth>
);
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState<null | string>(null);
    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = async (userName: string | null) => {
        setUser(userName);
        return userName;
    };
    // Return the user object and auth methods
    return {
        user,
        signin,
    };
}

export const useRequireAuth = (redirectUrl: string) => {
    const auth = useAuth();
    const history = useHistory();
    // If auth.user is falsy that means we're not logged in and should redirect.
    useEffect(() => {
        if (!auth.user) {
            history.push(redirectUrl);
        }
    }, [auth, history, redirectUrl]);
    return auth;
};
