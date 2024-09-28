const services = require('../models/services')

//create new services
exports.createService = async(req,res)=>{
    const { name, info } = req.body;
  const imgPath = req.file ? `/uploads/${req.file.filename}` : '';

  const service = new Service({
    name,
    img: imgPath,
    info,
  });

  try {
    await service.save();
    res.status(201).send(service);
  } catch (error) {
    res.status(400).send(error);
  }
};

//get all servicer
exports.getAllServices = async(req ,res)=>{
    try {
        const services = await Service.find();
        res.send(services);
      } catch (error) {
        res.status(500).send(error);
      }
};

exports.getService = async(req ,res)=>{
    try{
        const service = await services.findById(req.params.id);
        if(!service){
            return res.status(404).send('service not founde');
        }
        res.send(service);
    }
    catch (error){
        res.status(500).send(error);
    }
};

//update the services
exports.updateServices = async (req, res) => {
    const { name, info } = req.body;
    const imgPath = req.file ? `/uploads/${req.file.filename}` : req.body.img;
  
    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        { name, img: imgPath, info },
        { new: true, runValidators: true }
      );
      if (!service) {
        return res.status(404).send('Service not found');
      }
      res.send(service);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  exports.deleteService = async (req, res) => {
    try {
      const service = await Service.findByIdAndDelete(req.params.id);
      if (!service) {
        return res.status(404).send('Service not found');
      }
      res.send('Service deleted');
    } catch (error) {
      res.status(500).send(error);
    }
  } ;  //end of delete service