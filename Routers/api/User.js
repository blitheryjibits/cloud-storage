const prisma = require('../../db/prisma');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

// User router is used to handle user-specific views and actions
// such as viewing their drive and logging out.
// Also, it handles any overlapping routes that include both files and folders.

router.get('/drive', async (req, res) => {
    const folders = await prisma.folder.findMany({ where: { userId: req.user.id } });
    const files = await prisma.file.findMany({ where: { userId: req.user.id } });

    res.render('drive', { user: req.user, folders, files, folderName: 'Root' });
    });

// Retrieve and display selected folder's contents in the drive view
router.get('/drive/:folderId', async (req, res) => {
  const folderId = req.params.folderId;
  const folderName = await prisma.folder.findUnique({
    where: { id: folderId },
    select: { name: true }
  });
  const folders = await prisma.folder.findMany({ where: { parentId: folderId } });
  const files = await prisma.file.findMany({ where: { userId: req.user.id, folderId: folderId } });
  res.render('drive', { user: req.user, folders, files, folderName: folderName.name || 'Root' });
});

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;