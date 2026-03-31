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

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);

// CORS — allow all origins in development
app.use(
  cors({
    origin: true,
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

// Endpoint for the client to get a CSRF token
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

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }),
);
app.use("/", routes);

module.exports = app;
