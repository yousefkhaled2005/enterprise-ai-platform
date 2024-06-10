from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "healthy"


def test_models():
    res = client.get("/api/v1/models")
    assert res.status_code == 200
    assert len(res.json()) >= 1


def test_agent_run():
    res = client.post("/api/v1/agents/run", json={"prompt": "Analyze labor law regulations"})
    assert res.status_code == 200
    assert "job_id" in res.json()
