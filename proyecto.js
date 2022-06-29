const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");

const params = {
    host: "localhost",
    user: "percy",
    password: "percy",
    database: "sandylance"
}

let conn = mysql.createConnection(params);

conn.connect(function(err){
    if (err) throw err;
    console.log("Conexion exitosa")
});

//ACTIVIDAD 1

//ACTIVIDAD 2

app.post("/mascota/create", bodyParser.json(), (req, res) => {
    let idmascota = req.body.idmascota;
    let nombre = req.body.nombre;
    let anho = req.body.anho;
    let historia = req.body.historia;
    let observaciones = req.body.observaciones;
    let Sexo = req.body.Sexo;
    let raza_especie_idraza = req.body.raza_especie_idraza;
    let raza_otros = req.body.raza_otros;
    let cuenta_idcuenta = req.body.cuenta_idcuenta;

    let sql = "insert into mascota SET ?";
    let params = {
        idmascota: idmascota,
        nombre:nombre,
        anho: anho,
        historia: historia,
        observaciones: observaciones,
        sexo: Sexo,
        raza_especie_idraza: raza_especie_idraza,
        raza_otros: raza_otros,
        cuenta_idcuenta: cuenta_idcuenta
    };



});

//ACTIVIDAD 3
app.post('/servicio/create/:id', bodyParser.json(), function (req, res){

    let idmascota = req.params.id

    let parametros = [idmascota, req.body.cuenta_idcuenta, req.body.hora_inicio, req.body.duracion, req.body.entrega, req.body.responsable_idresponsable]
    let sql = "insert into servicio (mascota_idmascota, cuenta_idcuenta, hora_inicio, duracion, entrega, responsable_idresponsable) values (?,?,?,?,?,?)"

    conn.query(sql,parametros, function (err,result){
        if (err) throw err

        conn.query("select * from servicio order by idservicio desc", function (err, results) {
            res.json(results)
        })
    })
})

//ACTIVIDAD 4


app.listen(3000, () => {
    console.log("servidor corriendo");
});