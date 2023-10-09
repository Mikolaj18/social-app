import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthContextProvider} from "./context/authContext.jsx";
import {DarkModeContextProvider} from "./context/darkModeContext.jsx";
import {ConversationsContextProvider} from "./context/conversationsContext.jsx";
import {SocketContextProvider} from "./context/socketContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <DarkModeContextProvider>
            <AuthContextProvider>
                <ConversationsContextProvider>
                    <SocketContextProvider>
                        <App/>
                    </SocketContextProvider>
                </ConversationsContextProvider>
            </AuthContextProvider>
        </DarkModeContextProvider>
    </React.StrictMode>,
)
