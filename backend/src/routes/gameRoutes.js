const express = require('express');
const { createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,getGamesByCategoryName,searchGame } = require( '../controllers/gameController.js');

const router = express.Router();    

// CRUD routes
router.get("/search",searchGame)
router.post("/", createGame);
router.get("/", getAllGames);
router.get("/:id", getGameById);
router.put("/:id", updateGame);
router.delete("/:id", deleteGame);
router.get("/category/name/:name", getGamesByCategoryName);
module.exports=router;
