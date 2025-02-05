import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router/router.js";
import fileUpload from "express-fileupload";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("static"));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
