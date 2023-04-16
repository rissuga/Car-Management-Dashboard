const {Car} = require('../models');
const cloudinary = require('../cloudinary');
const middleware = require('../middleware/middleware');

async function index(req,res) {
  const car = await Car.findAll();

  res.render('cars/index', {car});
}

function add(req,res){
  res.render('cars/add');
}

async function doAdd(req,res){
  console.log('req.body', req.body);
  // convert file to base64
  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, async function (err, result) {
    if (!!err) {
      console.log(err);
      return res.status(400).json({
        message: "Gagal upload file!",
      });
    }

    const {name, rentPrice, type} = req.body;
    
    const car = await Car.create({name,rentPrice,type,image: result.url});
    res.redirect('/');
  });

  // console.log('req.body', req.body);
 
}

async function doDelete(req,res){
  const ids = req.car;
    await Car.destroy({
        where: {id : ids}
    })
  res.redirect('/');  
}

async function update(req,res){
  const id = req.params.id;
  const car = await Car.findByPk(id);
  res.render('cars/update', {car});
}

async function doUpdate(req,res){
  const idCar = req.params.id;
  if(!req.file){
    await Car.update(req.body, {where: {id: idCar}})
    res.redirect("/");
    return;
  }

  const fileBase64 = req.file.buffer.toString("base64");
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    cloudinary.uploader.upload(file, async function (err, result) {
      if (!!err) {
        console.log(err);
        return res.status(400).json({
          message: "Gagal upload file!",
        });
      }

      const {name, rentPrice, type} = req.body;

      await Car.update({name, rentPrice, type, image: result.url}, {where:{id: idCar}});
      res.redirect("/");
    });
//   try{
//     const idCar = req.params.id;

//     await Car.update(req.body, {where: {id: idCar}})
//     res.redirect("/");
//   } catch(error){
//     console.log('error', error);
//   // }

// }
}




module.exports ={
  index,
  add,
  doAdd,
  update,
  doUpdate,
  doDelete
}  
