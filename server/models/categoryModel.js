const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title:{
        type: String,
        required:true,
        trim:true,
    },
    slug: {
        type: String,
        required:true, 
        trim: true
    }
})

const Category = mongoose.model('category', CategorySchema);

  module.exports = Category;