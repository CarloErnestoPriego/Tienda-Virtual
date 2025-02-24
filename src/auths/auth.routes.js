import { Router } from 'express';
import { login, register } from './auth.controller.js'
import { registerValidator, loginValidator } from '../middlewares/validator.js';
import { uploadProfilePicture } from '../middlewares/multer-upload.js';
import { deleteFileOnError } from '../middlewares/delete-file-on-error.js';
 
const router = Router();    //Instanciamos al metodo router
 
router.post(    //Solicitud POST
    '/login',   //Ruta Login
    loginValidator,
    deleteFileOnError,
    login
);
 
router.post(
    '/register',    //Ruta Register
    uploadProfilePicture.single("profilePicture"),
    registerValidator,
    deleteFileOnError,
    register
);

export default router;  //Exportamos por default el router