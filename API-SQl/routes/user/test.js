const express = require('express');
const bodyPaser = require('body-parser')
const multer  = require('multer');

var objmulter = multer();
var server = express();
server.use(objmulter.any());
server.post('/',function(req,res){

    console.log(req.files);
}).listen(8080);