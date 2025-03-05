import { Schema, model } from 'mongoose';

const shoppingSchema = new Schema({
    idProducto: {

    }
})

shoppingSchema.methods.toJSON = function() {
    const { __v, _id, ...cart } = this.toObject();
    cart.uid = _id;
    return cart;
};

export default model('Cart', shoppingSchema);