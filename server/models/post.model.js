import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
    author: {
        type: String,
        ref: 'User',
    },
    description: {
        type: String,
        required: false,
    },
    img: {
        type: String,
        required: false,
    },
}, { timestamps: true });

export default mongoose.model('Post', PostSchema);
