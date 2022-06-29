const express = require("express");
const app = express();
const mysql = require("mysql2");

const params = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "sandylance"
}

let conn = mysql.createConnection(params);

conn.connect(function(err){
    if (err) throw err;
    console.log("Conexion exitosa")
});

//ACTIVIDAD 1

//ACTIVIDAD 2

//ACTIVIDAD 3

//ACTIVIDAD 4


app.listen(3000, () => {
    console.log("servidor corriendo");
});