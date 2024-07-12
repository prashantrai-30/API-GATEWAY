const express = require('express');

const router = express.Router();

const userRouter = require('./user-routes');

const { InfoController } = require('../../controllers');

router.get('/info',InfoController.info);

router.use('/signup',userRouter);

module.exports= router;