const Footer = require('../models/footerModel')
const path = require('path');
//create new services
exports.createFooter = async (req, res) => {
  console.log(req.body);
  try{
  const { name, info, image } = req.body; // Ensure these fields are being destructured correctly

  // Validate the fields
  if (!name || !info || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new service document
  const newFooter = new Footer({
    name,
    info,
    image,
  });

  await newFooter.save();
  res.status(201).json(newFooter);
} catch (error) {
  res.status(500).json({ message: "footer Error", error: error.message });
}
};

//get all servicer
exports.getAllFooter = async(req ,res)=>{
    try {
        const footer = await Footer.find();
        res.send(footer);
      } catch (error) {
        res.status(500).send(error);
      }
};

exports.getFooter = async(req ,res)=>{
    try{
        const footer = await Footer.findById(req.params.id);
        if(!footer){
            return res.status(404).send('service not founde');
        }
        res.send(footer);
    }
    catch (error){
        res.status(500).send(error);
    }
};

//update the services
exports.updateFooter = async (req, res) => {
    const { name, info } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : req.body.img;
  
    try {
      const footer = await Footer.findByIdAndUpdate(
        req.params.id,
        { name, img: imgPath, info },
        { new: true, runValidators: true }
      );
      if (!footer) {
        return res.status(404).send('Service not found');
      }
      res.send(footer);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.deleteFooter = async (req, res) => {
    try {
      const footer = await Footer.findByIdAndDelete(req.params.id);
      if (!footer) {
        return res.status(404).send('footer not found');
      }
      res.send('footer deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  } ;  //end of delete service