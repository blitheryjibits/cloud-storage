const express = require('express');
const router = express.Router();
const prisma = require('../../db/prisma');
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const { fetchFileById } = require('../../services/fileService');

// List all files for a specific user
router.get('/', async (req, res) => {
    const files = await prisma.file.findMany({ where: { ownerId: req.user.id } });
})

// Sends a file to the browser for viewing in a new tab or downloading depending on file type
router.get('/:id', async (req, res) => {
  fetchFileById(prisma, req.params.id)
    .then(fileData => {
      res.setHeader('Content-Type', fileData.mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${fileData.name}"`);
      res.status(200).send(fileData.data);
    })
    .catch(err => {
      console.error('Error fetching file:', err);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/upload', upload.array('files'), async (req, res) => {
   try {
    const _userId = req.user.id;
    const uploadedFiles = req.files;
    
    let rootFolder = await prisma.folder.findFirst({
      where: {
        name: "Root",
        userId: _userId,
        parentId: null
      }
    });

    if (!rootFolder) {
      rootFolder = await prisma.folder.create({
        data: {
          name: "Root",
          userId: _userId,
          parentId: null
        }
      });
    }
    
    // Map each file to a Prisma create input
    // Add files to root folder as standard behavior
  const fileData = uploadedFiles.map(file => ({
    name: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    url: `/uploads/${file.filename}`,
    data: file.buffer,
    userId: _userId,
    folderId: rootFolder.id,
    folderName: 'Root'
    }));

    // Create all records in one go
    const savedFiles = await prisma.file.createMany({
      data: fileData,
      skipDuplicates: true // optional: avoids duplicate inserts
    });

    res.redirect('/api/users/drive');
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload files' });
  }
}) // End upload route

 router.delete('/:id', async (req, res) => {
      const fileId = req.params.id;

      try {
        await prisma.file.delete({
          where: { id: fileId }
        });
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Internal Server Error');
      }
    }); // End delete route


module.exports = router;
