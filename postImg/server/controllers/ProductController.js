import { pool } from "../db.js";
import * as uuid from "uuid";
import * as path from "path";

class ProductController {
  async create(req, res) {
    try {
      const file = req.files.image;
      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve("static", fileName);
      await file.mv(filePath);
      
      const { title, price } = req.body;
      console.log(req.files.image);
      const { rows } = await pool.query(
        "INSERT INTO products (title, price, image) VALUES($1, $2, $3) RETURNING *",
        [title, price, fileName]
      );
      return res.status(201).json(rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const { rows } = await pool.query("SELECT * FROM products");
      return res.status(201).json(rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getCurrent(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await pool.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
      return res.status(201).json(rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const product = req.body;
      console.log(product);
      if (!product.id) {
        res.status(400).json({ error: "ID не задан" });
      }
      const { rows } = await pool.query(
        "UPDATE products SET title = $1, price = $2 WHERE id = $3 RETURNING *",
        [product.title, product.price, product.id]
      );
      return res.status(201).json(rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { rows } = pool.query("DELETE FROM products WHERE id = $1", [id]);
      res.status(201).json({ message: "Продукт успешно удален" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
export default new ProductController();
