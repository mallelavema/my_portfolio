import { Project, TimelineItem, SkillCategory, Certification } from './types';

export const personalInfo = {
  name: "Vema Mallela",
  role: "Data Scientist & AI/ML Engineer",
  subroles: ["Data Analyst", "AI/ML Engineer", "Generative AI Specialist"],
  email: "mallelavema8501@gmail.com",
  phone: "+91 8501831533",
  location: "Bengaluru, India",
  github: "https://github.com/mallelavema",
  linkedin: "https://linkedin.com/in/vema-mallela",
  tagline: "Bridging the gap between raw data, predictive AI, and interactive intelligence.",
  bio: "Results-driven Data Analyst and Data Scientist with hands-on experience in machine learning, statistical modeling, exploratory data analysis (EDA), SQL querying, and business intelligence. Skilled in engineering AI-powered pipelines using LLMs, RAG, and LangChain, as well as building high-impact interactive dashboards that empower data-backed decision making.",
  stats: [
    { label: "Data Quality Improvement", value: "~30%" },
    { label: "Manual Reporting Reduction", value: "40%" },
    { label: "Prediction Accuracy achieved", value: "~85%" },
    { label: "Records Analyzed & Processed", value: "50k+" },
  ]
};

export const skillsData: SkillCategory[] = [
  {
    title: "Generative AI & LLMs",
    skills: [
      { name: "Large Language Models (LLMs)", level: 90 },
      { name: "Retrieval-Augmented Generation (RAG)", level: 92 },
      { name: "LangChain & AI Agents", level: 88 },
      { name: "Vector Databases (FAISS, Pinecone, ChromaDB)", level: 85 },
      { name: "Embeddings (OpenAI, HuggingFace)", level: 87 },
      { name: "Prompt Engineering", level: 95 }
    ]
  },
  {
    title: "Machine Learning & AI",
    skills: [
      { name: "Regression & Classification", level: 92 },
      { name: "Clustering Algorithms", level: 88 },
      { name: "Time-Series Forecasting", level: 85 },
      { name: "Feature Engineering", level: 90 },
      { name: "Model Evaluation & Tuning", level: 87 },
      { name: "Scikit-Learn & TensorFlow", level: 84 }
    ]
  },
  {
    title: "Data Visualization & BI",
    skills: [
      { name: "Power BI (DAX, Power Query)", level: 93 },
      { name: "Tableau Visualization", level: 90 },
      { name: "Matplotlib & Seaborn", level: 92 },
      { name: "Plotly Interactive Charts", level: 85 },
      { name: "Excel (Pivot Tables, Charts, Slicers)", level: 88 }
    ]
  },
  {
    title: "Core Programming & Databases",
    skills: [
      { name: "Python", level: 94 },
      { name: "SQL (Joins, Window Functions)", level: 92 },
      { name: "MySQL & SQL Server", level: 88 },
      { name: "Pandas & NumPy", level: 95 },
      { name: "Database Schema Design", level: 84 },
      { name: "Jupyter Notebook & VS Code", level: 95 }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "netflix-intelligence",
    title: "Netflix Content Intelligence Dashboard",
    date: "March 2026",
    category: "Data Visualization",
    tools: ["Tableau", "SQL", "Python", "Excel"],
    description: "Performed comprehensive exploratory data analysis on over 8,000 Netflix titles to extract acquisition and content planning insights.",
    bullets: [
      "Analyzed an extensive dataset of 8,000+ Netflix movies and TV shows using Python and SQL to identify top-performing genres across various regions and release cycles.",
      "Developed a dynamic, drill-down Tableau dashboard showcasing a 52.9% Movie to 47.1% TV Show distribution, visualizing global content acquisition trends.",
      "Successfully reduced stakeholders' manual dashboard analysis and data synthesis effort by 60% through interactive filter parameters and visual cohort tracking."
    ],
    metrics: [
      { label: "Titles Analyzed", value: "8,000+" },
      { label: "Manual Effort Saved", value: "60%" },
      { label: "Platform Distribution", value: "53% vs 47%" }
    ],
    accentColor: "#E50914" // Netflix Red
  },
  {
    id: "amazon-sales",
    title: "Amazon Sales Performance Dashboard",
    date: "February 2026",
    category: "Data Analytics",
    tools: ["Power BI", "DAX", "Power Query"],
    description: "Built a fully automated corporate KPI dashboard monitoring revenue streams, shipment metrics, and bottom-tier product performers.",
    bullets: [
      "Engineered an automated Power BI dashboard tracking crucial performance KPIs, successfully auditing $2.30M in Sales, $286.40K in Profit, and 87.03K Shipments.",
      "Replaced a tedious 3-hour manual sales-aggregation reporting workflow with an optimized 15-minute scheduled data refresh pipeline.",
      "Authored custom DAX measures and Power Query transformations to automatically highlight and isolate the bottom 20% underperforming items by geography and consumer segment."
    ],
    metrics: [
      { label: "Revenue Audited", value: "$2.30M" },
      { label: "Reporting Velocity", value: "12x Faster" },
      { label: "Manual Time Saved", value: "91%" }
    ],
    accentColor: "#FF9900" // Amazon Orange
  },
  {
    id: "healthcare-prediction",
    title: "Healthcare Data Analysis & Disease Prediction",
    date: "November 2025",
    category: "Machine Learning",
    tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "MySQL"],
    description: "Created an end-to-end data preparation, visualization, and predictive analytics framework for patient record diagnostics.",
    bullets: [
      "Conducted exploratory data analysis (EDA) across 1,200+ patient biometric profiles (spanning Age, BMI, Cholesterol, Blood Pressure, and Smoking Status) to outline leading critical risk indicators.",
      "Linked Jupyter Notebook with MySQL Workbench via mysql.connector, engineering complex time-series features (Year, Month, Day, Hour) from temporal visit logs to chart facility visitor trends.",
      "Trained classical predictive modeling classifiers using Scikit-Learn, yielding robust diagnostic risk classifications to inform proactive patient healthcare scheduling."
    ],
    metrics: [
      { label: "Biometric Profiles", value: "1,200+" },
      { label: "Feature Engineering", value: "Temporal" },
      { label: "Core Focus", value: "Risk Mitigation" }
    ],
    accentColor: "#10B981" // Health Emerald
  },
  {
    id: "genai-rag-pipeline",
    title: "AI-Powered RAG & Document Intelligence Pipeline",
    date: "January 2026",
    category: "Generative AI",
    tools: ["LLMs", "RAG", "LangChain", "ChromaDB", "Embeddings", "Python"],
    description: "Designed a production-grade semantic indexing system utilizing modern LangChain orchestration, vector embeddings, and large language models.",
    bullets: [
      "Architected a Retrieval-Augmented Generation (RAG) platform to extract, embed, and index enterprise document repositories for real-time natural language query answering.",
      "Integrated LangChain with ChromaDB vector search and OpenAI/HuggingFace embeddings, enabling contextualized answering with fully traceable source attributions.",
      "Optimized query precision by deploying advanced Prompt Engineering methodologies and AI agent self-correction feedback loops to reduce hallucinatory outputs."
    ],
    metrics: [
      { label: "Retrieval Accuracy", value: "High-Fidelity" },
      { label: "Framework", value: "LangChain" },
      { label: "Vector Database", value: "ChromaDB" }
    ],
    accentColor: "#8B5CF6" // Cyber Violet
  }
];

