const Category = require('../models/categoryModel')
const path = require('path');
//create new services
exports.createCategory = async (req, res) => {
  console.log(req.body);
  try{
  const { name, info, image } = req.body; // Ensure these fields are being destructured correctly

  // Validate the fields
  if (!name || !info || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new service document
  const newCatagory = new Category({
    name,
    info,
    image,
  });

  await newCatagory.save();
  res.status(201).json(newCatagory);
} catch (error) {
  res.status(500).json({ message: "Server Error", error: error.message });
}
};

//get all servicer
exports.getAllCategory = async(req ,res)=>{
    try {
        const category = await Category.find();
        res.send(category);
      } catch (error) {
        res.status(500).send(error);
      }
};

exports.getCategory = async(req ,res)=>{
    try{
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(404).send('category not founde');
        }
        res.send(category);
    }
    catch (error){
        res.status(500).send(error);
    }
};

//update the services
exports.updateCategory = async (req, res) => {
    const { name, info } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : req.body.img;
  
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name, img: imgPath, info },
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).send('category not found');
      }
      res.send(category);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).send('category not found');
      }
      res.send('category deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  } ;  //end of delete service