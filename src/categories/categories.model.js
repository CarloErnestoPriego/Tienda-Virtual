import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required']
    }
})

export default model('Category', categorySchema);