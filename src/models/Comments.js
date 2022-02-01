import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    comment:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
},{
    timestamps: true, //Crea dos campos: createdAt y updatedAt
});

export default model("Comment", commentSchema);