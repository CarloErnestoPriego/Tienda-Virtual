import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'name is required'],
        maxLength: [25, "Cant be overcome 25 characters"]
    },
    description:{
        type: String,
        required: [true, 'you need to add a description to continue']
    },
    stock:{
        type: Int32,
        required: [true, 'you need to add the stock']
    },
    category:{
        type: String,
        required: [true, 'you need to add a category']
    },
    price:{
        type: Double,
        required: [true, 'price is required']
    },
    productPicture:{
        type: String
    },
    state:{
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
        versionKey: false   //Desactiva la inclusión de un campo __v en los documentos.
    }
);

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
};

export default model('Product', productSchema);
