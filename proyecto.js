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

conn.connect(function (err) {
    if (err) throw err;
    console.log("Conexion exitosa")
});

//ACTIVIDAD 1
app.get("/mascota/get/", function (req, res) {

    let sql = "select * from mascota";
    conn.query(sql, function (e, r) {
        res.json(r);
    });

});

app.get("/mascota/get/:id", function (req, res) {

    let id = req.params.id;
    console.log(isNaN(id));

    let sql = "select * from mascota where idmascota = ?";
    let parametros = [id];
    conn.query(sql, parametros, function (e, r) {
        if (isNaN(id)) {
            res.status(400).json({
                error: "Debe enviar un número"
            })
        } else {
            if (r.length == 0) {
                res.status(400).json({
                    error: "Mascota no encontrada"
                })
            } else {
                res.json(r);
            }
        }
    });

});

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
app.post('/servicio/create/:id', bodyParser.json(), function (req, res){

    let idmascota = req.params.id

    let parametros = [idmascota, req.body.cuenta_idcuenta, req.body.hora_inicio, req.body.duracion, req.body.entrega, req.body.responsable_idresponsable]
    let sql = "insert into servicio (mascota_idmascota, cuenta_idcuenta, hora_inicio, duracion, entrega, responsable_idresponsable) values (?,?,?,?,?,?)"

    conn.query(sql,parametros, function (err,result){
        if (err){
            res.status(400)
            res.json({
                err: "Error al guardar el servicio",
                msg: err.message
            })
        }

        conn.query("select * from servicio order by idservicio desc limit 1", function (err, results) {
            if (err){
                res.status(400)
                res.json({
                    err: "Error al ver el nuevo servicio",
                    msg: err.message
                })
            }


            res.json(results)
        })
    })
})

//ACTIVIDAD 4

app.get("/cuenta/get/", function (req, res) {

    let sql = "select * from cuenta";
    conn.query(sql, function (e, r) {
        res.json(r);
    });

});

app.get("/cuenta/get/:id", function (req, res) {

    let id = req.params.id;

    let sql = "select * from cuenta where idcuenta = ?";
    let parametros = [id];
    conn.query(sql, parametros, function (e, r) {
        if (isNaN(id)) {
            res.status(400).json({
                error: "Debe enviar un número"
            })
        } else {
            if (r.length == 0) {
                res.status(400).json({
                    error: "Cuenta no encontrada"
                })
            } else {
                res.json(r);
            }
        }
    });

});

app.listen(3000, () => {
    console.log("servidor corriendo");
});