import express from "express";
import { prisma } from "../../db/prisma.js";
import multer from "multer";
import { getBreadcrumb } from "../../utils/breadcrumbs.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// User router is used to handle user-specific views and actions
// such as viewing their drive and logging out.
// Also, it handles any overlapping routes that include both files and folders.

// Display the user's drive with root folder contents
router.get("/drive", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const rootFolder = await prisma.folder.findFirst({
    where: { name: "Root", userId: req.user.id, parentId: null },
  });
  if (!rootFolder) {
    await prisma.folder.create({
      data: { name: "Root", userId: req.user.id, parentId: null },
    });
  }
  const folders = await prisma.folder.findMany({
    where: { userId: req.user.id, parentId: null },
  });
  const files = await prisma.file.findMany({
    where: { userId: req.user.id, folderId: rootFolder.id },
  });
  const breadcrumb = [
    { id: rootFolder.id, name: "Root" }, // root is always the only crumb here
  ];

  res.render("drive", {
    user: req.user,
    folders,
    files,
    folderId: rootFolder.id,
    folderName: rootFolder.folderName,
    breadcrumb,
  });
});

// Retrieve and display selected folder's contents in the drive view
router.get("/drive/:folderId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const rootFolder = await prisma.folder.findFirst({
    where: { userId: req.user.id, parentId: null },
  });

  if (!rootFolder) {
    return res.status(500).send("Root folder missing");
  }

  const folderId = req.params.folderId;
  const folder = await prisma.folder.findUnique({
    where: { id: folderId },
  });
  const breadcrumb = await getBreadcrumb(prisma, folderId);

  if (!folder) {
    return res.redirect("/api/users/drive");
  }
  const folders = await prisma.folder.findMany({
    where: { parentId: folderId },
  });
  const files = await prisma.file.findMany({
    where: { userId: req.user.id, folderId: folderId },
  });
  res.render("drive", {
    user: req.user,
    folders,
    files,
    folderId,
    folderName: folder?.name || "Root",
    breadcrumb,
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
