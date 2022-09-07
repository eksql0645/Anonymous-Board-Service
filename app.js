const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { sequelize } = require("./db");
const dotenv = require("dotenv");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const errorCodes = require("./codes/errorCodes");
const { swaggerUi, specs } = require("./swagger");

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api", routes);
app.use((req, res) => {
  res.status(404).json({ message: errorCodes.pageNotFound });
});
app.use(errorHandler);
module.exports = app;
