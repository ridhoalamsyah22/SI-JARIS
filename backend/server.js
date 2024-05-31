const express        =require("express");
const cors           =require("cors");
const cookieParser   =require('cookie-parser');
const FileUpload     =require("express-fileupload");
const bodyParser     =require("body-parser");
const session        =require("express-session");
const dotenv         =require("dotenv");

//auth
const AuthRoute = require("./routes/AuthRoute.js");

//akses admin
const UserRoute = require("./routes/UserRoute.js");
const BarangRoute = require("./routes/BarangRoute.js");

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"], //berdasarkan frontend
    methods: ["POST","GET","DELETE","PUT"],
    credentials: true
}));

app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        secure: 'auto' //localhost: off
    }
}));

app.use(FileUpload());
app.use(express.static("public"));

//authentication
app.use(AuthRoute);

//akses admin
app.use(UserRoute);
app.use(BarangRoute);

const port =process.env.APP_PORT || 8000
app.listen(port, ()=>{
    console.log("Server Running....");
})