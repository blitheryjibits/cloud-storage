import express from "express";
import { prisma } from "../../db/prisma.js";
import multer from "multer";
import fetchFileById from "../../services/fileService.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// List all files for a specific user
router.get("/", async (req, res) => {
  const files = await prisma.file.findMany({ where: { userId: req.user.id } });
});

// Sends a file to the browser for viewing in a new tab or downloading depending on file type
router.get("/:id", async (req, res) => {
  fetchFileById(prisma, req.params.id)
    .then((fileData) => {
      res.setHeader("Content-Type", fileData.mimeType);
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${fileData.name}"`,
      );
      res.status(200).send(fileData.data);
    })
    .catch((err) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const _userId = req.user.id;
    const uploadedFiles = req.files;
    const parentId = req.body.parentId;

    const file = await prisma.file.findFirst({
      where: { userId: _userId, folderId: parentId },
    });

    // Map each file to a Prisma create input
    // Add files to current folder as standard behavior
    const fileData = uploadedFiles.map((file) => ({
      name: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      url: `/uploads/${file.filename}`,
      data: file.buffer,
      userId: _userId,
      folderId: parentId,
      folderName: file.name,
    }));

    // Create all records in one go
    const savedFiles = await prisma.file.createMany({
      data: fileData,
      skipDuplicates: true, // optional: avoids duplicate inserts
    });

    res.redirect(`/api/users/drive/${parentId}`);
  } catch (error) {
    res.status(500).json({ error: "Failed to upload files" });
  }
}); // End upload route

router.post("/delete", async (req, res) => {
  const fileIds = req.body.fileIds;
  const folderId = req.body.folderId;

  try {
    await prisma.file.deleteMany({
      where: { id: { in: fileIds.split(",") } },
    });

    res.redirect(`/api/users/drive/${folderId}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}); // End delete route

export default router;
