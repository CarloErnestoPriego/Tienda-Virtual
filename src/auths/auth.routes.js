import { Router } from 'express';
import { login, register } from './auth.controller.js'
import { registerValidator, loginValidator } from '../middlewares/validator.js';
import { uploadProfilePicture } from '../middlewares/multer-upload.js';
import { deleteFileonError } from '../middlewares/delete-file-on-error.js';
 
const router = Router();
 
router.post(
    '/login',
    loginValidator,
    deleteFileonError,
    login
);
 
router.post(
    '/register',
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileonError,
    register
);

export default router;