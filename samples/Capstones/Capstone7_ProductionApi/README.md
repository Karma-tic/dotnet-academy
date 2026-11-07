# Capstone 7: Dockerized Production-Style API

## Overview
A production-hardened ASP.NET Core API prepared for cloud deployment on Azure Container Apps or Kubernetes.

## Features
- Multi-stage Docker build producing a minimal runtime image
- Non-root user execution (\`$APP_UID\`) following OWASP container security standards
- Built-in Health Checks at \`/healthz\` (liveness) and \`/ready\` (readiness)
- Automated docker-compose orchestration

## Running with Docker
```bash
docker compose up --build
```
Verify health at: \`http://localhost:8080/healthz\`

