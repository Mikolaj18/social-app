import mongoose from 'mongoose';

const { Schema } = mongoose;

const FriendRequestSchema = new Schema({
    sender: {
        type: String,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: String,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

export default mongoose.model('FriendRequest', FriendRequestSchema);
