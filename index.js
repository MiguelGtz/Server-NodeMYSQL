import express, { json } from "express";
import { connection } from "./db.js";

const app = express();

app.use(json());
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post("/productos", (req, res) => {
  const data = {
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  connection.query("insert into productos set ?", data, (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

app.get("/productos", (_, res) => {
  connection.query("select * from productos", (error, filas) => {
    if (error) {
      throw error;
    } else {
      res.send(filas);
    }
  });
});

app.get("/productos/:id", (req, res) => {
  connection.query(
    "select * from productos where id = ?",
    [req.params.id],
    (error, fila) => {
      if (error) {
        throw error;
      } else {
        res.send(fila);
      }
    }
  );
});

app.put("/productos/:id", (req, res) => {
  const producto = {
    id: req.params.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  connection.query(
    "update productos set nombre = ?, precio = ? where id = ?",
    [producto.nombre, producto.precio, producto.id],
    (error, respuesta) => {
      if (error) {
        throw error;
      } else {
        res.send(respuesta);
      }
    }
  );
});

app.delete("/productos/:id", (req, res) => {
  connection.query(
    "delete from productos where id = ?",
    [req.params.id],
    (error, respuesta) => {
      if (error) {
        throw error;
      } else {
        res.send(respuesta);
      }
    }
  );
});

app.listen(9000, () => {
  console.log("Servidor Funcionando");
});
