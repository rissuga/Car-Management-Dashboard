const {Car} = require('../models');

async function setCar(req, res, next) {
    const id = req.params.id;
    const car = await Car.findByPk(id);
    
    if (!car) {
      res.render('error-not-found');

      return;
    }
  
    req.car = car.id;
    next();
  }
  
  module.exports = {
    setCar,
  };