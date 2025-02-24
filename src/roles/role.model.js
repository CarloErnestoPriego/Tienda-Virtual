import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({    //Modelo que nos sirve para tener almacenado roles en nuestra base de datos
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

export default mongoose.model('Role', RoleSchema);