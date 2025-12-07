const express = require('express');
const { getWallet, addPoints } = require( '../controllers/walletController.js');

const router = express.Router();


router.get('/:userId', getWallet);


router.post('/add', addPoints);

module.exports=router;