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

const app = express();
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
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/friends", friendsRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/likes", likesRoutes);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong";

    return res.status(errorStatus).json(errorMessage);
});


app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is running.");
});