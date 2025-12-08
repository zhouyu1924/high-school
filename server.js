import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'school_data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve Static files from the React build (dist)
app.use(express.static(path.join(__dirname, 'dist')));

// Helper to ensure data file exists
const ensureDataFile = async () => {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // Create default data if not exists
        const defaultData = {
            name: "IceAlan High School",
            motto: "Excellence. Integrity. Innovation.",
            navItems: [
                { id: '1', label: 'About', path: '/about' },
                { id: '2', label: 'Admissions', path: '/admissions' },
                { id: '3', label: 'Faculty & Staff', path: '/directory' },
                { id: '4', label: 'Academics', path: '/academics' },
                { id: '5', label: 'Student Life', path: '/student-life' },
                { id: '6', label: 'News', path: '/news' },
                { id: '7', label: 'Support', path: '/support' },
            ],
            news: [],
            events: [],
            faculty: [],
            pages: {},
            apiKey: ""
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(defaultData, null, 2));
    }
};

// --- API Routes ---

// GET School Data
app.get('/api/data', async (req, res) => {
    try {
        await ensureDataFile();
        const data = await fs.readFile(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error("Error reading data:", error);
        res.status(500).json({ error: "Failed to read data" });
    }
});

// POST (Update) School Data
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body;
        if (!newData) {
            return res.status(400).json({ error: "No data provided" });
        }
        await fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2));
        res.json({ success: true, message: "Data saved successfully" });
    } catch (error) {
        console.error("Error writing data:", error);
        res.status(500).json({ error: "Failed to save data" });
    }
});

// --- Catch-All Route for React Router (SPA) ---
// This ensures that refreshing a page like /about works by sending index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});