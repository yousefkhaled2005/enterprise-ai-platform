"""
Locust Load Testing Suite for Enterprise AI Platform Backend.
Tests throughput of agent execution dispatch and model status endpoints.
"""
from locust import HttpUser, task, between


class EnterpriseAILoadTester(HttpUser):
    wait_time = between(0.2, 1.0)

    @task(4)
    def dispatch_agent_job(self):
        payload = {
            "prompt": "Analyze contract clause and verify indemnification limitations."
        }
        with self.client.post("/api/v1/agents/run", json=payload, catch_response=True) as resp:
            if resp.status_code == 200 and "job_id" in resp.json():
                resp.success()
            else:
                resp.failure(f"Failed with {resp.status_code}")

    @task(2)
    def check_metrics(self):
        self.client.get("/api/v1/metrics")

    @task(1)
    def check_models(self):
        self.client.get("/api/v1/models")
