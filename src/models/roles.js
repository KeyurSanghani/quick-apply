import mongoose from "mongoose";

const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Role = mongoose.model("Role", rolesSchema);