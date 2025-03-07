import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const shoppingCartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});

export default model('ShoppingCart', shoppingCartSchema);