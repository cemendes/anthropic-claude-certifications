# ⚡ Cheat Sheet: Multi-Cloud Parity (Direct vs Vertex vs Bedrock)

| Architectural Capability | Anthropic Direct API | Google Cloud Vertex AI | AWS Bedrock |
|---|:---:|:---:|:---:|
| **Identity / Auth** | API Key (`x-api-key`) | GCP IAM / Service Account ADC | AWS SigV4 / IAM Roles |
| **Private Networking** | HTTPS over Internet | Private Service Connect (PSC) | AWS PrivateLink (VPC Endpoints) |
| **Native Tool Calling** | ✅ `tools` parameter | ✅ Native Claude schema | ✅ Converse API `toolConfig` |
| **Prompt Caching** | ✅ Native `cache_control` | ✅ Regional availability | ✅ Prompt Caching supported |
| **Regional Data Residency** | US / Global | EU (europe-west1), US (us-central1, etc.) | US (us-east-1, us-west-2), EU (eu-central-1) |
