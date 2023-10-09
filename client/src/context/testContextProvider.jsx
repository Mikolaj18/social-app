import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {AuthContext} from "./authContext.jsx";
const queryClient = new QueryClient();

const currentUser = {
    currentUser: {
        id: 1,
        name: 'John',
        surname: 'Doe',
        email: 'johndoe@mail.com',
        profilePicture: '',
        coverPicture: '',
        work: 'teacher',
        from: 'London',
        livesIn: 'London',
        description: 'lorem ipsum',
    },
};

const ContextProvider = ({ children }) => {
    return (
        <AuthContext.Provider value={currentUser}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthContext.Provider>
    );
};
export default ContextProvider;
