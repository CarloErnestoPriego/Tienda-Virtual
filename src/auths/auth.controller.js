import { hash, verify } from 'argon2';
import Usuario from '../users/user.model.js';
import { generarJWT } from '../helpers/generar-jwt.js';

export const login = async (req, res) => {
    
    const { email, password, username } = req.body; //Traemos los parametros { email, password, username }

    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const user = await Usuario.findOne({        
            $or: [{ email: lowerEmail }, { username: lowerUsername }]
        });

        if (!user) {    //Si el usuario no encontro el email o username ejecuta el status 400
            return res.status(400).json({
                msg: "Credenciales Incorrectas, Correo no Existente"
            })
        }

        if (!user.estado) { //Si el usuario no esta activo(Boolean: False) ejecuta el status 400
            return res.status(400).json({
                msg: "El usuario no existe en la base de datos"
            })
        }

        const validPassword = await verify(user.password, password);    //Valida la contraseña
        if (!validPassword) {
            return express.status(400).json({
                msg: "La contraseña es incorrecta"
            });
        }

        const token = await generarJWT( user.id );  //Creamos Token

        res.status(200).json({
            msg: "Inicio de Secion Exitoso",
            userDetails: {
                username: user.username,
                token: token,
                profilePicture: user.profilePicture
            }
        })

    } catch (e) {   // Ejecutar en caso de error
        console.log(e); //Muestra el error
        return res.status(500).json({   //retorna un status 500 con un mensaje y el error.
            msg: "Login Error, Comuniquese con el administrador",
            error: e.message
        })
    }
}

export const register = async (req, res) => {
    try {
        const data = req.body;

        // Asignar la imagen de perfil si existe
        let profilePicture = req.file ? req.file.filename : null;

        // Encriptar la contraseña
        const encryptedPassword = await hash(data.password);

        // Asignar un rol por defecto si no se proporciona uno
        const role = data.role || 'CLIENT_ROLE';  // Asigna CLIENT_ROLE por defecto

        // Crear el usuario
        const user = await Usuario.create({
            name: data.name,
            surname: data.surname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: encryptedPassword,
            role: role,  // Se usa el rol determinado
            profilePicture
        });

        // Respuesta exitosa
        return res.status(201).json({
            message: "User registered successfully",
            userDetails: {
                email: user.email,
                username: user.username,
                password: user.password
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "User registration failed",
            error: error.message  // Corregir el nombre del objeto de error
        });
    }
}