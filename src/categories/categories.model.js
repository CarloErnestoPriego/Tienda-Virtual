import { Schema, model } from 'mongoose'

const categorySchema = new Schema({
    category: {
        type: String,
        required: [true, 'Category is required']
    }
})

categorySchema.methods.toJSON = function() {
    const { __v, _id, ...category } = this.toObject();
    category.uid = _id;
    return category;
};

export default model('Category', categorySchema);