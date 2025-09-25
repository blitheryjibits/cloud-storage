const express = require('express');
const router = express.Router();
const prisma = require('../../db/prisma');
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, preservePath: true })
const { uploadFolder } = require('../../services/folderService');

router.get('/', async (req, res) => {
    const folder = await prisma.folder.findMany({
        where: { userId: req.user.id }
    })
})

router.post('/upload', upload.array('files'), async (req, res) => {
    try {
        await uploadFolder(prisma, req.user.id, req.files);
        res.redirect('/api/users/drive');
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).send('Error uploading files');
    }
})

// Define route...
router.get('/folders/:id', async (req, res) => {
    const { id } = req.params;
    const folder = await prisma.folder.findUnique({
        where: { id: Number(id), userId: req.user.id }
    })
})

// Define route...
router.put('/folders/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const folder = await prisma.folder.update({
        where: { id: Number(id), userId: req.user.id },
        data: { name }
    })
})

// Define route...
router.delete('/folders/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.folder.delete({
        where: { id: Number(id), userId: req.user.id }
    })
})

module.exports = router;
