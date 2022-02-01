import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Porfavor provee un correo valido"],
    },
    displayname: {
        type: String,
        required: true,
    }
},{
    timestamps: true, //Crea dos campos: createdAt y updatedAt
    versionKey: false //No muestra el campo versionKey _v
}
);

export default model("User", userSchema);

