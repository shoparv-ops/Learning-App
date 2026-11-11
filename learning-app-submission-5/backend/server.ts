import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { pool } from "./db.js";

dotenv.config({ path: "backend/.env" });

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

interface LearningEntryRow extends RowDataPacket {
  id: number;
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  category: string;
}

interface CreateEntryBody {
  topic?: string;
  date?: string;
  learned?: string;
  confidence?: number;
  category?: string;
}

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// GET: return all saved learning entries from MariaDB.
app.get("/api/entries", async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query<LearningEntryRow[]>(
      `SELECT id, topic,
              DATE_FORMAT(entry_date, '%Y-%m-%d') AS date,
              learned, confidence, category
       FROM learning_entries
       ORDER BY entry_date DESC, id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error("GET /api/entries failed:", error);
    res.status(500).json({ message: "Could not load learning entries." });
  }
});

// POST: validate and save one learning entry using parameterised SQL.
app.post("/api/entries", async (req: Request<{}, {}, CreateEntryBody>, res: Response) => {
  const { topic, date, learned, confidence, category } = req.body;

  if (
    typeof topic !== "string" || !topic.trim() ||
    typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof learned !== "string" || !learned.trim() ||
    typeof category !== "string" || !category.trim() ||
    typeof confidence !== "number" || !Number.isInteger(confidence) ||
    confidence < 1 || confidence > 5
  ) {
    res.status(400).json({
      message: "Enter a topic, valid date, what you learned, a category and confidence from 1 to 5."
    });
    return;
  }

  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO learning_entries
         (topic, entry_date, learned, confidence, category)
       VALUES (?, ?, ?, ?, ?)`,
      [topic.trim(), date, learned.trim(), confidence, category.trim()]
    );

    res.status(201).json({
      id: result.insertId,
      topic: topic.trim(),
      date,
      learned: learned.trim(),
      confidence,
      category: category.trim()
    });
  } catch (error) {
    console.error("POST /api/entries failed:", error);
    res.status(500).json({ message: "Could not save the learning entry." });
  }
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});