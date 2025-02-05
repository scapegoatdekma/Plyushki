import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./db.js";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

app.get("/users", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    res.send(`Текущее время в базе данных: ${rows[0].now}`);
  } catch (error) {
    console.error("Ошибка выполнения запроса:", error);
    res.status(500).send("Ошибка сервера");
  }
});
