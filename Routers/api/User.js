const prisma = require('../../db/prisma');
const express = require('express');
const router = express.Router();
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

// I need to rethink the structure of the application, the necessary routers 
// and their roles in the application

router.get('/drive', async (req, res) => {
    const folders = await prisma.folder.findMany({ where: { userId: req.user.id } });
    const files = await prisma.file.findMany({ where: { userId: req.user.id } });

    res.render('drive', { user: req.user, folders, files });
    });

    // should I move this to a different router?
    router.post('/upload', upload.single('file'), async (req, res) => {

    res.json({ file: req.file, user: req.user });
})

router.get('/logout', (req, res) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;