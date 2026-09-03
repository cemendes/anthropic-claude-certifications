# ⚡ Cheat Sheet: MCP Enterprise Security & Deployment

## 1. Transport Comparison
* **Local `stdio`**: Developers, local CLI (`claude`), local terminal sandboxes. Unsuitable for cloud.
* **Remote `sse`**: Containerized microservices, Kubernetes clusters, VPC networks. Multi-session multiplexing.

## 2. Production Security Checklist
* [ ] **Transport Security**: TLS 1.3 encryption on all public/internal MCP ingress.
* [ ] **Authentication**: OAuth 2.0 / JWT Bearer tokens validated at API Gateway before hitting MCP daemon.
* [ ] **Mutual TLS (mTLS)**: Enforced for zero-trust service-to-service communication.
* [ ] **Tool Authorization**: Role-Based Access Control (RBAC) mapping user identities to specific MCP tools.
* [ ] **Sandboxing**: Containerized ephemeral execution for file/shell tools with zero host filesystem access.
