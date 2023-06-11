const { roles } = require('../roles')
const Category = require('../models/categoryModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.category = async (req, res, next) => {
    console.log(req.body)
    try {
     const { title,slug } = req.body;
     const category = new Category({ title,slug });
     await category.save();
     res.json({
      data: category
     })
    } catch (error) {
     next(error)
    }
   }