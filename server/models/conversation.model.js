import mongoose from 'mongoose';

const { Schema } = mongoose;

const ConversationSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    lastMessage: {
        text: {
            type: String,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
}, { timestamps: true });

export default mongoose.model('Conversation', ConversationSchema);
