import express from "express";

import passport from "passport";
import controller from "../../controllers/authController.js";

const router = express.Router();

router.post("/register", controller.register);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/auth/profile",
    failureRedirect: "/api/auth/login",
    failureFlash: true,
  }),
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/auth/login");
  }
  res.render("profile", { user: req.user });
});

router.get("/drive", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/auth/drive");
  }
  res.render("drive", { user: req.user });
});

export default router;
