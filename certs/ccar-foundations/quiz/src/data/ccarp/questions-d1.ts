import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 1001,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An autonomous multi-agent financial auditing system occasionally experiences runaway execution when Worker Agent A (Fraud Detector) and Worker Agent B (Transaction Verifier) continuously cross-delegate follow-up queries to each other, exhausting the monthly token budget.',
    question: 'Which architectural pattern is most effective at preventing this cyclical multi-agent execution trap?',
    options: [
      { label: 'A', text: 'Implement a centralized state coordinator that tracks a monotonic recursion depth counter and enforces an immutable step limit with a token budget circuit breaker.' },
      { label: 'B', text: "Add an instruction to each agent's system prompt stating: 'Do not talk to each other more than three times.'" },
      { label: 'C', text: 'Reduce model temperature to 0.0 on both agents.' },
      { label: 'D', text: 'Merge both workers into a single monolithic prompt.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Monotonic Recursion Counters and Circuit Breakers',
    explanation: 'Autonomous swarms require hard architectural circuit breakers. Relying on prompt instructions fails when edge cases occur. A centralized state coordinator tracking monotonic execution depth and token consumption provides deterministic safeguards against infinite loops.',
    distractorAnalysis: {
      B: 'Prompt constraints are probabilistic soft controls and cannot guarantee cycle prevention under complex edge cases.',
      C: 'Temperature 0.0 makes sampling greedy but does not stop architectural recursion loops between agents.',
      D: 'Monolithic agents lose specialized focus, experience context bloat, and increase prompt engineering fragility.',
    },
    references: [
      { title: 'Building Effective Agents', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1002,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'A high-frequency claims processing system has an Orchestrator delegating medical document extraction to three parallel Worker instances. Once completed, the raw conversational history of all workers is concatenated and passed to a downstream Approver Agent, causing context window exhaustion.',
    question: 'How should the handoff between worker instances and the Approver Agent be structured?',
    options: [
      { label: 'A', text: 'Enforce Context Isolation: Have each worker synthesize its findings into a strictly typed, validated Pydantic schema, discarding raw conversational scratchpads before handoff.' },
      { label: 'B', text: 'Switch the Approver Agent to Claude 3 Opus to double the context window.' },
      { label: 'C', text: 'Store the entire raw conversation history in a shared Redis cache that all agents continuously read.' },
      { label: 'D', text: "Truncate the first 50% of tokens from each worker's message history." },
    ],
    correctAnswer: 'A',
    keyConcept: 'Context Isolation and Structured Schema Handoff',
    explanation: 'Enterprise multi-agent architectures must enforce context isolation. Workers should discard intermediate tool scratchpads and return only validated structured artifacts (e.g. Pydantic models), preventing context bloat and hallucination propagation in downstream agents.',
    distractorAnalysis: {
      B: 'Opus shares the same 200k token context window as Sonnet and does not eliminate context accumulation.',
      C: 'Shared raw memory exacerbates token bloat and multiplies noise across the agent fleet.',
      D: 'Arbitrary token truncation drops critical initial premises and causes corrupted schemas.',
    },
    references: [
      { title: 'Multi-Agent System Design', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1003,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'In a hospital triage system, an autonomous agent recommends high-risk drug dosage changes. Hospital policy requires dual medical practitioner approval before executing any electronic health record (EHR) mutation.',
    question: 'Where should the Human-in-the-Loop (HITL) gate be implemented in this architecture?',
    options: [
      { label: 'A', text: 'As a deterministic escalation gate in the orchestration layer that pauses tool execution and requires signed cryptographic authorization tokens from two authorized clinicians before dispatching the EHR tool.' },
      { label: 'B', text: "In the system prompt, instructing Claude to ask the user 'Are you sure?' before outputting the tool call." },
      { label: 'C', text: 'By running an Evaluator-Optimizer loop where a second Claude model acts as the human practitioner.' },
      { label: 'D', text: 'Execute the tool mutation immediately and trigger an email notification to the doctor afterwards.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Cryptographic Human-in-the-Loop Escalation Gates',
    explanation: 'High-risk mutations must be intercepted at the application orchestration layer. The model merely proposes the action; the runtime holds execution until explicit, authenticated, multi-party human approval tokens are submitted.',
    distractorAnalysis: {
      B: 'Prompting cannot prevent unauthorized tool invocation or satisfy clinical regulatory compliance.',
      C: 'An LLM cannot legally or safely substitute for human clinical judgment.',
      D: 'Post-action alerts fail to prevent catastrophic medical harm before state changes take effect.',
    },
    references: [
      { title: 'Human-in-the-Loop Architectures', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1004,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise risk assessment platform uses a peer-to-peer panel of 5 Claude 3.5 Sonnet instances to evaluate credit risk. Each instance reviews the application independently.',
    question: 'Which consensus mechanism provides optimal fault tolerance against stochastic variance and false negatives?',
    options: [
      { label: 'A', text: 'Quorum-based Voting: require a minimum 3/5 majority consensus with structured rubric alignment, escalating split votes (e.g. 3-2) to a human risk officer.' },
      { label: 'B', text: 'Unanimous Consensus: require all 5 instances to output identical strings, retrying indefinitely until 100% agreement is reached.' },
      { label: 'C', text: 'First-to-respond wins: adopt the verdict of whichever API call finishes earliest to minimize latency.' },
      { label: 'D', text: 'Average the temperature parameters across all 5 models.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Quorum-Based Agent Consensus and Split Escalation',
    explanation: 'Quorum voting (e.g. 3 of 5) balances reliability and availability. Requiring unanimity causes infinite retries on edge cases, while first-to-respond ignores consensus verification entirely.',
    distractorAnalysis: {
      B: 'Unanimity causes excessive retries and brittle system stalls over minor semantic variations.',
      C: 'First-to-respond eliminates the verification benefit of parallel multi-instance review.',
      D: 'Averaging temperature does not constitute a consensus voting mechanism.',
    },
    references: [
      { title: 'Parallelization and Voting Patterns', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1005,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'A distributed microservice architecture deploys agents across multiple Kubernetes pods. Agent A initiates a multi-hour data migration subtask on Agent B. Network partitions occur frequently.',
    question: 'How should long-running asynchronous agent communication and state synchronization be managed?',
    options: [
      { label: 'A', text: 'Use an event-driven message bus (e.g. Kafka / RabbitMQ) with persistent state stores (e.g. PostgreSQL) and idempotent task IDs rather than synchronous HTTP requests.' },
      { label: 'B', text: 'Maintain an open synchronous HTTP connection with an 8-hour timeout socket.' },
      { label: 'C', text: 'Have Agent A poll Agent B every 100 milliseconds via standard Messages API calls.' },
      { label: 'D', text: 'Store conversational state in memory on the local container filesystem.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Event-Driven State Persistence for Long-Running Agents',
    explanation: 'Long-running multi-agent tasks in enterprise cloud environments must decouple via durable event streaming (Kafka/SQS) and relational state databases, enabling automatic recovery from pod restarts and network partitions.',
    distractorAnalysis: {
      B: 'Long-lived HTTP sockets drop frequently across cloud load balancers and proxy gateways.',
      C: 'Aggressive polling wastes API quotas, burns compute, and risks rate-limit exhaustion.',
      D: 'Ephemeral container memory is permanently lost when Kubernetes reschedules or restarts pods.',
    },
    references: [
      { title: 'Distributed Agent Systems', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
];
