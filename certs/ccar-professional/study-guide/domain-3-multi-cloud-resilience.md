# 📘 Domain 3: Multi-Cloud Deployment & Failover Resilience

**Weight**: 20% | **Exam Questions**: ~12 Questions  
**Core Competencies**: Multi-provider architecture across Anthropic Direct API, Google Cloud Vertex AI, and AWS Bedrock; quota management, feature parity disparities, cross-region active-active routing, automated graceful degradation.

---

## 1. ☁️ The Multi-Cloud Provider Triad

Enterprise architectures avoid single-vendor lock-in and mitigate regional cloud outages by designing portability across the three primary Claude distribution platforms:

```
                          ┌────────────────────────┐
                          │ Orchestration Engine   │
                          │ (Provider Abstraction) │
                          └───────────┬────────────┘
                                      │
              ┌───────────────────────┼──────────────────────┐
              ▼                       ▼                      ▼
     ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
     │ Anthropic API   │    │ Google Cloud    │    │ AWS Bedrock     │
     │ Direct Endpoint │    │ Vertex AI       │    │ Converse API    │
     └─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 2. ⚖️ Cross-Provider Feature Parity Matrix

Architects must account for subtle operational and API discrepancies across platforms:

| Feature / Metric | Anthropic Direct API | Google Cloud Vertex AI | AWS Bedrock |
|---|:---:|:---:|:---:|
| **Authentication** | `x-api-key` header | Google OAuth 2.0 / ADC / Service Accounts | AWS IAM SigV4 |
| **Enterprise Private Link** | N/A (Public HTTPS or custom tunnel) | Private Service Connect (PSC) | AWS PrivateLink |
| **Prompt Caching** | Native (`cache_control: ephemeral`) | Supported (specific regions) | Supported via Prompt Caching flags |
| **Streaming Protocol** | Native SSE (`/v1/messages`) | SSE (`predictStream`) | EventStream binary protocol / SSE |
| **SLA & Quotas** | Direct organization tiers | GCP Project Quotas / CUDs | AWS Account Quotas / Provisioned Throughput |

---

## 3. 🔄 Failover Routing Pattern

```python
async def execute_claude_request(prompt: str, tools: list):
    providers = [
        ("anthropic", call_anthropic_direct),
        ("vertex", call_vertex_ai),
        ("bedrock", call_aws_bedrock)
    ]
    
    last_error = None
    for name, provider_fn in providers:
        try:
            return await provider_fn(prompt, tools)
        except (RateLimitError, OverloadedError, TimeoutError) as e:
            logger.warning(f"Provider {name} failed: {e}. Failing over to next provider.")
            last_error = e
            continue
            
    raise RuntimeError(f"All enterprise Claude providers exhausted: {last_error}")
```
