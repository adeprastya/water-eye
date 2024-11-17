require("dotenv").config();
const express = require("express");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", authMiddleware, userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
