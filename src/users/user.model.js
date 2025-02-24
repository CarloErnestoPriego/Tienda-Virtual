import mongosee from 'mongoose';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name:{
        type: String,
        required:[true, "Name is required"],
        maxLength: [25, "Cant be overcome 25 characters"]
    },
    surname:{
        type: String,
        required : [true, "Surname is required"],
        maxLength: [25, "Cant be overcome 25 characters"]
    },
    username:{
        type : String,
        unique : true
    },
    email:{
        type: String,
        required:[true, "El correo es requerido"],
        unique:true,
    },
    password:{
        type: String,
        required:[true, "La contraseña es requerida"],
        minLength: 8
    },
    profilePicture:{
        type: String,
    },
 
    phone:{
        type: String,
        minLenght: 8,
        maxLength: 8,
        required: true,
    },

    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
    },
 
    estado: {
        type: Boolean,
        default: true,
    },

},

    {
        timestamps: true,
        versionKey: false   //Desactiva la inclusión de un campo __v en los documentos.
    }
);
 
userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject(); //Define lo que queremos descartar de la salida de datos.
    user.uid = _id;
    return user;    //Retorna al usuario sin los datos de la constante {__v, password, _id, ...user}
};
 
export default model('User', userSchema);   //Exportamos por defecto el modelo llamado 'User' 