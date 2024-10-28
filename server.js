import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory (adjust path if necessary)
const __dirname = path.resolve(); // To resolve the directory name in ESM
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root URL "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust if your index.html is elsewhere
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});