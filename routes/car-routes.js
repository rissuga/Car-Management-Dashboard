const express = require('express');
const controller = require('../controller/CarController');
const middleware = require('../middleware')

// const { displayCar } = require('../controller/CarController');
const router = express.Router();

router.get('/',controller.index);

router.get('/add', controller.add);
router.post('/doAdd', controller.doAdd);

router.get('/do-delete/:id',controller.doDelete);



module.exports ={
    routes: router
}