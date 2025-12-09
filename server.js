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
const DIST_DIR = path.join(__dirname, 'dist');

console.log('--- Server Starting ---');
console.log('Current Directory:', __dirname);
console.log('Serving Static Files from:', DIST_DIR);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve Static files from the React build (dist)
app.use(express.static(DIST_DIR));

// Helper to ensure data file exists
const ensureDataFile = async () => {
    try {
        await fs.access(DATA_FILE);
    } catch (error) {
        // Create default data if not exists
        const defaultData = {
            name: "IceAlan High School",
            motto: "Excellence. Integrity. Innovation.",
            adminPassword: "admin",
            staffPassword: "staff",
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
            pages: {
                about: {
                    title: "About IceAlan",
                    content: "IceAlan High School was founded on the principles of academic rigor and character development. Our campus, located in the heart of the city, provides a sanctuary for learning and growth.\n\nWe believe in fostering a community where every student is valued and challenged to reach their full potential.",
                    heroImage: "https://picsum.photos/1920/600?grayscale"
                },
                admissions: {
                    title: "Admissions",
                    content: "We welcome applications from students who demonstrate intellectual curiosity. Our admissions process is holistic.\n\nKey Dates:\n- Application Deadline: January 15th",
                    heroImage: "https://picsum.photos/1920/601?grayscale"
                },
                academics: {
                    title: "Academic Excellence",
                    content: "Our curriculum is designed to challenge students and prepare them for top-tier universities worldwide.",
                    heroImage: "https://picsum.photos/1920/602?grayscale"
                },
                "student-life": {
                    title: "Student Life",
                    content: "Life at IceAlan extends far beyond the classroom. With over 50 clubs and societies, there is something for everyone.",
                    heroImage: "https://picsum.photos/1920/603?grayscale"
                },
                support: {
                    title: "Support IceAlan",
                    content: "The IceAlan Annual Fund supports scholarships, facility upgrades, and faculty development.",
                    heroImage: "https://picsum.photos/1920/604?grayscale"
                }
            },
            footer: {
                aboutTitle: "About IceAlan",
                aboutText: "A prestigious institution.",
                mainMenuTitle: "Menu",
                usefulLinksTitle: "Links",
                usefulLinks: [],
                contactTitle: "Contact",
                contactAddress: "London, UK",
                contactPhone: "+44 1234 5678",
                contactEmail: "info@icealan.ac.uk"
            },
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
app.get('*', (req, res) => {
    const indexPath = path.join(DIST_DIR, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error("Error sending index.html:", err);
            res.status(500).send("Error loading application. Please ensure 'npm run build' has been run on the server.");
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});