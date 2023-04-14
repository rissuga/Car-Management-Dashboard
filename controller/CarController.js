const {Car} = require('../models');

async function handleGetCars(req,res) {
  const car = await Car.findAll();

  res.render('index', {car});
}

async function handleCreateCar(req,res){
  const car = await Car.create(req.body);

  res.status(201).json(car);
}


function displayCar(req, res) {
    res.render('layout');
  }

module.exports ={
  displayCar,
  handleGetCars,
  handleCreateCar
}  
