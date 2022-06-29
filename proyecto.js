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

    let sql = "select * from mascota where idmascota = ?";
    let parametros = [id];
    conn.query(sql, parametros, function (e, r) {
        if (r.length == 0) {
            res.json({
                error: "Mascota no encontrada"
            })
        } else {
            res.json(r);
        }
    });

});

//ACTIVIDAD 2

//ACTIVIDAD 3

//ACTIVIDAD 4


app.listen(3000, () => {
    console.log("servidor corriendo");
});