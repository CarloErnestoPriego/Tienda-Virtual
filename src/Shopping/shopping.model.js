import { Schema, model } from 'mongoose';

const shoppingSchema = new Schema({
    idProducto: {   //id del producto
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
})

shoppingSchema.methods.toJSON = function() {
    const { __v, _id, ...cart } = this.toObject();
    cart.uid = _id;
    return cart;
};

export default model('Cart', shoppingSchema);