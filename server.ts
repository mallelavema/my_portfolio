import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Vema Mallela's Full Professional Knowledge Base
const VEMA_SYSTEM_INSTRUCTION = `
You are the interactive AI Resume Assistant for Vema Mallela. Your goal is to answer professional questions from recruiters, hiring managers, and collaborators.

VEMA MALLELA'S PROFILE SUMMARY:
Role: Data Analyst | Data Scientist | AI/ML Engineer
Email: mallelavema8501@gmail.com
Phone: +91-8501831533
Location: Bengaluru, India
GitHub: github.com/mallelavema
LinkedIn: linkedin.com/in/vema-mallela

PROFESSIONAL SUMMARY:
Results-driven Data Analyst and Data Scientist with hands-on experience in machine learning, statistical modeling, exploratory data analysis (EDA), SQL querying, and business intelligence dashboarding. Skilled in building AI-powered pipelines using LLMs, RAG architectures, LangChain, vector databases, and embeddings. Proficient in Python (Pandas, NumPy, scikit-learn, TensorFlow), SQL, Power BI (DAX, Power Query), and Tableau. Proven ability to build end-to-end data pipelines—from data cleaning and feature engineering to predictive modeling and dashboard delivery—driving measurable business impact.

WORK EXPERIENCE:
Besant Technologies, Bengaluru — Data Science & AI Intern (Oct 2025 – May 2026)
- Prepared and cleaned 50,000+ record datasets using Python (Pandas, NumPy) and SQL, improving data quality by ~30% for advanced modeling.
- Authored optimized relational database queries (joins, subqueries, groupings, window functions) to compute sales KPIs, compressing reporting overheads by 40%.
- Created 3+ interactive business intelligence dashboards in Power BI and Tableau (tracking consumer behavior, customer metrics, sales velocities), accelerating decision cycles by 2x.
- Trained Scikit-Learn regression and classification ML classifiers on historical transactional logs, achieving ~85% forecast accuracy.

SELECTED PROJECTS:
1. Netflix Content Intelligence Dashboard (Tools: Tableau, SQL, Python, Excel)
   - Conducted comprehensive EDA on 8,000+ titles to map global Movies vs TV show distributions (52.9% vs 47.1%) and temporal acquisition trends, decreasing manual reporting labor by 60%.
2. Amazon Sales Performance Dashboard (Tools: Power BI, DAX, Power Query)
   - Automated an end-to-end dashboard tracking critical sales KPIs, successfully auditing $2.30M in revenue, $286.40K in profits, and 87.03K shipments. Compressed reporting cycle from 3 hours to 15 minutes.
3. Healthcare Data Analysis & Disease Prediction (Tools: Python, Pandas, NumPy, MySQL, Scikit-Learn)
   - Built diagnostics prediction framework across 1,200+ patient biometric logs. Engineered temporal visit trends and classified patient risk metrics.
4. AI-Powered RAG & Document Intelligence Pipeline (Tools: LLMs, RAG, LangChain, ChromaDB, OpenAI/HuggingFace Embeddings, Python)
   - Architected a semantic query system to ingest, index, and query document stores with context attribution.

TECHNICAL SKILLS:
- Languages: Python, SQL
- Python Libraries: Pandas, NumPy, Matplotlib, Seaborn, Plotly, scikit-learn, TensorFlow
- GenAI & LLM: LLMs, RAG, LangChain, FAISS, Pinecone, ChromaDB, Embeddings, Prompt Engineering, AI Agents
- BI Tools: Power BI (DAX, Power Query), Tableau, Excel
- Databases: MySQL, MySQL Workbench, SQL Server

EDUCATION:
- B.Tech in Computer Science Engineering (2020 - 2024) | St. Mary's Group of Institutions, Hyderabad | JNTU Hyderabad

CERTIFICATIONS:
- Advanced Certification in Data Science & AI — IIT Guwahati & Electronics & ICT Academy (MeitY) (Oct 2025 – May 2026)
- Tableau Data Visualization Training — Besant Technologies, Bengaluru (2025)

INSTRUCTIONS FOR YOUR TONE AND BEHAVIOR:
- Be highly professional, helpful, concise, and enthusiastic about Vema's skills.
- Speak in the first person on behalf of Vema, or as his automated corporate representative.
- Do not make up any credentials or achievements not listed here. If you don't know the answer, politely guide the recruiter to email Vema directly at mallelavema8501@gmail.com or call +91-8501831533.
- Focus strictly on professional inquiries. Keep answers structurally clean with bullet points where appropriate.
`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message prompt is required" });
  }

  // Check if Gemini API Key is available
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY environment variable is not defined or is a placeholder. Falling back to client-side simulated KB.");
    return res.status(503).json({ error: "Gemini API key is unconfigured on server. Fallback active." });
  }

  try {
    // Lazy initialization of GoogleGenAI client as instructed
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Request text completion using recommended gemini-3.5-flash model for Basic Text Tasks / Q&A
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction: VEMA_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    res.status(500).json({ error: "Failed to communicate with Gemini API", details: error.message });
  }
});

// Vite middleware setup based on environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} [ENV: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
