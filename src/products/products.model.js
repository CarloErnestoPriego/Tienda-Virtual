import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del producto es requerido'],
    },
    description: {
        type: String,
        required: [true, 'La descripcion del producto es requerida'],
    },
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: [true, 'Necesitas especificar una categoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio del producto es requerido'],
        min: [0, 'El precio no puede ser menor que 0']
    },
    stock: {
        type: Number,
        required: [true, 'El stock del producto es requerido'],
        min: [0, 'El stock no puede ser menor que 0']
    },
    sold: {
        type: Number,
        default: 0, 
        min: [0, 'Las ventas no pueden ser menores que 0'],
    },
    status: {
        type: Boolean,
        default: true
    }
});

productSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id;
    return product;
};

export default model('Product', productSchema);
