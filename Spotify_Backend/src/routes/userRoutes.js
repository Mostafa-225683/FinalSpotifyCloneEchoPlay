import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  addLikedSong,
  removeLikedSong,
  getLikedSongs,
} from '../controllers/userController.js';

const router = express.Router();

// User Routes
router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user
router.get('/', getAllUsers); // Fetch all users
router.delete('/:id', deleteUser); // Delete a user by ID

// Liked Songs Routes
router.get('/:userId/liked-songs', getLikedSongs); // Fetch liked songs for a user
router.post('/:userId/liked-songs', addLikedSong); // Add a song to liked songs for a user
router.delete('/:userId/liked-songs/:songId', removeLikedSong); // Remove a song from liked songs for a user

export default router;
