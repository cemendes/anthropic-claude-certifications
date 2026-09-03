import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 3001,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise financial application requires 99.99% availability for Claude inference. The primary endpoint is the Anthropic Direct API in US-East. During a regional cloud outage, the endpoint returns continuous HTTP 529 errors.',
    question: 'What is the recommended multi-cloud disaster recovery architecture?',
    options: [
      { label: 'A', text: 'Implement an active-active or active-passive circuit breaker that automatically redirects traffic to Claude on Google Cloud Vertex AI or AWS Bedrock across alternative geographic regions.' },
      { label: 'B', text: 'Increase client retry timeouts from 10 seconds to 3 hours and queue all customer requests in memory.' },
      { label: 'C', text: 'Switch immediately to an open-source model running on a single local GPU instance.' },
      { label: 'D', text: 'Hardcode an automatic rollback of the entire application to an earlier software release.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Cross-Provider Multi-Cloud Failover (Direct / Vertex / Bedrock)',
    explanation: 'Enterprise resilience mandates cross-cloud portability. Designing orchestration adapters capable of routing between Anthropic First-Party API, Google Cloud Vertex AI, and AWS Bedrock eliminates single-cloud provider outages.',
    distractorAnalysis: {
      B: 'Queueing requests for hours during a cloud outage blows SLAs and exhausts application memory buffers.',
      C: 'A single unmanaged GPU lacks the reasoning capacity and high-throughput SLA of enterprise Claude models.',
      D: 'Rolling back application code does not resolve upstream cloud infrastructure downtime.',
    },
    references: [
      { title: 'Enterprise Multi-Cloud Resilience', url: 'https://docs.anthropic.com/en/docs/build-with-claude' }
    ]
  },
  {
    id: 3002,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise cloud architect is migrating Claude workloads from Anthropic Direct API to Google Cloud Vertex AI to comply with corporate security standards.',
    question: 'Which networking and identity configuration satisfies enterprise zero-trust mandates on Vertex AI?',
    options: [
      { label: 'A', text: "Use Private Service Connect (PSC) to route traffic entirely over Google's internal private backbone, authenticating via Google Application Default Credentials (ADC) / IAM Service Accounts." },
      { label: 'B', text: 'Pass an API key string in the `Authorization` header over public internet gateways.' },
      { label: 'C', text: 'Disable all firewall rules on the VPC to allow Anthropic IP ranges.' },
      { label: 'D', text: 'Deploy a public web proxy on a Compute Engine VM with no authentication.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Vertex AI Private Service Connect (PSC) and IAM Auth',
    explanation: 'Vertex AI enables enterprise compliance by eliminating public internet egress via Private Service Connect (PSC) and replacing static API keys with short-lived OAuth 2.0 tokens managed by Google IAM.',
    distractorAnalysis: {
      B: 'Static API keys over public networks violate zero-trust and corporate data exfiltration policies.',
      C: 'Disabling firewalls compromises network perimeter security.',
      D: 'Unauthenticated public proxies create massive unauthorized access vulnerabilities.',
    },
    references: [
      { title: 'Vertex AI Private Service Connect', url: 'https://cloud.google.com/vertex-ai/docs/general/vpc-sc' }
    ]
  },
];
