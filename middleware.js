const {Car} = require('./models/car')

async function setCar(req, res, next) {
    const id = req.params.id;
    const car = await Car.findByPk(id);
    
    if (!car) {
      res.render('common/404');
  
      return;
    }
  
    req.car = car;
    next();
  }
  
  module.exports = {
    setCar,
  };