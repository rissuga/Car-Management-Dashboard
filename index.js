const express = require('express');
const expressLayouts =  require('express-ejs-layouts');
const path = require('path');
const controller = require('./controller/CarController')
const homeRoutes = require('./routes/car-routes');
const PUBLIC_DIRECTORY = path.join(__dirname, "public");
const port = 8000;

const app = express();

// Pasang JSON parser middleware
app.use(express.json());

// Set Up view Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'app');

// Set PUBLIC_DIRECTORY sebagai static files di express
app.use(express.static(PUBLIC_DIRECTORY));

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRoutes.routes);



app.listen(port, ()=>{
    console.log("Server jalan buka http://127.0.0.1:%d", port)
})

