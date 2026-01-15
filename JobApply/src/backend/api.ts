import * as express from "express";
import type { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
const app = express.default();
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

app.post('/api/save-profile',(req: Request, res: Response) => {
    try{
        const { profile } = req.body;
        const filePath = path.join(__dirname, '../pages/options/profile.json');
        fs.writeFileSync(filePath, JSON.stringify(profile, null, 2));
        res.json({ success: true, message: 'Profile saved'});
    } catch (error) {
        res.status(500).json({ success: false, error: String(error) });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});