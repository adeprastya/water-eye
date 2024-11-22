require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");

const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";

const app = express();

app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.get("/health", (req, res) => res.status(200).json({ status: "OK", timestamp: new Date() }));

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

process.on("SIGINT", () => {
	console.log("Server shutting down...");
	process.exit(0);
});
