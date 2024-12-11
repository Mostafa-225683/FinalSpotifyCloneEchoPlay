import User from '../models/User.js'; 

// Register a User
export const registerUser = async (req, res) => {
  console.log('Register Request:', req.body); // Log request data
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Register Error:', error.message); // Log errors
    res.status(400).json({ success: false, message: error.message });
  }
};



// Login a User
export const loginUser = async (req, res) => {
  console.log('Login Request:', req.body); // Log request data
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) throw new Error('Invalid credentials');
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Login Error:', error.message); // Log errors
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a User
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a song to the user's liked songs
export const addLikedSong = async (req, res) => {
  try {
    const { userId } = req.params;
    const song = req.body;

    if (!song || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if song is already in likedSongs
    const songExists = user.likedSongs.some((likedSong) => likedSong.id === song.id);
    if (songExists) {
      return res.status(400).json({ message: "Song already liked" });
    }

    user.likedSongs.push(song); // Add the new song to the likedSongs array
    await user.save();

    res.status(201).json(user.likedSongs); // Return updated likedSongs
  } catch (error) {
    console.error('Error adding liked song:', error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Remove a song from the user's liked songs
export const removeLikedSong = async (req, res) => {
  const { userId, songId } = req.params;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedSongs: songId } }, // Remove the song ID
      { new: true }
    );
    res.status(200).json(user.likedSongs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all liked songs of a user
export const getLikedSongs = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    res.status(200).json(user.likedSongs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
