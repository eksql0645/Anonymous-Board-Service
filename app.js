const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./db");
const dotenv = require("dotenv");
// const { swaggerUi, specs } = require("./swagger/swagger");

dotenv.config();

const app = express();
app.set("port", process.env.PORT);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
