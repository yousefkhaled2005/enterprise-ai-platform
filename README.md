# Enterprise AI Studio & Multi-Agent Platform

[![CI](https://github.com/yousefkhaled2005/enterprise-ai-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/yousefkhaled2005/enterprise-ai-platform)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014%20%7C%20React%2018-black.svg)](frontend/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Async%20WebSockets-teal.svg)](backend/)
[![Redis](https://img.shields.io/badge/Cache-Redis%207%20Streams-red.svg)](docker-compose.yml)
[![Locust](https://img.shields.io/badge/Load%20Tested-Locust%20P95%20%3C%20450ms-orange.svg)](tests/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

A full-stack, enterprise-grade AI Studio and Multi-Agent Playground engineered by **Yousef Khaled**. Combines a cutting-edge Next.js 14 / React 18 responsive UI with an asynchronous FastAPI streaming engine, WebSocket token streaming, Redis session management, and Locust load testing suite.

---

# Enterprise AI Studio: Full-Stack Multi-Agent Orchestration Platform

[![TypeScript](https://img.shields.io/badge/Frontend-React%20%2F%20TypeScript-3178C6.svg)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Async-009688.svg)](https://fastapi.tiangolo.com)
[![WebSockets](https://img.shields.io/badge/Realtime-WebSockets-orange.svg)](#)
[![Docker](https://img.shields.io/badge/Deployment-Docker%20Compose-2496ED.svg)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, production-ready **Full-Stack Generative AI Platform** combining an interactive **React/TypeScript** workflow dashboard with a high-throughput **FastAPI** backend. Supports real-time WebSocket token streaming, multi-agent dependency visualization, model latency analytics, and containerized microservices.

---

## 🏛️ Platform Architecture

```
+---------------------------------------------------------------------------------------+
|                                    CLIENT BROWSER                                     |
|               React 18 + TypeScript + Tailwind CSS + Lucide Icons                     |
|  +-----------------------------+ +-----------------------------+ +-----------------+  |
|  |  Live Streaming Chat UI     | |  Interactive Agent Graph    | | Latency Metrics |  |
|  +-----------------------------+ +-----------------------------+ +-----------------+  |
+-------------------------------------------+-------------------------------------------+
                                            |
                         HTTP REST & WebSocket (ws://)
                                            |
                                            v
+---------------------------------------------------------------------------------------+
|                               FASTAPI ASYNC BACKEND                                   |
|  - CORS & JWT Security Middleware                                                     |
|  - WebSocket Streaming Connection Manager                                             |
|  - Async Background Task Orchestrator (Celery / In-memory queue)                      |
|                                                                                       |
|  +--------------------------+  +--------------------------+  +---------------------+  |
|  | /api/v1/agents/execute   |  | /api/v1/models/status    |  | /ws/stream/{task_id}|  |
|  +--------------------------+  +--------------------------+  +---------------------+  |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v
+---------------------------------------------------------------------------------------+
|                                 SERVICES & STORAGE                                    |
|  - Redis Cache & PubSub Broker                                                        |
|  - Vector Store Connector (Qdrant / Milvus)                                           |
|  - High-Throughput Inference Clustered Endpoints (vLLM / OpenAI / Anthropic)          |
+---------------------------------------------------------------------------------------+
```

---

## ✨ Key Features

- **Full-Stack End-to-End**: Modern React frontend coupled with an asynchronous Python FastAPI backend.
- **Real-Time Streaming**: True bidirectional WebSocket streaming for token generation, intermediate agent thoughts, and tool execution logs.
- **Multi-Agent Visualizer**: Displays the execution state of autonomous agents (Planner, Researcher, Synthesizer, Auditor) in real time.
- **Enterprise Observability**: Built-in dashboards for Time-To-First-Token (TTFT), tokens-per-second, and API health percentiles.
- **Docker Compose Ready**: One command (`docker compose up --build`) launches the complete frontend, backend, and Redis services.

---

## 🚀 Quick Start (Production via Docker Compose)

```bash
git clone https://github.com/yousefkhaled2005/enterprise-ai-platform.git
cd enterprise-ai-platform

docker compose up --build -d
```

- **Frontend Application**: `http://localhost:3000`
- **Backend API & Swagger Docs**: `http://localhost:8000/docs`
- **WebSocket Endpoint**: `ws://localhost:8000/ws/stream`

---

## 💻 Local Development Setup

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# Linux / macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|:---|:---|:---|
| `GET` | `/health` | Cluster and Redis health status |
| `POST` | `/api/v1/agents/run` | Dispatches asynchronous multi-agent job |
| `GET` | `/api/v1/models` | Lists available LLM models & latencies |
| `GET` | `/api/v1/metrics` | System throughput and memory usage |
| `WS` | `/ws/stream/{job_id}` | Real-time WebSocket token & log streaming |

---

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Yousef Khaled**  
Senior AI Systems Architect  
- GitHub: [@yousefkhaled2005](https://github.com/yousefkhaled2005)
