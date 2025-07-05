import express from "express";
const router = express.Router();
import { getUsers, getUserById, createUser, updateUser } from "../controllers/users.js";
import multer from "multer";
import fs from "fs";
import { profileUploadPath } from "../config/constants.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, profileUploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', upload.single('profile_image'), createUser);
router.put('/:id', updateUser);

export default router;
