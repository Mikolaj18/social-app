import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import {AuthContext} from "./authContext.jsx";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        const socket = io(import.meta.env.VITE_API_URL, {
            query: {
                userId: currentUser?._id,
            },
        });

        setSocket(socket);

        socket.on("getOnlineUsers", (users) => { //it comes from the socket.js line 24
            setOnlineUsers(users);
        });
        return () => socket && socket.close();

    }, [currentUser?._id]);

    return <SocketContext.Provider value={{ socket, onlineUsers}}>{children}</SocketContext.Provider>;
};