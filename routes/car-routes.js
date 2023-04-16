const express = require('express');
const controller = require('../controller/CarController');
const middleware = require('../middleware/middleware');
const cloudinary = require('../cloudinary');
const uploadOnMemory = require('../uploadOnMemory');

// const { displayCar } = require('../controller/CarController');
const router = express.Router();

router.get('/',controller.index);

router.get('/add', controller.add);
router.post('/doAdd',uploadOnMemory.single("image"), controller.doAdd);

router.get('/update/:id',middleware.setCar, controller.update);
router.post('/do-update/:id',uploadOnMemory.single("image"), controller.doUpdate);

router.get('/do-delete/:id',middleware.setCar,controller.doDelete);



module.exports ={
    routes: router
}