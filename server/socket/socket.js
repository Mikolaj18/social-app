import {Server} from "socket.io";
import http from 'http';
import express from "express";
import dotenv from "dotenv";
import Message from "../models/message.model.js";

const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.API_URL_CLIENT,
        credentials: true,
        methods: ["GET", "POST", "PUT"],
    }
});

export const getRecipientSocketId = (recipientId) => userSocketMap[recipientId];

const userSocketMap = {} //userId: socketId

io.on('connection', (socket) => {
    console.log("user connected", socket.id);
    const userId = socket.handshake.query.userId;

    if(typeof userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //array of users

    socket.on("markMessagesAsSeen", async({conversationId, userId}) => {
        try {
            await Message.updateMany({conversationId: conversationId, seen: false}, {
                $set: {seen: true},
            });
            io.to(userSocketMap[userId]).emit("messagesSeen", {conversationId}); //sent to the other user
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export {io, server ,app};