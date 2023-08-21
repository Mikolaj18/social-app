import mongoose from 'mongoose';

const { Schema } = mongoose;

const LikeSchema = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'User',
    },
    objectId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Like', LikeSchema);
