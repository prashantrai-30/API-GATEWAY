const express = require('express');

const router = express.Router();

const userRouter = require('./user-routes');

const { InfoController } = require('../../controllers');

const {UserMiddleware} = require('../../middleware')

router.get('/info',UserMiddleware.checkAuth,InfoController.info);

router.use('/user',userRouter);

module.exports= router;