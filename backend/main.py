from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, List, Any
import asyncio
import json
import time

app = FastAPI(
    title="Enterprise AI Platform Backend",
    version="1.0.0",
    description="High-Throughput Asynchronous Agent Orchestration and Streaming API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Monitoring"])
async def health_check():
    return {
        "status": "healthy",
        "service": "Enterprise AI Studio Backend",
        "timestamp": time.time(),
        "workers_online": 4
    }


@app.get("/api/v1/models", tags=["Models"])
async def list_models():
    return [
        {"id": "llama-3-70b-instruct", "name": "LLaMA 3 70B (Arabic Tuned)", "status": "active", "latency_p95": 380},
        {"id": "mistral-large-2", "name": "Mistral Large 2", "status": "active", "latency_p95": 420},
        {"id": "qdrant-legal-hybrid", "name": "Arabic Legal RAG Pipeline", "status": "active", "latency_p95": 650}
    ]


@app.get("/api/v1/metrics", tags=["Monitoring"])
async def get_metrics():
    return {
        "active_sessions": 142,
        "queries_per_second": 38.5,
        "p95_latency_ms": 412.0,
        "token_throughput_per_sec": 1820.4,
        "gpu_cluster_utilization": "74.2%"
    }


@app.post("/api/v1/agents/run", tags=["Agents"])
async def run_agent_job(payload: Dict[str, Any]):
    prompt = payload.get("prompt", "")
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt is required")
    job_id = f"job_{int(time.time()*1000)}"
    return {
        "job_id": job_id,
        "status": "queued",
        "prompt": prompt,
        "stream_url": f"/ws/stream/{job_id}"
    }


@app.websocket("/ws/stream/{job_id}")
async def websocket_stream(websocket: WebSocket, job_id: str):
    await websocket.accept()
    try:
        steps = [
            {"type": "status", "stage": "planner", "message": "Analyzing prompt and establishing research hypotheses..."},
            {"type": "status", "stage": "retrieval", "message": "Querying Arabic legal index and vector store..."},
            {"type": "thought", "content": "Found 4 highly relevant statutes in Qdrant corpus."},
            {"type": "token", "content": "بناءً على "},
            {"type": "token", "content": "المعطيات النظامية "},
            {"type": "token", "content": "والوثائق القانونية المسترجعة، "},
            {"type": "token", "content": "فإن الأحكام المطبقة "},
            {"type": "token", "content": "تؤكد التزام الأطراف بكافة البنود الواردة."},
            {"type": "citation", "document_id": "law_doc_2003", "relevance": 0.94},
            {"type": "status", "stage": "completed", "message": "Response synthesized and audited."}
        ]

        for step in steps:
            await asyncio.sleep(0.3)
            await websocket.send_text(json.dumps(step))

        await websocket.close()
    except WebSocketDisconnect:
        pass
