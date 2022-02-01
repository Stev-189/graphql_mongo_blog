import { Schema, model } from "mongoose";

const postSchema = new Schema({
    authorId: { 
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
},
{
    timestamps: true, //Crea dos campos: createdAt y updatedAt
})

export default model("Post", postSchema);