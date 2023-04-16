const express = require('express');
const expressLayouts =  require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
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

// Express flash
app.use(cookieParser('keyboard cat'));
// app.use(session({ cookie: { maxAge: 60000 }}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }));
app.use(flash());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use(homeRoutes.routes);


app.listen(port, ()=>{
    console.log("Server jalan buka http://127.0.0.1:%d", port)
})

