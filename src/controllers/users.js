import User from "../models/users.js";
import { sendResponse, internalServerError } from "../services/jsonResponceService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            return internalServerError(res, "No users found");
        }
        return sendResponse(res, true, users, "Users retrieved successfully", 200);
    } catch (error) {
        return internalServerError(res, "Error retrieving users");
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return internalServerError(res, "User not found");
        }
        return sendResponse(res, true, user, "User retrieved successfully", 200);
    } catch (error) {
        return internalServerError(res, "Error retrieving user");
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const profile_image = req.file ? req.file.filename : "default.png";
        const user = await User.create({ name, email, password, profile_image });
        if (!user) {
            return internalServerError(res, "Error creating user");
        }
        return sendResponse(res, true, user, "User created successfully", 201);
    } catch (error) {
        return internalServerError(res, "Error creating user");
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, email, password });
        if (!user) {
            return internalServerError(res, "Error updating user");
        }
        return sendResponse(res, true, user, "User updated successfully", 200);
    } catch (error) {
        return internalServerError(res, "Error updating user");
    }
}