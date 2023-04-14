const express = require('express');
const controller = require('../controller/CarController');

// const { displayCar } = require('../controller/CarController');
const router = express.Router();

// router.get('/', displayCar);
router.get('/',controller.handleGetCars);
router.post('/create', controller.handleCreateCar);

module.exports ={
    routes: router
}