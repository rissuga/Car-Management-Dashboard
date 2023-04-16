const {Car} = require('../models');

async function index(req,res) {
  const car = await Car.findAll();

  res.render('index', {car});
}

function add(req,res){
  res.render('add');
}

async function doAdd(req,res){

  console.log('req.body', req.body);
  await Car.create(req.body);
  res.redirect('/');
}

async function doDelete(req,res){
  const ids = req.params.id
    await Car.destroy({
        where: {id : ids}
    })
  res.redirect('/');  
}



module.exports ={
  index,
  add,
  doAdd,
  doDelete
}  
