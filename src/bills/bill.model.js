import mongoose from 'mongoose';

const billSchema = mongoose.Schema({
    user: {

    },
    product: {

    },
    iva: {

    },
})

export default model('Bill', billSchema);