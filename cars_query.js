const {Car} = require('./models');

Car.create({name:'toyota', rentPrice:10, type:"type", image:"image"}).then((data)=>console.log(data))