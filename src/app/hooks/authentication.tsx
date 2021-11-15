import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type AuthContext = ReturnType<typeof useProvideAuth>;
const authContext = createContext<AuthContext>({
    user: null,
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

// eslint-disable-next-line react/display-name
export const AuthDecorator = (user: null | string) => (Story: FC) =>
    (
        <ProvideAuth user={user}>
            <Story />
        </ProvideAuth>
    );
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth(defautUser: null | string) {
    const [user, setUser] = useState<null | string>(defautUser);
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

export const useRequireAuth = () => {
    const auth = useAuth();
    // const history = useHistory();
    // // If auth.user is falsy that means we're not logged in and should redirect.
    // useEffect(() => {
    //     if (!auth.user) {
    //         history.push(redirectUrl);
    //     }
    // }, [auth, history, redirectUrl]);
    useEffect(() => {
        if (!auth.user) {
            throw new Error('must be logged in');
        }
    }, [auth]);
    return auth;
};
