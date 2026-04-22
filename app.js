// import "dotenv/config";
// const express = require("express");
// const path = require("path");

// const app = express();
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// const assetsPath = path.join(__dirname, "styles");
// app.use(express.static(assetsPath));

// // Custom Error Handler
// const errorHandler = require("./error_handler/user_errors.js");
// app.use(errorHandler);

// // flash error messages
// const flash = require("connect-flash");

// // Database sessions and Passport authentication
// const expressSession = require("express-session");
// const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
// const prisma = require("./db/prisma.js");
// const passport = require("passport");
// require("./config/passport.js");

// app.use(
//   expressSession({
//     cookie: {
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
//     },
//     secret: "a bone in the ocean",
//     resave: true,
//     saveUninitialized: true,
//     store: new PrismaSessionStore(prisma, {
//       checkPeriod: 2 * 60 * 1000,
//       dbRecordIdIsSessionId: true,
//       dbRecordIdFunction: undefined,
//     }),
//   }),
// );

// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// // Make flash messages available in all views
// app.use((req, res, next) => {
//   res.locals.error = req.flash("error");
//   next();
// });

// // Routers
// const api = require("./Routers/api/index.js");

// // Routes
// app.get("/", (req, res) => {
//   res.render("index", { user: req.user });
// });

// app.use("/api", api);

// app.listen(process.env.PORT, () => {
//   console.log("server running on port " + process.env.PORT);
// });

import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import flash from "connect-flash";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./db/prisma.js";
import passport from "passport";
import "./config/passport.js";

import errorHandler from "./error_handler/user_errors.js";
import api from "./Routers/api/index.js";

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static assets
const assetsPath = path.join(__dirname, "styles");
app.use(express.static(assetsPath));

// Custom error handler
app.use(errorHandler);

// Flash messages
app.use(flash());

// Sessions + Prisma store
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
    secret: "a bone in the ocean",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

app.use("/api", api);

// Start server
app.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});
