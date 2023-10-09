import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import friendsRoutes from "./routes/friend.route.js";
import postsRoutes from "./routes/post.route.js";
import commentsRoutes from "./routes/comment.route.js";
import likesRoutes from "./routes/like.route.js";
import messagesRoutes from "./routes/messages.route.js";
import conversationsRoutes from "./routes/conversations.route.js";
import {app, server} from "./socket/socket.js";

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to database.")
    } catch (error) {
        console.log(error);
    }
}

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.API_URL_CLIENT);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors({credentials: true, origin: process.env.API_URL_CLIENT}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/friends", friendsRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);
app.use("/messages", messagesRoutes);
app.use("/conversations", conversationsRoutes);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";

    return res.status(errorStatus).json(errorMessage);
});


server.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running.");
});