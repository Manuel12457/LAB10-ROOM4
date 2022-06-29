const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");

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

    conn.query(sql, params, (e) => {
        // if (e) throw e;

        if (e) {
            res.json({err: "ocurrió un error"});
            console.error(e);
        } else {
            let parametros = [idmascota];
            conn.query("select * from mascota where idmascota= ?",parametros, (err, resultado) => {
                if (err){

                    res.json({err: "ocurrió un error"});
                }else{
                    res.json({mensaje: "Se ha creado exitosamente la mascota con id: "+idmascota,
                        mascota_creada:resultado
                    })
                }


            });


        }

    });

});



//ACTIVIDAD 3

//ACTIVIDAD 4


app.listen(3000, () => {
    console.log("servidor corriendo");
});