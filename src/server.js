// @Author: Farias-sys
// Last-update: 29/09/2022 by Farias-sys
// File description: This file is responsible to manage the server structure
// like startup, use, port and etc...

console.log("- Server Status: Startup initialized")

// Importing modules
const routes = require("./routes")

// Call the express framework
const express = require("express")
const server = express()
const cors = require('cors')
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    server.use(cors())
    next()
}) 






// Loading environment variables
require('dotenv').config()

// Call path framework
var path = require('path');

// View engine setup
server.set('views', path.join(__dirname, 'views'));
server.engine('html', require('ejs').renderFile);
server.set('view engine', 'html');

// Body parser framework

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { request } = require("http");
server.use(bodyParser.json())
server.use(cookieParser(process.env.SECRET_KEY))


// Parameters

const port = 5000
const localHost = "127.0.0.1";
let server_port = process.env.port || process.env.PORT || 5000;
let server_host = process.env.localHost || '0.0.0.0' || "18.228.10.1";



server.use(express.urlencoded({extended:true})) // See req.body
server.use(express.static("public")) // Allow static archives 
server.use(routes)



// Listen

server.listen(server_port,server_host)