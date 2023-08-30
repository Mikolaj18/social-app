import mongoose from 'mongoose';

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
        default: "",
    },
    coverPicture: {
        type: String,
        required: false,
        default: "",
    },
    work: {
        type: String,
        default: "",
    },
    school: {
        type: String,
        default: "",
    },
    from: {
        type: String,
        default: "",
    },
    livesIn: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    friends: [{
        type: String,
        ref: 'User',
    }
    ],
}, {timestamps: true});

export default mongoose.model("User", UserSchema);