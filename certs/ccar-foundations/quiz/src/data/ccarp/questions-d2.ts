import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 2001,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise development team wants to deploy Model Context Protocol (MCP) servers across their corporate Kubernetes cluster so that cloud-based agent workloads can access internal database tools.',
    question: 'Which transport protocol and authentication mechanism must be chosen for production cloud deployment?',
    options: [
      { label: 'A', text: 'Remote MCP over Server-Sent Events (SSE) fronted by an API Gateway with OAuth 2.0 / mTLS authentication.' },
      { label: 'B', text: 'Local stdio transport over SSH tunnels with hardcoded API keys.' },
      { label: 'C', text: 'Unencrypted raw TCP sockets exposed directly to the public internet.' },
      { label: 'D', text: 'WebSockets without authentication headers.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Remote MCP over SSE with Enterprise Authentication',
    explanation: 'In production cloud environments, MCP relies on HTTP POST + Server-Sent Events (SSE) for remote streaming. It must be secured via reverse proxies/API gateways using enterprise mTLS or OAuth 2.0 Bearer tokens.',
    distractorAnalysis: {
      B: 'stdio is designed for local single-user process execution (like desktop CLIs) and does not scale across microservices.',
      C: 'Exposing unencrypted, unauthenticated raw TCP sockets is an egregious enterprise security violation.',
      D: 'Unauthenticated WebSockets expose internal databases to unauthorized arbitrary code execution.',
    },
    references: [
      { title: 'Model Context Protocol Transports', url: 'https://modelcontextprotocol.io/docs/concepts/transports' }
    ]
  },
  {
    id: 2002,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: "An MCP server provides an 'execute_database_query' tool. A junior developer connects the tool using a database superuser account (`postgres`).",
    question: 'What is the primary architectural security vulnerability, and what is the remediation?',
    options: [
      { label: 'A', text: 'Privilege Escalation via SQL injection; remediate by downscoping the MCP database role to read-only `SELECT` on specific views with parameterized queries and strict schema validation.' },
      { label: 'B', text: 'Token limit exhaustion; remediate by switching to Claude 3.5 Haiku.' },
      { label: 'C', text: 'Latency bottlenecks; remediate by adding a Redis cache.' },
      { label: 'D', text: 'The architecture is secure because Claude inherently filters destructive SQL queries.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Least Privilege Principle in MCP Tool Design',
    explanation: 'LLMs can be manipulated via prompt injection to emit destructive SQL (`DROP TABLE`, `UPDATE`). MCP tools must operate under the principle of least privilege, utilizing dedicated read-only database roles with zero DDL/mutation grants.',
    distractorAnalysis: {
      B: 'Changing model tiers does not mitigate root database credential over-privileging.',
      C: 'Caching does not prevent catastrophic unauthorized data deletion.',
      D: "Never rely on the model's safety filters as a substitute for infrastructure-level database access controls.",
    },
    references: [
      { title: 'MCP Security Best Practices', url: 'https://modelcontextprotocol.io/docs/concepts/tools' }
    ]
  },
  {
    id: 2003,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'A multi-tenant SaaS application connects 500 concurrent customer agents to a shared remote MCP server over SSE.',
    question: 'How does the MCP server isolate tool execution state and prevent cross-tenant data leakage?',
    options: [
      { label: 'A', text: 'By multiplexing sessions using unique cryptographic `session_id` tokens and binding tenant identity claims from the JWT to the session execution context.' },
      { label: 'B', text: 'By storing all tenant queries in a single global in-memory variable.' },
      { label: 'C', text: 'By spinning up 500 distinct physical server machines.' },
      { label: 'D', text: 'MCP cannot support multi-tenant environments.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Session Multiplexing and Tenant Isolation in Remote MCP',
    explanation: 'Remote MCP servers over SSE support multi-tenancy by establishing distinct session identifiers (`session_id`) per client connection, validating JWT claims on each request to bind permissions strictly to the calling tenant.',
    distractorAnalysis: {
      B: 'Global shared memory immediately causes cross-tenant data corruption and leaks.',
      C: 'Physical machine provisioning for every session is economically unviable and poorly architected.',
      D: 'MCP natively supports multi-tenant multiplexing over HTTP/SSE.',
    },
    references: [
      { title: 'MCP Server Architecture', url: 'https://modelcontextprotocol.io/' }
    ]
  },
  {
    id: 2004,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise architecture team is designing an MCP server to provide customer support agents with access to a CRM. The CRM contains both public customer directory data and confidential billing records.',
    question: 'How should MCP tool schemas and capabilities be structured to adhere to the Principle of Least Privilege?',
    options: [
      { label: 'A', text: 'Partition capabilities into granular, task-specific tools with strict JSON schemas and scoped database views, rather than offering a generic, multi-purpose database query tool.' },
      { label: 'B', text: 'Provide a single `crm_admin_exec` tool that accepts raw shell commands and prompt Claude not to run dangerous commands.' },
      { label: 'C', text: 'Expose the entire REST API of the CRM as a single monolithic JSON string parameter.' },
      { label: 'D', text: 'Remove input validation schemas entirely to give Claude maximum flexibility in formatting queries.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Granular Tool Scoping vs Generic Execution',
    explanation: "In production MCP architectures, exposing generic 'execute' tools creates severe security risks. Best practice requires authoring tightly scoped tools (e.g., `lookup_customer_by_id`) with strict JSON schema constraints and least-privilege backend access.",
    distractorAnalysis: {
      B: 'Shell command tools provide attackers with trivial Remote Code Execution (RCE) via prompt injection.',
      C: 'Monolithic generic endpoints bypass schema verification and overload model reasoning.',
      D: 'Omitting input schemas eliminates runtime type safety and causes frequent parameter failures.',
    },
    references: [
      { title: 'Model Context Protocol Tool Concepts', url: 'https://modelcontextprotocol.io/docs/concepts/tools' }
    ]
  },
  {
    id: 2005,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An MCP server encounters an internal database timeout while executing a tool call requested by an enterprise agent.',
    question: 'According to the MCP protocol specification, how must the server return this tool failure to the client?',
    options: [
      { label: 'A', text: 'Return a tool response object containing `isError: true` alongside descriptive text content explaining the failure, rather than crashing the protocol connection with an RPC transport error.' },
      { label: 'B', text: 'Abruptly terminate the TCP socket and emit an unformatted HTTP 500 error code.' },
      { label: 'C', text: 'Return an empty string and fake a successful result to prevent error logs.' },
      { label: 'D', text: 'Crash the container process immediately to force Kubernetes to restart the pod.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'MCP Tool Error Handling with isError Flag',
    explanation: 'The MCP specification explicitly distinguishes between protocol/transport failures and tool execution errors. Tool execution failures must be reported within the protocol payload with `isError: true` and informative text content so the LLM can observe and recover.',
    distractorAnalysis: {
      B: 'Dropping the transport socket disconnects the MCP client session and aborts the entire agent conversation.',
      C: 'Faking success corrupts downstream reasoning and leads to silent failure modes.',
      D: 'Crashing containers for predictable application timeouts destroys service availability and scalability.',
    },
    references: [
      { title: 'MCP Tool Error Specification', url: 'https://modelcontextprotocol.io/docs/concepts/tools' }
    ]
  },
  {
    id: 2006,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'A financial institution deploys an MCP server that provides access to market data feeds. During market open, 100 autonomous agent instances barrage the MCP server with 2,000 tool calls per second.',
    question: 'What protective controls should be placed at the MCP gateway layer to prevent upstream API exhaustion and Denial of Service (DoS)?',
    options: [
      { label: 'A', text: 'Deploy an API Gateway with token bucket rate limiting per agent session, centralized caching for read-only responses, and request queueing with concurrency throttling.' },
      { label: 'B', text: "Rely on Claude's internal prompt reasoning to self-throttle request velocity to 5 requests per second." },
      { label: 'C', text: 'Disable the MCP server entirely during peak market trading hours.' },
      { label: 'D', text: 'Instruct all agents to wait a hardcoded 10 seconds between every message turn.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'MCP Gateway Rate Limiting and Concurrency Throttling',
    explanation: 'Production MCP servers must be shielded by robust gateway middleware. Token bucket rate limiters, response caching for idempotent queries, and bounded concurrency queues prevent backend services from being overwhelmed by parallel swarms.',
    distractorAnalysis: {
      B: 'LLMs lack real-time clock tracking and cannot autonomously throttle their own execution rates.',
      C: 'Disabling systems during peak business hours defeats the core purpose of automation.',
      D: 'Hardcoded client sleeps introduce unacceptable UX latency during normal traffic and do not prevent aggregate fleet spikes.',
    },
    references: [
      { title: 'Production Gateway Architecture for MCP', url: 'https://modelcontextprotocol.io/' }
    ]
  },
  {
    id: 2007,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise is planning an MCP deployment. A senior security engineer flags that third-party MCP servers might modify resources without human consent or exfiltrate private files.',
    question: 'Which MCP architectural mechanism empowers client hosts to restrict and inspect server capabilities?',
    options: [
      { label: 'A', text: 'MCP client-side capability negotiation and sampling controls, combined with mandatory human approval prompts for tools marked with side-effects or state-mutating operations.' },
      { label: 'B', text: "Blindly approving all tools registered in the server's `tools/list` response." },
      { label: 'C', text: 'Encrypting the source code of the MCP server with proprietary DRM software.' },
      { label: 'D', text: 'Forbidding all MCP tools from returning text longer than 20 characters.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Client-Side Capability Negotiation and User Approval Gates',
    explanation: 'The MCP architecture grants the host/client ultimate authority. During initialization, clients negotiate capabilities and can enforce client-side policies (e.g., prompting users for confirmation before invoking destructive tools or filtering resource subscriptions).',
    distractorAnalysis: {
      B: 'Unconditional trust of remote tool catalogs exposes systems to malicious prompt injections and unauthorized data modification.',
      C: 'DRM obfuscation does not protect runtime network boundaries or prevent malicious execution.',
      D: 'Arbitrary character limits break legitimate tool outputs without providing security guarantees.',
    },
    references: [
      { title: 'MCP Architecture and Security', url: 'https://modelcontextprotocol.io/docs/concepts/architecture' }
    ]
  },
  {
    id: 2008,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An MCP server running in an enterprise cloud environment needs to provide agents with real-time notifications when a database record is modified by an external system.',
    question: 'Which native MCP protocol feature enables servers to alert connected clients of resource state changes?',
    options: [
      { label: 'A', text: 'MCP Resource Subscriptions: clients subscribe to specific resource URIs, and the server emits `notifications/resources/updated` events over the established SSE connection.' },
      { label: 'B', text: "Having the client invoke an LLM prompt every 500 milliseconds asking 'Has anything changed?'." },
      { label: 'C', text: "Sending SMS text messages to the system administrator's mobile device." },
      { label: 'D', text: 'Re-initializing the entire MCP handshake and re-authenticating from scratch.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'MCP Resource Subscriptions and Real-Time Notifications',
    explanation: 'MCP natively supports reactive updates through Resource Subscriptions. Clients subscribe to resource URIs (e.g., `postgres://orders/123`), and the server asynchronously pushes `notifications/resources/updated` notifications over SSE without polling.',
    distractorAnalysis: {
      B: 'Continuous LLM prompt polling generates massive API bills, burns rate limits, and wastes compute.',
      C: 'SMS alerts are out-of-band human notifications and do not interface with agent runtime protocols.',
      D: 'Session teardown and renegotiation adds severe overhead and interrupts ongoing conversations.',
    },
    references: [
      { title: 'MCP Resources and Notifications', url: 'https://modelcontextprotocol.io/docs/concepts/resources' }
    ]
  },
  {
    id: 2009,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise development team is authoring custom MCP tools using the TypeScript SDK. When testing, the agent frequently passes malformed date strings and missing IDs to the tools.',
    question: 'How should tool input schemas be defined in MCP to ensure compile-time and runtime validation?',
    options: [
      { label: 'A', text: 'Define input schemas using Zod or JSON Schema with explicit types, regex format patterns, required fields, and clear parameter descriptions that guide model argument generation.' },
      { label: 'B', text: "Leave inputSchema as `{ type: 'object' }` with no property definitions so Claude can guess freely." },
      { label: 'C', text: 'Rely exclusively on backend SQL database exceptions to catch invalid formats.' },
      { label: 'D', text: 'Hardcode all tool parameters as raw strings and parse them with custom split functions.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Strict JSON Schema and Zod Validation for MCP Tools',
    explanation: 'MCP tools rely on JSON Schema (often declared via libraries like Zod) for contract validation. Explicit property types, required field lists, format constraints, and semantic descriptions allow Claude to construct accurate arguments and prevent malformed invocations.',
    distractorAnalysis: {
      B: 'Empty schemas give the model zero guidance on required keys or formats, causing frequent hallucinations and runtime failures.',
      C: 'Database exceptions generate cryptic errors that confuse the model and pollute conversation logs.',
      D: 'Unstructured string splitting is fragile, prone to injection, and ignores standard JSON schema typing.',
    },
    references: [
      { title: 'MCP Tool Schema Definition', url: 'https://modelcontextprotocol.io/docs/concepts/tools' }
    ]
  },
  {
    id: 2010,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise security audit discovers that an internally developed MCP server logs raw tool inputs and outputs to an unencrypted centralized ElasticSearch cluster, exposing customer PII.',
    question: 'Which data sanitation architecture must be implemented within the MCP server lifecycle?',
    options: [
      { label: 'A', text: 'Implement logging interceptors/middleware that redact sensitive fields (SSNs, credit cards, tokens) using tokenization or hashing before writing audit logs to storage.' },
      { label: 'B', text: 'Disable all system logging and audit trails entirely across the infrastructure.' },
      { label: 'C', text: 'Instruct Claude in the system prompt to never output real names or numbers.' },
      { label: 'D', text: 'Only redact logs once every 90 days via an asynchronous cron job.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'MCP Middleware Interceptors for Audit Log Redaction',
    explanation: 'Enterprise compliance requires that all MCP tool invocations undergo deterministic sanitization. Logging middleware must intercept tool inputs/outputs and mask or tokenize PII before persisting audit records.',
    distractorAnalysis: {
      B: 'Disabling logging violates SOC 2, ISO 27001, and HIPAA compliance mandates for auditability.',
      C: 'Prompt-level instructions are probabilistic and fail to guarantee PII scrubbing across tool payloads.',
      D: 'Delayed quarterly batch scrubbing leaves PII exposed in raw log stores for up to 90 days.',
    },
    references: [
      { title: 'MCP Security and Compliance', url: 'https://modelcontextprotocol.io/' }
    ]
  },
  {
    id: 2011,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise wants to allow Claude running on employee workstations (Claude Desktop) to access sensitive on-premises engineering documentation via a central internal MCP server.',
    question: 'What network topology and authentication configuration securely bridges the local desktop client to the internal corporate MCP server?',
    options: [
      { label: 'A', text: 'Expose the MCP server via an Enterprise Reverse Proxy with Mutual TLS (mTLS) or Corporate SSO (OAuth 2.0 / OIDC) over an encrypted SSE connection, terminating at an internal VPC.' },
      { label: 'B', text: 'Port-forward unencrypted TCP port 8080 over the public internet with no password.' },
      { label: 'C', text: "Email copies of the documentation database directly to each employee's personal laptop." },
      { label: 'D', text: 'Configure the desktop client to disable corporate VPN checks.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Enterprise Remote MCP Gateway with SSO and mTLS',
    explanation: 'Bridging desktop or cloud clients to internal data via MCP requires enterprise perimeter security: HTTPS/SSE connections authenticated via Corporate SSO (OAuth/OIDC) or client certificates (mTLS), routed through secure reverse proxies into internal VPCs.',
    distractorAnalysis: {
      B: 'Unencrypted public port forwarding exposes internal proprietary data to internet-wide scraping and attack.',
      C: 'Distributing raw database dumps violates data loss prevention (DLP) policies and creates massive leakage risks.',
      D: 'Disabling VPN checks weakens workstation security posture and breaches corporate IT controls.',
    },
    references: [
      { title: 'Deploying MCP in the Enterprise', url: 'https://modelcontextprotocol.io/' }
    ]
  },
  {
    id: 2012,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An architect is comparing native Claude tool use (`tools` parameter in the Messages API) with the Model Context Protocol (MCP) for a multi-system enterprise modernization project.',
    question: 'What is the primary architectural advantage of MCP over bespoke Messages API tool integration?',
    options: [
      { label: 'A', text: 'Universal interoperability: MCP standardizes how tools, resources, and prompts are exposed across disparate clients, hosts, and LLM applications through an open, vendor-neutral protocol.' },
      { label: 'B', text: "MCP automatically increases Claude's context window from 200,000 tokens to 10,000,000 tokens." },
      { label: 'C', text: 'MCP completely eliminates the need for authentication and encryption.' },
      { label: 'D', text: 'MCP allows models to execute code without consuming any compute or electricity.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Standardized Interoperability of the Model Context Protocol',
    explanation: 'MCP is an open standard designed to decouple models from tools. Instead of writing custom tool integrations for every application and model vendor, developers write an MCP server once and connect it to any compliant client (Claude Desktop, IDEs, custom agents).',
    distractorAnalysis: {
      B: 'MCP is a communication protocol and does not alter the underlying neural network architecture or context window.',
      C: 'MCP requires rigorous authentication (OAuth, mTLS) in enterprise environments.',
      D: 'All code and model inference fundamentally require compute and energy.',
    },
    references: [
      { title: 'Why Model Context Protocol?', url: 'https://modelcontextprotocol.io/' }
    ]
  },
  {
    id: 2013,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise MCP server exposes a prompt template titled `incident_postmortem` via the `prompts/list` capability. The prompt includes arguments for `incident_id` and `severity`.',
    question: 'How do MCP Prompts differ fundamentally from MCP Tools?',
    options: [
      { label: 'A', text: 'Prompts are reusable, user- or client-controlled slash-command style templates that guide conversations, whereas Tools are callable functions that the model autonomously invokes to execute actions.' },
      { label: 'B', text: 'Prompts can mutate SQL databases directly, whereas Tools are strictly read-only.' },
      { label: 'C', text: 'Tools are written in Markdown, whereas Prompts must be compiled C++ binaries.' },
      { label: 'D', text: 'There is no difference; Prompts and Tools are identical synonyms in MCP.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'MCP Prompts vs Tools Distinction',
    explanation: 'In MCP, Prompts are predefined templates intended to be selected and initiated by the user or client application to seed conversations, while Tools are capabilities exposed to the model for autonomous execution during inference turns.',
    distractorAnalysis: {
      B: 'Tools are the mechanisms that execute operations (including mutations); Prompts are textual templates.',
      C: 'Tools are executable handlers; Prompts are structured text messages.',
      D: 'Prompts, Tools, and Resources are three explicitly separated core primitives in the MCP specification.',
    },
    references: [
      { title: 'MCP Prompts Specification', url: 'https://modelcontextprotocol.io/docs/concepts/prompts' }
    ]
  },
  {
    id: 2014,
    domain: 2,
    domainName: 'Production MCP Architecture & Security',
    scenario: 'An enterprise operations team is deploying a fleet of containerized MCP servers in Docker. The servers need to read local configuration files securely without running as the root user.',
    question: 'Which container security configuration satisfies enterprise hardening standards for MCP server pods?',
    options: [
      { label: 'A', text: 'Run as a non-root UID/GID (`USER 10001`), mount configuration files as read-only volumes (`readOnlyRootFilesystem: true`), and drop all Linux capabilities (`cap_drop: ALL`).' },
      { label: 'B', text: 'Run the container with `--privileged` and grant full host root access to simplify filesystem permissions.' },
      { label: 'C', text: 'Embed plain-text root passwords in the Dockerfile `ENV` variables.' },
      { label: 'D', text: 'Expose the Docker daemon socket directly into the MCP container.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Container Hardening for Enterprise MCP Deployments',
    explanation: 'Production MCP servers that interface with external agents must be container-hardened: non-root user execution, read-only root filesystems, dropped Linux capabilities, and no access to host sockets, preventing container breakouts.',
    distractorAnalysis: {
      B: 'Running privileged containers grants root host compromise vectors if prompt injection occurs.',
      C: 'Hardcoded credentials in container images violate basic secrets hygiene and CI/CD security.',
      D: 'Mounting the Docker socket inside a container allows root takeover of the entire host node.',
    },
    references: [
      { title: 'Container Security Best Practices', url: 'https://modelcontextprotocol.io/' }
    ]
  },
];
