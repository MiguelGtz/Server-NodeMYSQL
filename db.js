import { createConnection } from "mysql";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mandado",
});

connection.connect();

export { connection };
