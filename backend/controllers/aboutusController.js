const Aboutus = require('../models/aboutusModel')
const path = require('path');
//create new services
exports.createAboutus = async (req, res) => {
  console.log(req.body);
  try{
  const { name, info, image } = req.body; // Ensure these fields are being destructured correctly

  // Validate the fields
  if (!name || !info || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create a new service document
  const newAboutus = new Aboutus({
    name,
    info,
    image,
  });

  await newAboutus.save();
  res.status(201).json(newAboutus);
} catch (error) {
  res.status(500).json({ message: "Server Error", error: error.message });
}
};

//get all servicer
exports.getAllAboutus = async(req ,res)=>{
    try {
        const aboutus = await Aboutus.find();
        res.send(aboutus);
      } catch (error) {
        res.status(500).send(error);
      }
};

exports.getAboutus = async(req ,res)=>{
    try{
        const aboutus = await Aboutus.findById(req.params.id);
        if(!aboutus){
            return res.status(404).send('aboutus not founde');
        }
        res.send(aboutus);
    }
    catch (error){
        res.status(500).send(error);
    }
};

//update the services
exports.updateAboutus = async (req, res) => {
    const { name, info } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : req.body.img;
  
    try {
      const aboutus = await Aboutus.findByIdAndUpdate(
        req.params.id,
        { name, img: imgPath, info },
        { new: true, runValidators: true }
      );
      if (!aboutus) {
        return res.status(404).send('aboutus not found');
      }
      res.send(aboutus);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.deleteAboutus = async (req, res) => {
    try {
      const aboutus = await Aboutus.findByIdAndDelete(req.params.id);
      if (!aboutus) {
        return res.status(404).send('aboutus not found');
      }
      res.send('aboutus deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  } ;  //end of delete service