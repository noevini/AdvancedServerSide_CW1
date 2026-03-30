const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");

const routes = require("./routes");
const swaggerSpec = require("./swagger/swagger");
const { generateToken } = require("./config/csrf");
const csrfMiddleware = require("./middleware/csrfMiddleware");

const app = express();

// Security headers — sets X-Content-Type-Options, X-Frame-Options, etc.
app.use(helmet());

// CORS — only allow requests from known origins
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// XSS sanitisation — strips HTML tags from all string fields in request body
app.use((req, res, next) => {
  const sanitise = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = obj[key].replace(/<[^>]*>/g, "").trim();
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitise(obj[key]);
      }
    }
  };
  if (req.body) sanitise(req.body);
  next();
});

// Endpoint for the client to get a CSRF token before making state-changing requests
app.get("/csrf-token", (req, res) => {
  const { secret, token } = generateToken();
  res.cookie("csrf_secret", secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ csrf_token: token });
});

// Apply CSRF protection to all routes
app.use(csrfMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", routes);

module.exports = app;
