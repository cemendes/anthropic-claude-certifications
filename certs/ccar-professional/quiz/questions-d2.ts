import type { Question } from '../types';

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
];