export const timelineData: TimelineItem[] = [
  {
    id: "exp-intern",
    title: "Data Science & AI Intern",
    companyOrInstitution: "Besant Technologies",
    location: "Bengaluru, India",
    date: "Oct 2025 – May 2026",
    type: "experience",
    bullets: [
      "Cleaned and prepared 50,000+ record datasets using Python (Pandas, NumPy) and SQL, improving overall downstream data quality by ~30% for advanced model training.",
      "Authored optimized relational database queries utilizing window functions, intricate joins, and groupings to compute live KPIs, reducing manual reporting overheads by 40%.",
      "Constructed 3+ production-grade dashboards in Power BI and Tableau tracking consumer purchasing behavior, accelerating stakeholder decision-making cycles by 2x.",
      "Applied regression and classification ML algorithms using Scikit-Learn to historical transactional trends, achieving an ~85% prediction accuracy to support business forecasting."
    ],
    iconName: "work"
  },
  {
    id: "cert-data-science",
    title: "Advanced Certification in Data Science & AI",
    companyOrInstitution: "IIT Guwahati (Electronics & ICT Academy)",
    location: "via Besant Technologies",
    date: "Oct 2025 – May 2026",
    type: "education",
    bullets: [
      "In-depth research and hands-on modules covering Predictive Modeling, Deep Learning, Generative AI, and LLMs.",
      "Collaborated on practical capstones applying modern machine learning engineering, data mining, and neural architectural patterns."
    ],
    iconName: "certification"
  },
  {
    id: "edu-btech",
    title: "B.Tech – Computer Science Engineering",
    companyOrInstitution: "St. Mary's Group of Institutions / JNTUH",
    location: "Hyderabad, India",
    date: "2020 – 2024",
    type: "education",
    bullets: [
      "Acquired a rigorous core foundation in Computer Science, focusing on Algorithms, Data Structures, Database Systems (RDBMS), and Software Engineering.",
      "Designed and developed automated data extraction and modeling utilities for academic research assignments."
    ],
    iconName: "education"
  },
  {
    id: "cert-tableau",
    title: "Tableau Data Visualization Training",
    companyOrInstitution: "Besant Technologies",
    location: "Bengaluru, India",
    date: "2025",
    type: "education",
    bullets: [
      "Certified mastery in professional business intelligence dashboard design, storytelling with data, parameter queries, and performance-tuned workbook distributions."
    ],
    iconName: "certification"
  }
];

export const certificationsData: Certification[] = [
  {
    title: "Advanced Certification in Data Science & AI",
    issuer: "IIT Guwahati & Electronics & ICT Academy (MeitY)",
    date: "May 2026"
  },
  {
    title: "Tableau Data Visualization Training",
    issuer: "Besant Technologies, Bengaluru",
    date: "2025"
  }
];

export const testimonialsData = [
  {
    name: "Dr. K. Srinivas",
    role: "Academic Advisor, JNTUH Affiliate",
    feedback: "Vema stands out as an exceptionally analytic and resourceful computer science graduate. His transition into Advanced AI and Data Science has been seamless, as evidenced by his superb grasp of both structural algorithms and statistical learning."
  },
  {
    name: "Lead BI Developer",
    role: "Besant Technologies Internship Lead",
    feedback: "Vema delivered exceptional value during his internship. He has a rare combination of strong backend SQL skills, detailed Python preparation experience, and a creative eye for BI design, making his dashboards highly interactive and visually compelling."
  },
  {
    name: "Senior Data Scientist",
    role: "Besant Technologies Mentor",
    feedback: "During his time with us, Vema automated a critical monthly sales KPI reporting structure, compressing a 3-hour lag to immediate refreshes. His predictive models are clean, modular, and extremely well-documented."
  }
];
