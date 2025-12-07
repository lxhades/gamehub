const express = require('express');
const { registerUser, loginUser, getAllUsers,createUser,deleteUser,getUserById,updateUser,resetpass,sendemail } = require('../controllers/userController.js');

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
module.exports = router;