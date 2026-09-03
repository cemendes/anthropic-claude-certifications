import json
import os

questions_d1 = [
  {
    "id": 1001,
    "domain": 1,
    "domainName": "Enterprise Multi-Agent Swarms & Systems",
    "scenario": "An autonomous multi-agent financial auditing system occasionally experiences runaway execution when Worker Agent A (Fraud Detector) and Worker Agent B (Transaction Verifier) continuously cross-delegate follow-up queries to each other, exhausting the monthly token budget.",
    "question": "Which architectural pattern is most effective at preventing this cyclical multi-agent execution trap?",
    "options": [
      {"label": "A", "text": "Implement a centralized state coordinator that tracks a monotonic recursion depth counter and enforces an immutable step limit with a token budget circuit breaker."},
      {"label": "B", "text": "Add an instruction to each agent's system prompt stating: 'Do not talk to each other more than three times.'"},
      {"label": "C", "text": "Reduce model temperature to 0.0 on both agents."},
      {"label": "D", "text": "Merge both workers into a single monolithic prompt."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Monotonic Recursion Counters and Circuit Breakers",
    "explanation": "Autonomous swarms require hard architectural circuit breakers. Relying on prompt instructions fails when edge cases occur. A centralized state coordinator tracking monotonic execution depth and token consumption provides deterministic safeguards against infinite loops.",
    "distractorAnalysis": {
      "B": "Prompt constraints are probabilistic soft controls and cannot guarantee cycle prevention under complex edge cases.",
      "C": "Temperature 0.0 makes sampling greedy but does not stop architectural recursion loops between agents.",
      "D": "Monolithic agents lose specialized focus, experience context bloat, and increase prompt engineering fragility."
    },
    "references": [{"title": "Building Effective Agents", "url": "https://anthropic.com/engineering/building-effective-agents"}]
  },
  {
    "id": 1002,
    "domain": 1,
    "domainName": "Enterprise Multi-Agent Swarms & Systems",
    "scenario": "A high-frequency claims processing system has an Orchestrator delegating medical document extraction to three parallel Worker instances. Once completed, the raw conversational history of all workers is concatenated and passed to a downstream Approver Agent, causing context window exhaustion.",
    "question": "How should the handoff between worker instances and the Approver Agent be structured?",
    "options": [
      {"label": "A", "text": "Enforce Context Isolation: Have each worker synthesize its findings into a strictly typed, validated Pydantic schema, discarding raw conversational scratchpads before handoff."},
      {"label": "B", "text": "Switch the Approver Agent to Claude 3 Opus to double the context window."},
      {"label": "C", "text": "Store the entire raw conversation history in a shared Redis cache that all agents continuously read."},
      {"label": "D", "text": "Truncate the first 50% of tokens from each worker's message history."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Context Isolation and Structured Schema Handoff",
    "explanation": "Enterprise multi-agent architectures must enforce context isolation. Workers should discard intermediate tool scratchpads and return only validated structured artifacts (e.g. Pydantic models), preventing context bloat and hallucination propagation in downstream agents.",
    "distractorAnalysis": {
      "B": "Opus shares the same 200k token context window as Sonnet and does not eliminate context accumulation.",
      "C": "Shared raw memory exacerbates token bloat and multiplies noise across the agent fleet.",
      "D": "Arbitrary token truncation drops critical initial premises and causes corrupted schemas."
    },
    "references": [{"title": "Multi-Agent System Design", "url": "https://anthropic.com/engineering/building-effective-agents"}]
  },
  {
    "id": 1003,
    "domain": 1,
    "domainName": "Enterprise Multi-Agent Swarms & Systems",
    "scenario": "In a hospital triage system, an autonomous agent recommends high-risk drug dosage changes. Hospital policy requires dual medical practitioner approval before executing any electronic health record (EHR) mutation.",
    "question": "Where should the Human-in-the-Loop (HITL) gate be implemented in this architecture?",
    "options": [
      {"label": "A", "text": "As a deterministic escalation gate in the orchestration layer that pauses tool execution and requires signed cryptographic authorization tokens from two authorized clinicians before dispatching the EHR tool."},
      {"label": "B", "text": "In the system prompt, instructing Claude to ask the user 'Are you sure?' before outputting the tool call."},
      {"label": "C", "text": "By running an Evaluator-Optimizer loop where a second Claude model acts as the human practitioner."},
      {"label": "D", "text": "Execute the tool mutation immediately and trigger an email notification to the doctor afterwards."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Cryptographic Human-in-the-Loop Escalation Gates",
    "explanation": "High-risk mutations must be intercepted at the application orchestration layer. The model merely proposes the action; the runtime holds execution until explicit, authenticated, multi-party human approval tokens are submitted.",
    "distractorAnalysis": {
      "B": "Prompting cannot prevent unauthorized tool invocation or satisfy clinical regulatory compliance.",
      "C": "An LLM cannot legally or safely substitute for human clinical judgment.",
      "D": "Post-action alerts fail to prevent catastrophic medical harm before state changes take effect."
    },
    "references": [{"title": "Human-in-the-Loop Architectures", "url": "https://anthropic.com/engineering/building-effective-agents"}]
  },
  {
    "id": 1004,
    "domain": 1,
    "domainName": "Enterprise Multi-Agent Swarms & Systems",
    "scenario": "An enterprise risk assessment platform uses a peer-to-peer panel of 5 Claude 3.5 Sonnet instances to evaluate credit risk. Each instance reviews the application independently.",
    "question": "Which consensus mechanism provides optimal fault tolerance against stochastic variance and false negatives?",
    "options": [
      {"label": "A", "text": "Quorum-based Voting: require a minimum 3/5 majority consensus with structured rubric alignment, escalating split votes (e.g. 3-2) to a human risk officer."},
      {"label": "B", "text": "Unanimous Consensus: require all 5 instances to output identical strings, retrying indefinitely until 100% agreement is reached."},
      {"label": "C", "text": "First-to-respond wins: adopt the verdict of whichever API call finishes earliest to minimize latency."},
      {"label": "D", "text": "Average the temperature parameters across all 5 models."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Quorum-Based Agent Consensus and Split Escalation",
    "explanation": "Quorum voting (e.g. 3 of 5) balances reliability and availability. Requiring unanimity causes infinite retries on edge cases, while first-to-respond ignores consensus verification entirely.",
    "distractorAnalysis": {
      "B": "Unanimity causes excessive retries and brittle system stalls over minor semantic variations.",
      "C": "First-to-respond eliminates the verification benefit of parallel multi-instance review.",
      "D": "Averaging temperature does not constitute a consensus voting mechanism."
    },
    "references": [{"title": "Parallelization and Voting Patterns", "url": "https://anthropic.com/engineering/building-effective-agents"}]
  },
  {
    "id": 1005,
    "domain": 1,
    "domainName": "Enterprise Multi-Agent Swarms & Systems",
    "scenario": "A distributed microservice architecture deploys agents across multiple Kubernetes pods. Agent A initiates a multi-hour data migration subtask on Agent B. Network partitions occur frequently.",
    "question": "How should long-running asynchronous agent communication and state synchronization be managed?",
    "options": [
      {"label": "A", "text": "Use an event-driven message bus (e.g. Kafka / RabbitMQ) with persistent state stores (e.g. PostgreSQL) and idempotent task IDs rather than synchronous HTTP requests."},
      {"label": "B", "text": "Maintain an open synchronous HTTP connection with an 8-hour timeout socket."},
      {"label": "C", "text": "Have Agent A poll Agent B every 100 milliseconds via standard Messages API calls."},
      {"label": "D", "text": "Store conversational state in memory on the local container filesystem."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Event-Driven State Persistence for Long-Running Agents",
    "explanation": "Long-running multi-agent tasks in enterprise cloud environments must decouple via durable event streaming (Kafka/SQS) and relational state databases, enabling automatic recovery from pod restarts and network partitions.",
    "distractorAnalysis": {
      "B": "Long-lived HTTP sockets drop frequently across cloud load balancers and proxy gateways.",
      "C": "Aggressive polling wastes API quotas, burns compute, and risks rate-limit exhaustion.",
      "D": "Ephemeral container memory is permanently lost when Kubernetes reschedules or restarts pods."
    },
    "references": [{"title": "Distributed Agent Systems", "url": "https://anthropic.com/engineering/building-effective-agents"}]
  }
]

questions_d2 = [
  {
    "id": 2001,
    "domain": 2,
    "domainName": "Production MCP Architecture & Security",
    "scenario": "An enterprise development team wants to deploy Model Context Protocol (MCP) servers across their corporate Kubernetes cluster so that cloud-based agent workloads can access internal database tools.",
    "question": "Which transport protocol and authentication mechanism must be chosen for production cloud deployment?",
    "options": [
      {"label": "A", "text": "Remote MCP over Server-Sent Events (SSE) fronted by an API Gateway with OAuth 2.0 / mTLS authentication."},
      {"label": "B", "text": "Local stdio transport over SSH tunnels with hardcoded API keys."},
      {"label": "C", "text": "Unencrypted raw TCP sockets exposed directly to the public internet."},
      {"label": "D", "text": "WebSockets without authentication headers."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Remote MCP over SSE with Enterprise Authentication",
    "explanation": "In production cloud environments, MCP relies on HTTP POST + Server-Sent Events (SSE) for remote streaming. It must be secured via reverse proxies/API gateways using enterprise mTLS or OAuth 2.0 Bearer tokens.",
    "distractorAnalysis": {
      "B": "stdio is designed for local single-user process execution (like desktop CLIs) and does not scale across microservices.",
      "C": "Exposing unencrypted, unauthenticated raw TCP sockets is an egregious enterprise security violation.",
      "D": "Unauthenticated WebSockets expose internal databases to unauthorized arbitrary code execution."
    },
    "references": [{"title": "Model Context Protocol Transports", "url": "https://modelcontextprotocol.io/docs/concepts/transports"}]
  },
  {
    "id": 2002,
    "domain": 2,
    "domainName": "Production MCP Architecture & Security",
    "scenario": "An MCP server provides an 'execute_database_query' tool. A junior developer connects the tool using a database superuser account (`postgres`).",
    "question": "What is the primary architectural security vulnerability, and what is the remediation?",
    "options": [
      {"label": "A", "text": "Privilege Escalation via SQL injection; remediate by downscoping the MCP database role to read-only `SELECT` on specific views with parameterized queries and strict schema validation."},
      {"label": "B", "text": "Token limit exhaustion; remediate by switching to Claude 3.5 Haiku."},
      {"label": "C", "text": "Latency bottlenecks; remediate by adding a Redis cache."},
      {"label": "D", "text": "The architecture is secure because Claude inherently filters destructive SQL queries."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Least Privilege Principle in MCP Tool Design",
    "explanation": "LLMs can be manipulated via prompt injection to emit destructive SQL (`DROP TABLE`, `UPDATE`). MCP tools must operate under the principle of least privilege, utilizing dedicated read-only database roles with zero DDL/mutation grants.",
    "distractorAnalysis": {
      "B": "Changing model tiers does not mitigate root database credential over-privileging.",
      "C": "Caching does not prevent catastrophic unauthorized data deletion.",
      "D": "Never rely on the model's safety filters as a substitute for infrastructure-level database access controls."
    },
    "references": [{"title": "MCP Security Best Practices", "url": "https://modelcontextprotocol.io/docs/concepts/tools"}]
  },
  {
    "id": 2003,
    "domain": 2,
    "domainName": "Production MCP Architecture & Security",
    "scenario": "A multi-tenant SaaS application connects 500 concurrent customer agents to a shared remote MCP server over SSE.",
    "question": "How does the MCP server isolate tool execution state and prevent cross-tenant data leakage?",
    "options": [
      {"label": "A", "text": "By multiplexing sessions using unique cryptographic `session_id` tokens and binding tenant identity claims from the JWT to the session execution context."},
      {"label": "B", "text": "By storing all tenant queries in a single global in-memory variable."},
      {"label": "C", "text": "By spinning up 500 distinct physical server machines."},
      {"label": "D", "text": "MCP cannot support multi-tenant environments."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Session Multiplexing and Tenant Isolation in Remote MCP",
    "explanation": "Remote MCP servers over SSE support multi-tenancy by establishing distinct session identifiers (`session_id`) per client connection, validating JWT claims on each request to bind permissions strictly to the calling tenant.",
    "distractorAnalysis": {
      "B": "Global shared memory immediately causes cross-tenant data corruption and leaks.",
      "C": "Physical machine provisioning for every session is economically unviable and poorly architected.",
      "D": "MCP natively supports multi-tenant multiplexing over HTTP/SSE."
    },
    "references": [{"title": "MCP Server Architecture", "url": "https://modelcontextprotocol.io/"}]
  }
]

questions_d3 = [
  {
    "id": 3001,
    "domain": 3,
    "domainName": "Multi-Cloud Deployment & Failover Resilience",
    "scenario": "An enterprise financial application requires 99.99% availability for Claude inference. The primary endpoint is the Anthropic Direct API in US-East. During a regional cloud outage, the endpoint returns continuous HTTP 529 errors.",
    "question": "What is the recommended multi-cloud disaster recovery architecture?",
    "options": [
      {"label": "A", "text": "Implement an active-active or active-passive circuit breaker that automatically redirects traffic to Claude on Google Cloud Vertex AI or AWS Bedrock across alternative geographic regions."},
      {"label": "B", "text": "Increase client retry timeouts from 10 seconds to 3 hours and queue all customer requests in memory."},
      {"label": "C", "text": "Switch immediately to an open-source model running on a single local GPU instance."},
      {"label": "D", "text": "Hardcode an automatic rollback of the entire application to an earlier software release."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Cross-Provider Multi-Cloud Failover (Direct / Vertex / Bedrock)",
    "explanation": "Enterprise resilience mandates cross-cloud portability. Designing orchestration adapters capable of routing between Anthropic First-Party API, Google Cloud Vertex AI, and AWS Bedrock eliminates single-cloud provider outages.",
    "distractorAnalysis": {
      "B": "Queueing requests for hours during a cloud outage blows SLAs and exhausts application memory buffers.",
      "C": "A single unmanaged GPU lacks the reasoning capacity and high-throughput SLA of enterprise Claude models.",
      "D": "Rolling back application code does not resolve upstream cloud infrastructure downtime."
    },
    "references": [{"title": "Enterprise Multi-Cloud Resilience", "url": "https://docs.anthropic.com/en/docs/build-with-claude"}]
  },
  {
    "id": 3002,
    "domain": 3,
    "domainName": "Multi-Cloud Deployment & Failover Resilience",
    "scenario": "An enterprise cloud architect is migrating Claude workloads from Anthropic Direct API to Google Cloud Vertex AI to comply with corporate security standards.",
    "question": "Which networking and identity configuration satisfies enterprise zero-trust mandates on Vertex AI?",
    "options": [
      {"label": "A", "text": "Use Private Service Connect (PSC) to route traffic entirely over Google's internal private backbone, authenticating via Google Application Default Credentials (ADC) / IAM Service Accounts."},
      {"label": "B", "text": "Pass an API key string in the `Authorization` header over public internet gateways."},
      {"label": "C", "text": "Disable all firewall rules on the VPC to allow Anthropic IP ranges."},
      {"label": "D", "text": "Deploy a public web proxy on a Compute Engine VM with no authentication."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Vertex AI Private Service Connect (PSC) and IAM Auth",
    "explanation": "Vertex AI enables enterprise compliance by eliminating public internet egress via Private Service Connect (PSC) and replacing static API keys with short-lived OAuth 2.0 tokens managed by Google IAM.",
    "distractorAnalysis": {
      "B": "Static API keys over public networks violate zero-trust and corporate data exfiltration policies.",
      "C": "Disabling firewalls compromises network perimeter security.",
      "D": "Unauthenticated public proxies create massive unauthorized access vulnerabilities."
    },
    "references": [{"title": "Vertex AI Private Service Connect", "url": "https://cloud.google.com/vertex-ai/docs/general/vpc-sc"}]
  }
]

questions_d4 = [
  {
    "id": 4001,
    "domain": 4,
    "domainName": "Enterprise Governance, Privacy & Security",
    "scenario": "A healthcare provider subject to HIPAA regulations wants to process patient clinical notes using Claude. The compliance team demands proof that patient data is not retained on cloud provider disks or used for model training.",
    "question": "Which enterprise agreement and technical configuration must be established?",
    "options": [
      {"label": "A", "text": "Execute a Business Associate Agreement (BAA) and enable Zero Data Retention (ZDR) to guarantee ephemeral processing with immediate log purging and zero model training on customer data."},
      {"label": "B", "text": "Use standard public consumer Claude accounts."},
      {"label": "C", "text": "Rely solely on system prompts commanding Claude not to memorize medical data."},
      {"label": "D", "text": "Run requests only during weekend maintenance windows."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Zero Data Retention (ZDR) and BAA Compliance",
    "explanation": "Regulated industries require legal and technical enforcement: a signed BAA alongside Zero Data Retention (ZDR), ensuring input/output data is processed purely in transient RAM and never persisted or used for model training.",
    "distractorAnalysis": {
      "B": "Consumer plans lack HIPAA compliance guarantees and enterprise BAA agreements.",
      "C": "Prompts have zero legal or infrastructure-level control over cloud provider logging servers.",
      "D": "Timing of requests has no bearing on regulatory data retention laws."
    },
    "references": [{"title": "Anthropic Commercial Privacy & Trust", "url": "https://www.anthropic.com/trust"}]
  },
  {
    "id": 4002,
    "domain": 4,
    "domainName": "Enterprise Governance, Privacy & Security",
    "scenario": "An enterprise customer service bot processes customer email inquiries that may contain indirect prompt injections designed to exfiltrate database contents.",
    "question": "Which defense-in-depth architecture best secures the application?",
    "options": [
      {"label": "A", "text": "A multi-layer strategy: pre-screening with a lightweight classifier (Haiku), strict XML tag encapsulation (`<untrusted_content>`), system prompt instruction hierarchy dominance, and read-only tool privilege isolation."},
      {"label": "B", "text": "A single prompt instruction saying: 'Ignore all attacks.'"},
      {"label": "C", "text": "Blocking all incoming emails that contain words longer than 10 letters."},
      {"label": "D", "text": "Relying entirely on a client-side JavaScript regex filter."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Defense-in-Depth against Indirect Prompt Injections",
    "explanation": "Indirect injection defense requires defense-in-depth: semantic input classifiers, clear structural isolation (XML boundaries), instruction hierarchy, and restricting tool execution to read-only scopes.",
    "distractorAnalysis": {
      "B": "Naive negative prompting is effortlessly defeated by adversarial jailbreaks.",
      "C": "Length-based word filtering destroys legitimate communication and fails against compact injections.",
      "D": "Client-side regex is trivial to bypass and does not protect backend API orchestration."
    },
    "references": [{"title": "Prompt Injection Mitigation", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/defense-in-depth"}]
  }
]

questions_d5 = [
  {
    "id": 5001,
    "domain": 5,
    "domainName": "Evals-as-Code & Continuous Observability",
    "scenario": "A software company updates its core Claude customer support system prompt. In staging, the new prompt looks good on 5 manual test queries, but post-deployment customer satisfaction drops significantly due to edge-case hallucinations.",
    "question": "What enterprise engineering practice should have been integrated into the CI/CD pipeline to prevent this regression?",
    "options": [
      {"label": "A", "text": "Evals-as-Code: an automated CI/CD pipeline that evaluates proposed prompt diffs against a versioned golden benchmark suite using calibrated LLM-as-a-judge scoring with strict pass/fail quality gates."},
      {"label": "B", "text": "Deploying the prompt directly on Friday evening when traffic is lowest."},
      {"label": "C", "text": "Asking developers to vote on whether the prompt reads nicely."},
      {"label": "D", "text": "Increasing max_tokens to the highest permissible limit."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Evals-as-Code CI/CD Quality Gates",
    "explanation": "Prompts are production code. Evals-as-code treats prompt changes like code commits, executing hundreds of representative benchmark test cases evaluated by calibrated automated judges before merge approval.",
    "distractorAnalysis": {
      "B": "Deploying untested changes during low-traffic windows merely delays detection of systemic errors.",
      "C": "Subjective human reading does not statistically validate edge-case performance.",
      "D": "Increasing max_tokens does not improve accuracy or prevent behavioral regressions."
    },
    "references": [{"title": "Evaluating Prompts in Production", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts"}]
  },
  {
    "id": 5002,
    "domain": 5,
    "domainName": "Evals-as-Code & Continuous Observability",
    "scenario": "An architect is instrumenting an enterprise multi-agent workflow for observability across 20 distinct services. They need to trace token consumption, latency, and cost per user session across all agent handoffs.",
    "question": "Which standard telemetry standard and instrumentation pattern should be deployed?",
    "options": [
      {"label": "A", "text": "OpenTelemetry (OTel) with semantic conventions for GenAI, emitting distributed trace spans capturing model ID, input/output tokens, duration, and tool execution status."},
      {"label": "B", "text": "Writing print statements to local text files on each container."},
      {"label": "C", "text": "Having Claude generate an expense report at the end of every user turn."},
      {"label": "D", "text": "Relying solely on credit card statements at the end of the billing cycle."}
    ],
    "correctAnswer": "A",
    "keyConcept": "OpenTelemetry Distributed Tracing for GenAI",
    "explanation": "OpenTelemetry (OTel) is the vendor-neutral enterprise standard. Instrumenting agent orchestrators with standard GenAI semantic spans enables unified tracing across multi-cloud environments, APMs (Datadog, Dynatrace), and cost dashboards.",
    "distractorAnalysis": {
      "B": "Container-local print logs cannot trace distributed requests across microservices.",
      "C": "Using the LLM for telemetry burns tokens and is unreliable.",
      "D": "Monthly credit card bills provide zero granular real-time visibility into per-request latency or failure root causes."
    },
    "references": [{"title": "OpenTelemetry Semantic Conventions for GenAI", "url": "https://opentelemetry.io/docs/specs/semconv/gen-ai/"}]
  }
]

def format_ts(questions):
    output = "import type { Question } from '../../types';\n\nexport const questions: Question[] = [\n"
    for q in questions:
        output += "  {\n"
        output += f"    id: {q['id']},\n"
        output += f"    domain: {q['domain']},\n"
        output += f"    domainName: {repr(q['domainName'])},\n"
        output += f"    scenario: {repr(q['scenario'])},\n"
        output += f"    question: {repr(q['question'])},\n"
        output += "    options: [\n"
        for opt in q['options']:
            output += f"      {{ label: {repr(opt['label'])}, text: {repr(opt['text'])} }},\n"
        output += "    ],\n"
        output += f"    correctAnswer: {repr(q['correctAnswer'])},\n"
        output += f"    keyConcept: {repr(q['keyConcept'])},\n"
        output += f"    explanation: {repr(q['explanation'])},\n"
        output += "    distractorAnalysis: {\n"
        for k, v in q['distractorAnalysis'].items():
            output += f"      {k}: {repr(v)},\n"
        output += "    },\n"
        output += "    references: [\n"
        for ref in q['references']:
            output += f"      {{ title: {repr(ref['title'])}, url: {repr(ref['url'])} }}\n"
        output += "    ]\n"
        output += "  },\n"
    output += "];\n"
    return output

base_quiz = "/Users/eduardo/code_projects/anthropic-claude-certifications/certs/ccar-foundations/quiz/src/data/ccarp"
base_cert = "/Users/eduardo/code_projects/anthropic-claude-certifications/certs/ccar-professional/quiz"
os.makedirs(base_quiz, exist_ok=True)
os.makedirs(base_cert, exist_ok=True)

files = [
  ("questions-d1.ts", questions_d1),
  ("questions-d2.ts", questions_d2),
  ("questions-d3.ts", questions_d3),
  ("questions-d4.ts", questions_d4),
  ("questions-d5.ts", questions_d5),
]

total = 0
for filename, qlist in files:
    total += len(qlist)
    content = format_ts(qlist)
    with open(os.path.join(base_quiz, filename), "w") as f:
        f.write(content)
    with open(os.path.join(base_cert, filename), "w") as f:
        f.write(content.replace("../../types", "../types"))

print(f"Generated {total} foundational professional scenario questions for CCAR-P.")
