import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    author: {
        type: String,
        ref: 'User',
    },
    description: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
