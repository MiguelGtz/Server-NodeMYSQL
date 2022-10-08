import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
  const data = {
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  pool.query("insert into productos set ?", data, (error, respuesta) => {
    if (error) {
      throw error;
    } else {
      res.send(respuesta);
    }
  });
});

router.get("/", (_, res) => {
  pool.query("select * from productos", (error, filas) => {
    if (error) {
      throw error;
    } else {
      res.send(filas);
    }
  });
});

router.get("/:id", (req, res) => {
  pool.query(
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

router.put("/:id", (req, res) => {
  const producto = {
    id: req.params.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  pool.query(
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

router.delete("/:id", (req, res) => {
  pool.query(
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

export default router;
