const express = require('express');
const { adminMiddleware, requireSignin, userMiddleware } = require('../Common middleware');
const router = express.Router();

router.post('/cart',requireSignin,userMiddleware, require('../Controllers/Cart').createCart);
router.get('/cart', require('../Controllers/Cart').getCart);
router.get('/cart/:userId', require('../Controllers/Cart').getCartByUserID);
router.delete('/cart/:identifier',requireSignin,userMiddleware, require('../Controllers/Cart').deleteCart);
router.put('/cart/:identifier' ,requireSignin,userMiddleware, require('./../Controllers/Cart').updateCart);


module.exports = router;