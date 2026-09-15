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
  {
    id: 1006,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise legal intelligence platform orchestrates complex contract reviews using a Supervisor-Worker pattern. The Supervisor agent dynamically dispatches specialized subtasks to three specialized workers: Compliance, Liability, and Financial Terms.',
    question: 'Which dispatching and routing architecture ensures deterministic task coordination without supervisor state drift?',
    options: [
      { label: 'A', text: 'A centralized state machine where the Supervisor issues structured dispatch events, workers return typed partial state deltas, and the state coordinator validates state transitions against an explicit schema before next-step routing.' },
      { label: 'B', text: 'Peer-to-peer gossip protocol where workers directly broadcast unstructured conversational summaries to each other without supervisor mediation.' },
      { label: 'C', text: 'Instructing the Supervisor model to run an open-ended loop while passing the entire uncompressed context of all worker turns on every cycle.' },
      { label: 'D', text: 'Replacing the Supervisor agent with random round-robin load balancing across the three worker prompts.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Supervisor-Worker Deterministic State Machine Routing',
    explanation: 'In robust enterprise supervisor-worker systems, orchestration must be managed through an explicit state machine. The supervisor emits structured routing events, and workers emit strictly validated state deltas. This isolates execution contexts and eliminates prompt drift.',
    distractorAnalysis: {
      B: 'Gossip protocols between LLMs lead to conversational divergence, message storms, and inability to enforce contractual completion criteria.',
      C: 'Passing uncompressed worker contexts degrades supervisor attention, accelerates context window exhaustion, and increases token costs quadratically.',
      D: 'Round-robin dispatch ignores semantic task requirements and fails to match specialized domain tasks to capable workers.',
    },
    references: [
      { title: 'Supervisor-Worker Agent Patterns', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1007,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise multi-agent workflow processes mortgage underwriting applications. Occasionally, unexpected tool format errors cause worker agents to repeatedly retry identical failing actions, stalling the pipeline.',
    question: 'What cycle and stall detection mechanism should the orchestration runtime implement?',
    options: [
      { label: 'A', text: 'Track a sliding window hash of (agent_id, tool_name, serialized_tool_arguments); if identical hashes repeat three times without state change, trip a circuit breaker and route to an escalation fallback handler.' },
      { label: 'B', text: 'Increase model temperature to 1.0 so that subsequent retries generate different random tool arguments.' },
      { label: 'C', text: 'Allow the agent to loop indefinitely until cloud provider timeout headers (HTTP 504) terminate the process.' },
      { label: 'D', text: "Prepend 'Please try something completely different' to the user prompt and re-execute the entire workflow from scratch." },
    ],
    correctAnswer: 'A',
    keyConcept: 'Sliding Window Action Hashing for Cycle Detection',
    explanation: 'Deterministic cycle detection in agentic runtimes is achieved by hashing consecutive action signatures (tool name + normalized inputs). When consecutive duplicate actions occur without producing progressive state deltas, tripping a circuit breaker stops wasteful token burn and triggers graceful escalation.',
    distractorAnalysis: {
      B: 'Raising temperature introduces nondeterministic hallucinations without fixing invalid schemas or broken external tool dependencies.',
      C: 'Unbounded loops drain API credits, lock worker resources, and guarantee SLA violations.',
      D: 'Re-executing entire multi-agent workflows from the beginning discards valid prior work and risks recurring into the exact same failure point.',
    },
    references: [
      { title: 'Handling Failures and Cycles in Agentic Systems', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1008,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'A fleet of specialized research agents operates concurrently to assemble an institutional investment memorandum. The system enforces strict financial cost governance of $5.00 maximum inference budget per generated memorandum.',
    question: 'How should cumulative token consumption and cost circuit breakers be enforced across the distributed agent swarm?',
    options: [
      { label: 'A', text: 'Maintain an atomic, centralized token ledger in a low-latency shared store (e.g., Redis); decrement remaining token/dollar allowances before each API invocation, and abort/summarize when the reserve drops below safe margins.' },
      { label: 'B', text: "Instruct each agent in its system prompt: 'Estimate your token usage and stop when you think you have spent $5.00.'" },
      { label: 'C', text: 'Rely on the monthly cloud billing invoice to alert finance after budget overruns occur.' },
      { label: 'D', text: 'Limit all prompts across all agents to exactly 100 words regardless of task complexity.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Centralized Atomic Token Budget Circuit Breakers',
    explanation: 'LLMs cannot accurately measure their own token counts or financial pricing structures. An external orchestration runtime must track token usage atomically across all worker threads via a shared cache, tripping deterministic circuit breakers when budget thresholds are reached.',
    distractorAnalysis: {
      B: 'LLMs possess no internal clock or exact token billing counter; self-budgeting prompts are completely ineffective.',
      C: 'Post-hoc monthly billing alerts do not prevent individual rogue requests or real-time budget depletion.',
      D: 'Arbitrary prompt length limits cripple agent reasoning and context retrieval without guaranteeing cost bounds.',
    },
    references: [
      { title: 'Token Cost Management in Agentic Systems', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1009,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise code refactoring swarm uses an Evaluator-Optimizer pattern where a Generator agent writes TypeScript migration modules and a Critic agent reviews them against strict security rules.',
    question: 'Which design principle prevents degenerative feedback loops where the Generator and Critic endlessly dispute stylistic preferences?',
    options: [
      { label: 'A', text: 'Supply the Critic with an explicit, objective rubric containing measurable boolean evaluation criteria, limit optimization cycles to a maximum of 3 iterations, and require deterministic AST linting before LLM critique.' },
      { label: 'B', text: "Configure both the Generator and Critic with temperature 1.0 and prompt them to 'collaborate until perfection is achieved.'" },
      { label: 'C', text: "Disable the Critic agent entirely and push the Generator's first output directly to production." },
      { label: 'D', text: 'Invert the roles after each cycle so the Critic becomes the Generator.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Objective Rubrics and Hard Iteration Caps in Evaluator-Optimizer Loops',
    explanation: 'Evaluator-Optimizer architectures degenerate into pedantic loops unless bounded by hard limits: (1) an objective rubric focusing on verifiable functional/security rules, (2) automated static analysis (linters/compilers) preceding LLM judgment, and (3) a strict iteration limit (e.g., <= 3).',
    distractorAnalysis: {
      B: 'Unbounded loops paired with high temperature amplify stylistic disagreements and generate infinite unproductive iterations.',
      C: "Removing validation permits unverified code into production, negating the architecture's purpose.",
      D: 'Role reversal introduces severe confusion into conversational contexts and accelerates prompt drift.',
    },
    references: [
      { title: 'Evaluator-Optimizer Workflow Pattern', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1010,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'A real-time logistics routing platform executes 10 parallel Claude 3.5 Haiku sub-agents to compute route optimizations across 10 distribution regions. Two sub-agents fail due to transient HTTP 500 upstream errors.',
    question: 'How should the orchestration engine handle this partial node failure to preserve overall job completion without sacrificing data integrity?',
    options: [
      { label: 'A', text: 'Implement partial result aggregation: retry failed sub-agents with exponential backoff and jitter up to 2 times, and if still failing, compile the 8 successful regions while annotating the output with partial degradation metadata.' },
      { label: 'B', text: 'Fail the entire batch immediately and throw an unhandled fatal exception to the end user.' },
      { label: 'C', text: 'Invent synthetic route data for the two failed regions using random number generation.' },
      { label: 'D', text: 'Block all remaining worker threads indefinitely until the two failed sub-agents respond.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Partial Aggregation and Graceful Degradation in Fan-Out Swarms',
    explanation: 'Enterprise fan-out architectures must handle node failures gracefully. Combining exponential backoff retries with partial result synthesis and explicit degradation flags allows 80% of the workload to succeed while clearly identifying incomplete partitions.',
    distractorAnalysis: {
      B: 'Failing the entire job on isolated transient worker failures destroys system availability and customer SLAs.',
      C: 'Synthesizing fabricated operational data compromises physical logistics and safety.',
      D: 'Indefinite blocking causes thread starvation, cascaded timeouts, and system-wide deadlock.',
    },
    references: [
      { title: 'Building Resilient Agent Systems', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1011,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise intelligence platform must correlate insights across 50 internal PDF dossiers. The architect considers whether to deploy a single Claude 3.5 Sonnet agent with a massive 200k context prompt or an Orchestrator-Workers swarm.',
    question: 'Under which conditions is the multi-agent Orchestrator-Workers swarm technically superior to the single monolithic prompt?',
    options: [
      { label: 'A', text: 'When subtasks can be parallelized independently, document extraction requires specialized prompt schemas, and intermediate results exceed optimal retrieval attention budgets in a single context window.' },
      { label: 'B', text: 'When minimizing total monetary cost is the only architectural objective.' },
      { label: 'C', text: 'When the task requires simple, single-turn question answering on a 2-page document.' },
      { label: 'D', text: 'When network bandwidth is severely constrained and only one HTTP request can be made per hour.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Decomposition Criteria: Monolith vs Orchestrator-Workers',
    explanation: 'Multi-agent systems excel when tasks divide into independent, parallelizable sub-problems requiring specialized contexts and tools. Running workers in parallel reduces total wall-clock latency and isolates attention spans, whereas a single massive prompt risks attention degradation.',
    distractorAnalysis: {
      B: 'Multi-agent systems incur higher cumulative token overhead due to multiple system prompts and inter-agent communication schemas.',
      C: 'Simple, short document QA is best solved with a single lightweight model turn; a swarm adds pointless latency and orchestration complexity.',
      D: 'Multi-agent swarms require substantial network I/O for concurrent API calls and state management.',
    },
    references: [
      { title: 'When to Use Multi-Agent Architectures', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1012,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'A customer service swarm uses a Router agent that directs incoming enterprise user tickets to one of four specialized downstream agents: Billing, Technical Support, Account Access, or Enterprise Sales.',
    question: 'Which routing implementation achieves the lowest latency and highest classification reliability?',
    options: [
      { label: 'A', text: 'Use Claude 3.5 Haiku with tool use (function calling) restricted to a single `route_ticket({ category, confidence, reasoning })` schema, followed by deterministic programmatic dispatch to the target worker.' },
      { label: 'B', text: 'Ask Claude 3.5 Sonnet to generate an essay explaining all four departments and parse the last word of the essay with regex.' },
      { label: 'C', text: 'Broadcast the ticket to all four agents concurrently and pick the agent that finishes typing first.' },
      { label: 'D', text: 'Execute four sequential prompt checks, one for each department, in serial order.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Structured Tool-Based Intent Routing with Fast Tier Models',
    explanation: 'Classification and routing are best handled by fast, cost-effective models (Claude 3.5 Haiku) using constrained tool calling. Emitting a strictly typed schema guarantees deterministic programmatic downstream routing with sub-second latency.',
    distractorAnalysis: {
      B: 'Free-form essays introduce massive token generation latency, high variance, and regex parsing fragility.',
      C: 'Broadcasting to all workers burns 4x tokens and ignores semantic routing entirely.',
      D: 'Serial sequential evaluation multiplies latency by 4x and creates ordering bias.',
    },
    references: [
      { title: 'Routing Architecture Patterns', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1013,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise cybersecurity agent swarm monitors cloud security logs. Agent A (Triage) identifies an anomaly and dispatches Agent B (Forensics) to isolate an EC2 instance. Agent B crashes mid-investigation due to an unhandled exception.',
    question: 'Which architectural state persistence pattern ensures the incident response workflow resumes without losing investigative state?',
    options: [
      { label: 'A', text: 'Saga pattern with checkpointed durable state machine (e.g., AWS Step Functions or Temporal) recording step transitions, allowing a new worker instance to replay or resume from the last committed checkpoint.' },
      { label: 'B', text: 'Storing the conversation state in a global JavaScript variable in the memory of the crashed Node.js process.' },
      { label: 'C', text: 'Sending a Slack message to the SOC team asking them to manually re-type the original prompt.' },
      { label: 'D', text: 'Configuring the Kubernetes cluster to restart the pod with an empty volume and wait for a new attack.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Saga Pattern and Durable Orchestration State Checkpointing',
    explanation: 'Critical multi-agent enterprise workflows must use durable orchestration engines (like Temporal or Step Functions) implementing the Saga pattern. Checkpointing state after every tool execution ensures failed agent tasks can be recovered and resumed without losing forensic lineage.',
    distractorAnalysis: {
      B: 'Process crashes wipe all in-memory heap variables instantly.',
      C: 'Manual operator intervention breaks autonomous security SLA response times.',
      D: 'Restarting with clean state drops active incident response context and leaves compromised assets active.',
    },
    references: [
      { title: 'Durable Workflows in Multi-Agent Systems', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1014,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An automated enterprise investment report generator coordinates an Analyst agent, an Editor agent, and a Compliance agent. The system experiences high latency because each agent repeatedly invokes tools serially.',
    question: 'How should the orchestration engine optimize multi-agent tool execution efficiency?',
    options: [
      { label: 'A', text: 'Enable client-side concurrent tool execution when Claude outputs multiple `tool_use` blocks in a single turn, executing non-dependent tool requests in parallel via `asyncio.gather` / `Promise.all`.' },
      { label: 'B', text: 'Restrict agents to calling only one tool every 60 seconds.' },
      { label: 'C', text: 'Force all agents to communicate exclusively through plain text emails.' },
      { label: 'D', text: 'Execute tools on client web browsers instead of backend servers.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Parallel Tool Execution in Agentic Turns',
    explanation: "Claude's Messages API natively supports returning multiple `tool_use` blocks within a single response. Enterprise orchestrators should parse all blocks, execute independent I/O operations concurrently in parallel, and return all `tool_result` blocks together in the next turn.",
    distractorAnalysis: {
      B: 'Artificial delay throttles pipeline throughput and compounds latency.',
      C: 'Text emails introduce asynchronous human latency into programmatic agent pipelines.',
      D: 'Client browser tool execution creates severe security risks and relies on unreliable client connections.',
    },
    references: [
      { title: 'Tool Use and Parallel Execution', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 1015,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise knowledge agent handles employee HR benefits questions. When policy ambiguities arise, the agent must ask clarifying questions rather than guess or hallucinate policy details.',
    question: 'Which prompting and control-flow pattern best governs this conditional human interaction?',
    options: [
      { label: 'A', text: 'Equip the agent with an explicit `ask_user_clarification({ question, missing_context })` tool that pauses workflow execution until the employee provides input, coupled with a prompt rule prohibiting assumptions on unstated policies.' },
      { label: 'B', text: 'Prompt the agent to hallucinate the most generous interpretation of the benefits policy.' },
      { label: 'C', text: "Terminate the session and lock the user's account whenever ambiguity is detected." },
      { label: 'D', text: 'Force the agent to generate 10 random possible answers in a single bulleted list.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Interruptible Agent Tool Patterns for User Clarification',
    explanation: 'Providing agents with dedicated conversational tools like `ask_user_clarification` allows the orchestrator to model user feedback as a first-class tool interaction. When invoked, the engine yields control back to the UI, cleanly resuming when user input arrives.',
    distractorAnalysis: {
      B: 'Hallucinating policy terms creates severe corporate liability and employee conflict.',
      C: 'Locking accounts for normal queries creates customer support chaos and unacceptable UX.',
      D: 'Dumping speculative answers confuses users and fails to resolve policy ambiguity.',
    },
    references: [
      { title: 'Interactive Agent Design', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
  {
    id: 1016,
    domain: 1,
    domainName: 'Enterprise Multi-Agent Swarms & Systems',
    scenario: 'An enterprise e-commerce platform uses an autonomous swarm where a Catalog Agent, a Pricing Agent, and an Inventory Agent collaborate. A race condition occurs when two agents update product availability simultaneously in their local working memory.',
    question: 'How should shared state and concurrent mutations be governed across the agent swarm?',
    options: [
      { label: 'A', text: 'Employ optimistic concurrency control (OCC) or distributed locking (e.g., Redis Redlock) with versioned state records in the backing data store, rejecting stale writes and forcing agent re-evaluation.' },
      { label: 'B', text: 'Allow all agents to overwrite the database without version checks, letting the last write win.' },
      { label: 'C', text: 'Disable multi-agent concurrency and run every enterprise operation on a single sequential thread.' },
      { label: 'D', text: "Instruct the models in English: 'Please coordinate with each other so you do not write at the same time.'" },
    ],
    correctAnswer: 'A',
    keyConcept: 'Optimistic Concurrency Control and Distributed Locks in Multi-Agent Systems',
    explanation: 'Autonomous agents operating concurrently against shared resources must adhere to fundamental distributed systems principles. Relying on optimistic concurrency control (OCC) with version tags or distributed locks ensures write conflicts are detected and resolved safely.',
    distractorAnalysis: {
      B: 'Last-write-wins leads to silent data corruption and oversold inventory.',
      C: 'Serializing all enterprise operations destroys throughput and fails to scale under production traffic.',
      D: 'LLMs execute across detached processes and cannot magically synchronize hardware-level write clocks via natural language.',
    },
    references: [
      { title: 'State Management in Distributed Systems', url: 'https://anthropic.com/engineering/building-effective-agents' }
    ]
  },
];
