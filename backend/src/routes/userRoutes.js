const express = require('express');
const { registerUser, loginUser, getAllUsers,createUser,deleteUser,getUserById,updateUser,resetpass,sendemail,getProfile,updateProfile } = require('../controllers/userController.js');
const { verifyToken } = require('../middlewares/verifyToken.js');


const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);
router.put("/profile", verifyToken, updateProfile);
router.get('/profile',verifyToken,getProfile)

router.post('/', createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.get('/:id', getUserById);

module.exports = router;