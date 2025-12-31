const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/auth.route");
const compilerRoutes = require("./routes/compiler.route");
const codeRunnerRoutes = require("./routes/codeRunner.route");
const shareCodeRoutes = require("./routes/shareCode.route");
const languageCodeRoutes = require("./routes/languageCode.route");
const redis = require("./config/redis");
const ErrorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" || "https://code-compiler-murex.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/compiler", compilerRoutes);
app.use("/api/code-runner", codeRunnerRoutes);
app.use("/api/share", shareCodeRoutes);
app.use("/api/language-code", languageCodeRoutes);
app.use(ErrorHandler);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: "Route Not Found!",
    message: `The requested URL '${req.originalUrl}' was not found on this server.`,
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5555;

const startServer = async () => {
  try {
    await dbConnect();

    redis.on("connect", () => console.log("Redis server connected"));
    redis.on("error", (err) => console.error("Redis error:", err));

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();
