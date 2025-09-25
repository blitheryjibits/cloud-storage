const express = require('express');
const router = express.Router();

const filesRouter = require('./File');
const foldersRouter = require('./Folder');
const authRouter = require('./Auth');
const activityRouter = require('./Activity');
const shareRouter = require('./Share');
const userRouter = require('./User');

console.log('API router loaded');

router.use('/files', filesRouter);
router.use('/folders', foldersRouter);
router.use('/auth', authRouter);
router.use('/activities', activityRouter);
router.use('/shares', shareRouter);
router.use('/users', userRouter);

module.exports = router;