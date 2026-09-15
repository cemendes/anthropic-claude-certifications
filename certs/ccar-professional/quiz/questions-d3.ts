import type { Question } from '../types';

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
  {
    id: 3003,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise applications team deploys Claude 3.5 Sonnet on AWS Bedrock. The workload experiences sudden traffic bursts, triggering AWS Bedrock `ThrottlingException` (Rate Exceeded) errors during market opening.',
    question: 'Which multi-tier resilience strategy best mitigates these rate-limiting errors on AWS Bedrock?',
    options: [
      { label: 'A', text: 'Configure client-side exponential backoff with full jitter, deploy cross-region Bedrock routing (e.g., US-East-1 failover to US-West-2), and purchase Provisioned Throughput for predictable baseline capacity.' },
      { label: 'B', text: 'Immediately retry the failed request in a tight while loop without backoff until it succeeds.' },
      { label: 'C', text: 'Switch from Claude 3.5 Sonnet to an unquantized 7B open-weights model on a t3.micro EC2 instance.' },
      { label: 'D', text: 'Increase the HTTP client connection pool size from 10 to 10,000 to flood the Bedrock gateway.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'AWS Bedrock Quota Resilience and Provisioned Throughput',
    explanation: 'Bedrock throttling requires multi-layer mitigation: exponential backoff with jitter prevents synchronized retry storms, cross-region routing leverages separate quota pools, and Provisioned Throughput guarantees dedicated model units.',
    distractorAnalysis: {
      B: 'Tight retry loops worsen throttling by flooding already saturated rate limiters.',
      C: 'A t3.micro instance cannot run large foundational models and lacks enterprise reasoning capabilities.',
      D: 'Massively increasing concurrent sockets amplifies rate limit violations and causes port exhaustion.',
    },
    references: [
      { title: 'AWS Bedrock Quotas and Throttling', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/quotas.html' }
    ]
  },
  {
    id: 3004,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An architect is designing an enterprise API gateway that routes requests between the Anthropic First-Party Messages API, AWS Bedrock Converse API, and Google Cloud Vertex AI Claude endpoints.',
    question: 'How should the gateway handle minor request/response schema discrepancies between cloud providers?',
    options: [
      { label: 'A', text: 'Implement a Provider Abstraction Adapter layer that normalizes client requests into a canonical internal schema and translates provider-specific payload nuances and error codes bidirectionally.' },
      { label: 'B', text: 'Require all client frontend applications to write custom if/else logic for every cloud provider.' },
      { label: 'C', text: 'Drop all tool parameters and system prompts so that only raw text strings are passed across providers.' },
      { label: 'D', text: 'Force all providers to adopt an unsupported custom binary RPC protocol.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Provider Abstraction Adapter Layer for Multi-Cloud Normalization',
    explanation: 'While Claude models share identical capabilities across platforms, parameter naming and structure differ slightly (e.g., Bedrock Converse API vs Anthropic Messages API vs Vertex AI rawPredict). A gateway adapter layer decouples clients by canonicalizing schemas.',
    distractorAnalysis: {
      B: 'Leaking cloud vendor differences into client applications creates massive code duplication and maintenance burden.',
      C: 'Stripping tools and system prompts destroys enterprise agent functionality.',
      D: 'Cloud provider managed endpoints cannot be forced to run arbitrary custom binary protocols.',
    },
    references: [
      { title: 'Anthropic Multi-Cloud Integration', url: 'https://docs.anthropic.com/en/docs/build-with-claude' }
    ]
  },
  {
    id: 3005,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise global e-commerce application serves users across North America, Europe, and Asia-Pacific. The architect needs to minimize inference latency while honoring strict local data sovereignty laws (e.g., European data remaining within the EU).',
    question: 'Which global deployment architecture satisfies both latency optimization and data sovereignty compliance?',
    options: [
      { label: 'A', text: 'Deploy regional API gateway clusters (e.g., Frankfurt for EU, Virginia for US, Tokyo for APAC) that route user requests to in-region Claude endpoints on Vertex AI / Bedrock, backed by regional data pin policies.' },
      { label: 'B', text: 'Route 100% of global traffic through a single centralized database server in North Virginia.' },
      { label: 'C', text: 'Transfer European user data to public US servers and run nightly batch deletions.' },
      { label: 'D', text: 'Store all user queries in public client browser local storage without server processing.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Geographic Proximity Routing and Data Sovereignty Fencing',
    explanation: 'Multi-region deployments on Vertex AI or Bedrock allow organizations to route traffic to geographically proximal endpoints, reducing speed-of-light network latency while keeping EU customer prompts within EU borders for GDPR compliance.',
    distractorAnalysis: {
      B: 'Centralizing all global traffic in US-East introduces severe latency for APAC/EU users and violates GDPR sovereignty rules.',
      C: 'Exporting EU personal data without appropriate legal safeguards constitutes an immediate GDPR violation.',
      D: 'Browser local storage cannot perform foundational LLM inference.',
    },
    references: [
      { title: 'Multi-Region Cloud Architecture', url: 'https://cloud.google.com/vertex-ai/docs' }
    ]
  },
  {
    id: 3006,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise system relies heavily on Claude Prompt Caching to achieve a 90% cost reduction on large 150k token context prompts. During failover from Anthropic Direct API to an alternate cloud provider, cache hits drop to 0%.',
    question: 'What fundamental architectural constraint explains why prompt caches cannot be shared across cloud providers?',
    options: [
      { label: 'A', text: "Prompt caches are ephemeral in-memory hardware states bound to specific physical cluster nodes within a specific provider's data center and cannot be synchronized across cloud boundaries." },
      { label: 'B', text: 'The alternate cloud provider deliberately blocks caching for all enterprise customers.' },
      { label: 'C', text: 'The Anthropic Python SDK has a bug that deletes Redis keys on network disconnects.' },
      { label: 'D', text: 'Tokens generated on one cloud cannot be read by transformers on another cloud.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Provider-Bound Ephemeral Prompt Cache Boundaries',
    explanation: "Prompt caching operates by keeping KV-cache states in GPU/TPU SRAM/VRAM across consecutive requests within a specific cloud provider's serving fleet. Cache entries cannot transfer across provider perimeters, meaning failover temporarily incurs cold-cache costs.",
    distractorAnalysis: {
      B: 'Major cloud providers (Anthropic, Bedrock, Vertex) support prompt caching; they simply do not share physical memory grids.',
      C: 'Prompt caching is a server-side accelerator feature, not an external Redis client mechanism.',
      D: 'The tokenization algorithm (BPE) is identical across platforms; only physical memory cache state is localized.',
    },
    references: [
      { title: 'Prompt Caching Architecture', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' }
    ]
  },
  {
    id: 3007,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise streaming application using Server-Sent Events (SSE) experiences intermittent network disconnects between the client edge and Google Cloud Vertex AI during long Claude completions.',
    question: 'How should the client-side streaming consumer handle mid-stream disconnections without re-running the entire generation from scratch?',
    options: [
      { label: 'A', text: 'Buffer streamed chunks in an incremental state accumulator; on disconnect, use the partially generated text to decide whether to prompt Claude to continue from the last complete sentence or retry with a truncated prompt.' },
      { label: 'B', text: 'Discard the entire stream and throw an unhandled error to the user.' },
      { label: 'C', text: 'Ignore the disconnection and continue rendering empty null characters to the screen.' },
      { label: 'D', text: 'Increase the TCP keep-alive interval to 48 hours.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Resilient SSE Stream Chunk Accumulation and Recovery',
    explanation: 'SSE streams can terminate prematurely due to intermediate proxy timeouts. Resilient clients buffer received chunks into an accumulator so that if a socket drops, the system can preserve valid output and issue an informed completion request.',
    distractorAnalysis: {
      B: 'Discarding several hundred tokens of generated output degrades user experience and wastes paid API credits.',
      C: 'Rendering null characters freezes the UI in a broken visual state.',
      D: 'TCP keep-alives do not prevent application-layer gateway timeouts or network route drops.',
    },
    references: [
      { title: 'Streaming Messages API', url: 'https://docs.anthropic.com/en/api/messages-streaming' }
    ]
  },
  {
    id: 3008,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise platform connects to AWS Bedrock via VPC Endpoints (AWS PrivateLink) to ensure that no LLM traffic traverses the public internet.',
    question: 'Which AWS security configuration ensures that only authorized IAM roles from designated VPC subnets can invoke the Bedrock endpoint?',
    options: [
      { label: 'A', text: 'Attach an explicit VPC Endpoint Policy to the PrivateLink interface endpoint restricting `bedrock:InvokeModel` to specified IAM role ARNs and condition keys.' },
      { label: 'B', text: 'Set up a public internet gateway and allow `0.0.0.0/0` in the subnet security group.' },
      { label: 'C', text: "Rely entirely on the model's system prompt to check IP addresses." },
      { label: 'D', text: 'Disable AWS IAM across the entire AWS organization.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'AWS PrivateLink VPC Endpoint Policies for Bedrock',
    explanation: 'AWS PrivateLink endpoints allow attaching fine-grained VPC Endpoint Policies. These policies enforce zero-trust network controls by asserting that only specific IAM principals originating from validated VPC CIDRs can execute `InvokeModel`.',
    distractorAnalysis: {
      B: 'Opening security groups to 0.0.0.0/0 defeats the entire objective of private isolated networking.',
      C: "The model's system prompt operates at the text token level and cannot inspect OSI Layer 3/4 network packets.",
      D: 'Disabling IAM is impossible in AWS and represents total destruction of access controls.',
    },
    references: [
      { title: 'AWS Bedrock VPC Endpoints', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html' }
    ]
  },
  {
    id: 3009,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise deployment uses an intelligent load balancer to distribute requests across three different Claude providers: Anthropic First-Party, AWS Bedrock, and Google Cloud Vertex AI.',
    question: 'Which dynamic routing algorithm ensures optimal throughput and minimum queue wait times during uneven load?',
    options: [
      { label: 'A', text: 'Weighted Least Outstanding Requests (Peak EWMA latency) with active health checks and circuit breakers that shed load from throttled providers.' },
      { label: 'B', text: 'Static round-robin that sends every third request to each provider regardless of errors or rate limits.' },
      { label: 'C', text: 'Random selection based on the current millisecond of the system clock.' },
      { label: 'D', text: 'Sending 100% of requests to all three providers simultaneously and discarding the two slower responses on every turn.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Dynamic Load Balancing via Peak EWMA and Active Circuit Breakers',
    explanation: 'Advanced multi-cloud gateways use exponentially weighted moving average (EWMA) latency and least-outstanding-requests routing. When a provider slows down or approaches rate limits, the router dynamically shifts traffic to healthier providers.',
    distractorAnalysis: {
      B: 'Static round-robin sends traffic directly into throttled or failing endpoints, triggering preventable customer errors.',
      C: 'Random clock routing provides zero awareness of backend health, quotas, or response times.',
      D: 'Triple-dispatching every request triples API costs and exhausts rate limit quotas across all accounts.',
    },
    references: [
      { title: 'Enterprise Cloud Traffic Routing', url: 'https://docs.anthropic.com/en/docs/build-with-claude' }
    ]
  },
  {
    id: 3010,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'A financial enterprise requires a hybrid-cloud architecture where on-premises banking core systems invoke Claude 3.5 Sonnet hosted in Google Cloud Vertex AI.',
    question: 'Which enterprise interconnect option provides the lowest jitter and highest reliability for continuous hybrid inference traffic?',
    options: [
      { label: 'A', text: "Dedicated Cloud Interconnect (10 Gbps / 100 Gbps) connecting the on-premises data center to Google's edge network with Cloud Router BGP routing." },
      { label: 'B', text: 'Public internet consumer broadband with dynamic DNS.' },
      { label: 'C', text: 'Uploading prompts via an unencrypted FTP server once per night.' },
      { label: 'D', text: 'Dial-up modem connections using standard telephone lines.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Dedicated Cloud Interconnect for Hybrid Cloud Inference',
    explanation: 'High-throughput enterprise workloads spanning on-premises systems and Google Cloud require Dedicated Cloud Interconnect. This provides SLA-backed private Layer 2/3 circuits bypassing the public internet, minimizing latency jitter for real-time model streaming.',
    distractorAnalysis: {
      B: 'Public broadband suffers from internet weather, unpredictable routing hops, packet loss, and zero SLAs.',
      C: 'Nightly batch FTP eliminates real-time interactive inference capabilities and introduces severe security risks.',
      D: 'Dial-up modems provide negligible bandwidth (56 kbps) entirely incapable of handling modern API payloads.',
    },
    references: [
      { title: 'Google Cloud Dedicated Interconnect', url: 'https://cloud.google.com/network-connectivity/docs/interconnect' }
    ]
  },
  {
    id: 3011,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise operations team discovers that their Claude deployment on AWS Bedrock occasionally encounters `ModelNotReadyException` during cold-start provisioning in a disaster recovery secondary region.',
    question: 'How should the disaster recovery orchestration engine handle cross-region warm-up and readiness verification?',
    options: [
      { label: 'A', text: 'Implement continuous synthetic health probers (canary requests) that emit low-token ping prompts every 60 seconds to keep regional endpoints warm and detect provisioning faults before routing live traffic.' },
      { label: 'B', text: 'Assume all cloud regions are always 100% warm and fail over immediately without checking.' },
      { label: 'C', text: 'Send a single 200,000-token prompt once a month to test the region.' },
      { label: 'D', text: 'Wait for production users to file help desk tickets reporting that the backup region is down.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Synthetic Canary Probers for Active-Passive Disaster Recovery',
    explanation: 'Active-passive disaster recovery regions risk cold-start anomalies or silent quota de-allocations. Automated canary probers continuously test secondary endpoints with minimal synthetic queries, verifying readiness and keeping serving pipelines warm.',
    distractorAnalysis: {
      B: 'Blind failover into unprepared regions causes cascading application failures during live emergencies.',
      C: 'Monthly tests do not maintain continuous warm cache pipelines or detect weekly infrastructure changes.',
      D: 'Relying on end-user complaints during an outage violates enterprise availability SLAs.',
    },
    references: [
      { title: 'High Availability and Canary Testing', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/' }
    ]
  },
  {
    id: 3012,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise application requires strict HTTP response status code mapping when switching between the Anthropic Direct API and Google Cloud Vertex AI Claude APIs.',
    question: 'What is the equivalent Google Cloud Vertex AI error code when Anthropic Direct API returns HTTP 529 (Overloaded Error)?',
    options: [
      { label: 'A', text: 'HTTP 429 Too Many Requests or HTTP 503 Service Unavailable (RESOURCE_EXHAUSTED / UNAVAILABLE in gRPC status).' },
      { label: 'B', text: 'HTTP 200 OK with an empty body.' },
      { label: 'C', text: 'HTTP 404 Not Found.' },
      { label: 'D', text: 'HTTP 401 Unauthorized.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Cross-Cloud Error Code Mapping and gRPC Status Equivalency',
    explanation: "Anthropic's Direct API uses HTTP 529 for server-side overload. On Google Cloud Vertex AI, capacity constraints manifest as HTTP 429 / 503 (or gRPC codes `RESOURCE_EXHAUSTED` / `UNAVAILABLE`). Multi-cloud retry interceptors must handle both codes identically.",
    distractorAnalysis: {
      B: 'A 200 OK indicates successful processing, not server overload.',
      C: '404 indicates missing endpoint resource paths, not capacity exhaustion.',
      D: '401 indicates credential authentication failure, unrelated to service overload.',
    },
    references: [
      { title: 'Anthropic Errors and Handling', url: 'https://docs.anthropic.com/en/api/errors' }
    ]
  },
  {
    id: 3013,
    domain: 3,
    domainName: 'Multi-Cloud Deployment & Failover Resilience',
    scenario: 'An enterprise architect is evaluating multi-cloud disaster recovery cost models for Claude inference. The company wants to minimize idle infrastructure costs while maintaining automated failover readiness.',
    question: 'Which architecture balances cost-efficiency with high-availability disaster recovery SLAs?',
    options: [
      { label: 'A', text: 'Active-Active Pilot Light: route 95% of steady-state traffic to the primary provider (with committed-use discounts) while continuously sending 5% of canary traffic to the secondary cloud to validate pipeline readiness.' },
      { label: 'B', text: 'Purchase 100% peak redundant provisioned capacity in five different clouds and leave four completely unused.' },
      { label: 'C', text: 'Never establish an account with a secondary cloud provider to avoid registration fees.' },
      { label: 'D', text: 'Shut down all servers every evening at 5:00 PM to save compute costs.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Active-Active Pilot Light Deployment Pattern',
    explanation: 'The Pilot Light / Canary pattern routes a continuous fractional load (e.g., 5%) to secondary cloud providers. This verifies authentication, networking, and quotas in real-time while allowing the enterprise to capitalize on primary committed-use pricing without paying for idle duplicate throughput.',
    distractorAnalysis: {
      B: 'Paying for 5x redundant provisioned throughput inflates infrastructure budgets unsustainably.',
      C: 'Single-vendor reliance creates total vulnerability to catastrophic provider outages.',
      D: 'Shutting down systems nightly makes round-the-clock global enterprise services unavailable.',
    },
    references: [
      { title: 'Disaster Recovery Architectures on Cloud', url: 'https://docs.anthropic.com/en/docs/build-with-claude' }
    ]
  },
];
