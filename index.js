import express, { json } from "express";
import { PORT } from "./config.js";
import productos from "./routes/productos.js";

const app = express();

app.use(json());
app.use(function (_, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://listamandadog.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/productos", productos);

app.listen(PORT, () => {
  console.log("Servidor Funcionando");
});
