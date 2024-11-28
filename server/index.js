const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./dbConfig/dbConnect")
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const verifyJWT = require("./middleware/verifyJWT");


app.use(cors({ credentials: true, origin: true }));
app.use(express.json())
const port = process.env.PORT || 5000;
connectDB()


app.use("/auth", authRoutes);
app.use("/api",verifyJWT, userRoutes);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
