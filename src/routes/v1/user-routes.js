const express = require('express');

const {UserController}= require('../../controllers');
const {UserMiddleware}= require('../../middleware');

const router = express.Router();

router.post('/signup',UserMiddleware.validateAuthRequest,UserController.signup);

router.post('/signin',UserMiddleware.validateAuthRequest,UserController.signin);

router.post('/role',UserMiddleware.checkAuth,UserMiddleware.isAdmin,UserController.addRoletoUser);

module.exports = router;