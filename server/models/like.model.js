import mongoose from 'mongoose';

const { Schema } = mongoose;

const LikeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    objectId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Like', LikeSchema);
