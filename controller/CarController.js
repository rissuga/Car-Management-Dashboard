const {Car} = require('../models');
const cloudinary = require('../cloudinary');
const middleware = require('../middleware/middleware');

async function index(req,res) {
  const message = req.flash('success');
  const error = req.flash('error');
  Car.findAll().then(car=>{
        res.render("cars/index", {
            message: message,
            data: car,
            error: error
        })
    })
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
    try{
      await Car.create({name,rentPrice,type,image: result.url})
      req.flash('success', 'Data berhasil disimpan');
      res.redirect('/');
    }catch{
      req.flash('error', 'Data tidak berhasil disimpan');
      res.redirect('/');
    }
    
  });

  // console.log('req.body', req.body);
 
}


async function update(req,res){
  const id = req.params.id;
  const car = await Car.findByPk(id);
  res.render('cars/update', {car});
}

async function doUpdate(req,res){
  console.log('req.body', req.body);

  const idCar = req.params.id;
  if(!req.file){
    await Car.update(req.body, {where: {id: idCar}});
    req.flash('success', 'Data berhasil disimpan');
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
      try{
        await Car.update({name, rentPrice, type, image: result.url}, {where:{id: idCar}});
        req.flash('success', 'Data berhasil disimpan');
        res.redirect('/');
      }catch{
        req.flash('error', 'Data tidak berhasil disimpan');
        res.redirect("/");
      }
    });
}

async function doDelete(req,res){
  const ids = req.car;
  try{
      await Car.destroy({
          where: {id : ids}
      })
    req.flash('error', 'Data berhasil dihapus');
    res.redirect('/');  
  }catch{
    req.flash('error', 'Data tidak berhasil dihapus');
    res.redirect('/');
  }
}




module.exports ={
  index,
  add,
  doAdd,
  update,
  doUpdate,
  doDelete
}  
