import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: {
        type: String,
    },
    seen: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);
