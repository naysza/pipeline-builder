# AI Pipeline Builder

A no-code AI pipeline builder where you can drag, drop and connect nodes to build AI workflows.

## Features

- **Node Abstraction** — built a BaseNode component that all nodes extend, making new nodes ~10 lines of code
- **9 Node Types** — Input, Output, LLM, Text, API Call, Conditional, Transform, Merge, Note
- **Dynamic Text Node** — type `{{variableName}}` and a new input handle appears in real time
- **Auto-resize** — Text node grows as you type
- **DAG Validation** — checks if your pipeline has any circular loops using Kahn's algorithm
- **Full Stack** — React frontend + FastAPI backend

## Tech Stack

- React + ReactFlow + Zustand (frontend)
- FastAPI + Python (backend)

## How to Run

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Backend:**
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Open `http://localhost:3000` in your browser!
