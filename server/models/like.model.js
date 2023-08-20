import mongoose from 'mongoose';

const { Schema } = mongoose;

const LikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    objectId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model('Like', LikeSchema);
