import express from 'express';
import { register, login } from '../controllers/auth.js';
import multer from 'multer';
import { profileUploadPath, resumeUploadPath, certificatesUploadPath } from '../config/constants.js';
import { registerValidation } from '../requests/register.js';
import { loginValidation } from '../requests/login.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'profile_image') {
            cb(null, profileUploadPath);
        }
        else if (file.fieldname === 'resume') {
            cb(null, resumeUploadPath);
        }
        else if (file.fieldname === 'certificates') {
            cb(null, certificatesUploadPath);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const router = express.Router();

const upload = multer({ storage: storage });
router.post('/register', upload.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'certificates', maxCount: 10 }
]), registerValidation, register);
router.post('/login', loginValidation, login);

export default router;