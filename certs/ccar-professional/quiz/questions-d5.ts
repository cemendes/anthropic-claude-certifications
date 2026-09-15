import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 5001,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'A software company updates its core Claude customer support system prompt. In staging, the new prompt looks good on 5 manual test queries, but post-deployment customer satisfaction drops significantly due to edge-case hallucinations.',
    question: 'What enterprise engineering practice should have been integrated into the CI/CD pipeline to prevent this regression?',
    options: [
      { label: 'A', text: 'Evals-as-Code: an automated CI/CD pipeline that evaluates proposed prompt diffs against a versioned golden benchmark suite using calibrated LLM-as-a-judge scoring with strict pass/fail quality gates.' },
      { label: 'B', text: 'Deploying the prompt directly on Friday evening when traffic is lowest.' },
      { label: 'C', text: 'Asking developers to vote on whether the prompt reads nicely.' },
      { label: 'D', text: 'Increasing max_tokens to the highest permissible limit.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Evals-as-Code CI/CD Quality Gates',
    explanation: 'Prompts are production code. Evals-as-code treats prompt changes like code commits, executing hundreds of representative benchmark test cases evaluated by calibrated automated judges before merge approval.',
    distractorAnalysis: {
      B: 'Deploying untested changes during low-traffic windows merely delays detection of systemic errors.',
      C: 'Subjective human reading does not statistically validate edge-case performance.',
      D: 'Increasing max_tokens does not improve accuracy or prevent behavioral regressions.',
    },
    references: [
      { title: 'Evaluating Prompts in Production', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 5002,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An architect is instrumenting an enterprise multi-agent workflow for observability across 20 distinct services. They need to trace token consumption, latency, and cost per user session across all agent handoffs.',
    question: 'Which standard telemetry standard and instrumentation pattern should be deployed?',
    options: [
      { label: 'A', text: 'OpenTelemetry (OTel) with semantic conventions for GenAI, emitting distributed trace spans capturing model ID, input/output tokens, duration, and tool execution status.' },
      { label: 'B', text: 'Writing print statements to local text files on each container.' },
      { label: 'C', text: 'Having Claude generate an expense report at the end of every user turn.' },
      { label: 'D', text: 'Relying solely on credit card statements at the end of the billing cycle.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'OpenTelemetry Distributed Tracing for GenAI',
    explanation: 'OpenTelemetry (OTel) is the vendor-neutral enterprise standard. Instrumenting agent orchestrators with standard GenAI semantic spans enables unified tracing across multi-cloud environments, APMs (Datadog, Dynatrace), and cost dashboards.',
    distractorAnalysis: {
      B: 'Container-local print logs cannot trace distributed requests across microservices.',
      C: 'Using the LLM for telemetry burns tokens and is unreliable.',
      D: 'Monthly credit card bills provide zero granular real-time visibility into per-request latency or failure root causes.',
    },
    references: [
      { title: 'OpenTelemetry Semantic Conventions for GenAI', url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/' }
    ]
  },
  {
    id: 5003,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An enterprise engineering team implements an automated LLM-as-a-Judge pipeline using Claude 3.5 Sonnet to score customer support responses against a reference rubric.',
    question: 'How should the team calibrate and validate the reliability of the automated judge?',
    options: [
      { label: 'A', text: "Compute Cohen's Kappa / Krippendorff's Alpha inter-rater reliability scores between the LLM judge and expert human consensus on a held-out calibration set, refining rubric rubrics until high correlation (e.g. > 0.8) is reached." },
      { label: 'B', text: 'Assume the LLM is always 100% objective and requires no validation against human judgment.' },
      { label: 'C', text: 'Set the judge model temperature to 1.0 to maximize creative scoring variance.' },
      { label: 'D', text: 'Only evaluate 3 test samples per year.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Inter-Rater Reliability Calibration for LLM-as-a-Judge',
    explanation: "LLM-as-a-Judge systems require statistical validation. Measuring inter-rater agreement (e.g., Cohen's Kappa) between automated scores and expert human annotations guarantees that the judge accurately reflects domain standards before deployment in CI/CD.",
    distractorAnalysis: {
      B: 'Uncalibrated LLM judges suffer from position bias, verbosity bias, and self-enhancement bias.',
      C: 'High temperature introduces noisy, non-reproducible evaluation metrics that invalidate benchmark tracking.',
      D: 'A sample size of 3 lacks any statistical significance for production quality verification.',
    },
    references: [
      { title: 'LLM-as-a-Judge Calibration', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 5004,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: "A financial data team builds an automated evaluation suite to assess Claude's extraction of balance sheet metrics from 10-K filings against ground-truth tables.",
    question: 'Which evaluation metric best assesses both the completeness and accuracy of the extracted structured numerical entities?',
    options: [
      { label: 'A', text: 'Precision, Recall, and F1-score computed over extracted key-value tuples with exact numerical tolerance thresholds, supplemented by Schema Validity rates.' },
      { label: 'B', text: 'BLEU score comparing raw text n-gram overlap between the extraction and the PDF page.' },
      { label: 'C', text: 'Perplexity of the generated response tokens.' },
      { label: 'D', text: 'Counting the total number of characters generated by the model.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Structured Entity Extraction Metrics (Precision, Recall, F1)',
    explanation: 'Structured data extraction requires exact field-level evaluation. Measuring Precision (avoiding false extractions), Recall (capturing all required entries), and F1-score with tolerance thresholds provides rigorous quantitative assessment, whereas n-gram overlap (BLEU) fails on numerical data.',
    distractorAnalysis: {
      B: 'BLEU measures superficial n-gram string similarity and cannot detect numerical inaccuracies or inverted balance sheet signs.',
      C: 'Perplexity evaluates language modeling fluency, not factual numerical extraction accuracy.',
      D: 'Character counts provide zero insight into semantic extraction correctness.',
    },
    references: [
      { title: 'Evaluating Extraction Quality', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 5005,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An enterprise observability dashboard tracks Time to First Token (TTFT) and Total End-to-End Latency across global Claude streaming deployments. A sudden spike in TTFT is observed while token generation speed remains constant.',
    question: 'What is the most probable architectural root cause for this specific telemetry pattern?',
    options: [
      { label: 'A', text: 'Large un-cached prompt input processing (prompt ingestion delay) or queue wait time at the model serving layer before generation starts.' },
      { label: 'B', text: "The client's monitor display refresh rate dropped from 144Hz to 60Hz." },
      { label: 'C', text: "The model's `max_tokens` parameter was set too low." },
      { label: 'D', text: 'The completion text contained too many punctuation marks.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'TTFT vs Generation Latency Disaggregation in Observability',
    explanation: 'Time to First Token (TTFT) measures prompt transmission, gateway routing, queue scheduling, and prefill computation (ingesting input tokens). A spike in TTFT with stable subsequent token throughput indicates large cold prompt prefills or upstream scheduling queues.',
    distractorAnalysis: {
      B: 'Monitor refresh rate is a local hardware display attribute that has zero effect on server API TTFT metrics.',
      C: 'Setting max_tokens too low caps output length but does not increase time to first token.',
      D: 'Punctuation in output tokens does not delay initial prompt prefill processing.',
    },
    references: [
      { title: 'Measuring LLM Latency and Performance', url: 'https://docs.anthropic.com/en/docs/build-with-claude' }
    ]
  },
  {
    id: 5006,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An AI platform team evaluates two candidate system prompts (Prompt A vs Prompt B) for a coding assistant. The team wants to test the prompts on live production traffic with minimal user impact.',
    question: 'Which continuous experimentation pattern safely validates live user preference and code acceptance rates?',
    options: [
      { label: 'A', text: 'A/B Testing with Canary Routing: allocate 95% of traffic to current baseline Prompt A and 5% to candidate Prompt B, tracking explicit user acceptance (thumbs up/down, code copy rates) and latency metrics.' },
      { label: 'B', text: 'Deploy Prompt B globally to 100% of production users at 9:00 AM on Monday without rollback capability.' },
      { label: 'C', text: 'Ask engineers in a Slack poll which prompt they prefer.' },
      { label: 'D', text: 'Run Prompt A for odd user IDs and disable the service for even user IDs.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Canary A/B Testing and Production Performance Gates',
    explanation: 'Production prompt engineering requires controlled experimentation. Canary routing exposes a small, randomized fraction of traffic (5%) to the new prompt variant, measuring concrete telemetry (acceptance rates, feedback, error rates) before full rollout.',
    distractorAnalysis: {
      B: 'Uncontrolled 100% deployments risk widespread user dissatisfaction and service disruption without safety nets.',
      C: 'Subjective internal Slack votes do not measure actual user behavior or statistical code acceptance.',
      D: 'Disabling services for half the user base causes an immediate partial service outage.',
    },
    references: [
      { title: 'A/B Testing LLM Applications', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 5007,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An enterprise compliance team requires continuous real-time monitoring of deployed Claude customer service bots to detect toxic, offensive, or policy-violating conversations in flight.',
    question: 'Which architectural observability pattern satisfies this real-time safety auditing requirement?',
    options: [
      { label: 'A', text: 'Asynchronous stream tap / shadow pipeline that routes completed turns to an automated safety classifier, emitting alerts to security teams when violation thresholds are breached without adding latency to the user stream.' },
      { label: 'B', text: 'Pausing the user stream for 30 seconds on every turn while a human reviews the message.' },
      { label: 'C', text: 'Relying on quarterly manual sampling of 10 random customer tickets.' },
      { label: 'D', text: "Blocking all users whose names start with the letter 'A'." },
    ],
    correctAnswer: 'A',
    keyConcept: 'Asynchronous Shadow Safety Auditing Pipelines',
    explanation: 'Real-time safety auditing in enterprise production is accomplished by tapping conversation streams asynchronously. This allows secondary safety classifiers to inspect turns in near-real-time and trigger alerts without degrading customer streaming latency.',
    distractorAnalysis: {
      B: 'Introducing 30-second synchronous human approval on every chat turn ruins conversational UX.',
      C: 'Quarterly sampling misses thousands of critical violations and fails real-time containment requirements.',
      D: 'Arbitrary name-based blocking is nonsensical, discriminatory, and ineffective.',
    },
    references: [
      { title: 'Content Moderation and Safety Monitoring', url: 'https://docs.anthropic.com/en/docs/build-with-claude' }
    ]
  },
  {
    id: 5008,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An automated eval pipeline runs 500 complex multi-turn benchmark scenarios on every git push. The pipeline takes 4 hours to run and costs $300 in API credits per commit.',
    question: 'How can the engineering team optimize the CI/CD evaluation architecture to maintain fast feedback loops without sacrificing test rigor?',
    options: [
      { label: 'A', text: 'Implement Tiered Evaluation Gates: run a fast, low-cost Tier 1 smoke eval (50 critical regression tests using Claude 3.5 Haiku) on pull requests, reserving the full 500-test Tier 2 benchmark on Claude 3.5 Sonnet for nightly or pre-release builds.' },
      { label: 'B', text: 'Delete all evaluation tests permanently to make builds instantaneous.' },
      { label: 'C', text: 'Only run tests when an end user reports a bug in production.' },
      { label: 'D', text: 'Truncate all test scenarios to single-character inputs.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Tiered Evaluation Gates in Enterprise CI/CD',
    explanation: 'Evaluating complex agent swarms requires tiered test architecture. Fast, targeted smoke suites running on lightweight models provide 5-minute PR feedback, while comprehensive multi-turn benchmark suites run asynchronously or nightly.',
    distractorAnalysis: {
      B: 'Deleting tests destroys quality assurance and guarantees undetected regressions.',
      C: 'Relying on production bug reports shifts the cost of failure to end customers.',
      D: 'Single-character inputs cannot validate multi-turn conversational reasoning or tool integrations.',
    },
    references: [
      { title: 'CI/CD Evaluation Strategies', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 5009,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'An enterprise multi-agent system uses an automated LLM judge to evaluate candidate summaries. The engineering lead notices that the judge consistently awards higher scores to longer, wordier summaries regardless of factual conciseness.',
    question: 'What common LLM evaluation bias is occurring, and how is it mitigated?',
    options: [
      { label: 'A', text: 'Verbosity Bias; mitigate by explicitly penalizing excessive length in the evaluation rubric, providing length-balanced few-shot grading examples, and normalizing scores against word count.' },
      { label: 'B', text: "Recency Bias; mitigate by clearing the server's NTP time server." },
      { label: 'C', text: 'Sunk Cost Bias; mitigate by buying cheaper GPUs.' },
      { label: 'D', text: 'Confirmation Bias; mitigate by replacing the judge model with a Python random number generator.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Mitigating Verbosity Bias in LLM-as-a-Judge',
    explanation: 'Verbosity bias is a well-documented tendency of LLM judges to equate text length with thoroughness and quality. Defenses include explicit length penalties in the rubric, few-shot examples demonstrating concise excellence, and length-normalized metrics.',
    distractorAnalysis: {
      B: 'NTP time servers synchronize clock times and have zero effect on linguistic evaluation biases.',
      C: 'Hardware purchasing has no bearing on model semantic evaluation preferences.',
      D: 'Random number generators eliminate all evaluation capability.',
    },
    references: [
      { title: 'LLM Evaluation Biases and Mitigation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
  {
    id: 5010,
    domain: 5,
    domainName: 'Evals-as-Code & Continuous Observability',
    scenario: 'A healthtech startup uses Claude to extract medical dosage schedules. A data scientist constructs a synthetic test dataset by prompting Claude to generate 1,000 synthetic patient notes.',
    question: 'What critical evaluation hazard must the team account for when testing models on LLM-generated synthetic benchmarks?',
    options: [
      { label: 'A', text: "Model Blindspots and Synthetic Homogeneity: synthetic data often reflects the generating model's internal distribution and biases, failing to capture real-world human typos, clinical jargon, and authentic edge-case anomalies." },
      { label: 'B', text: 'Synthetic data immediately corrupts the Python virtual environment upon reading.' },
      { label: 'C', text: 'Synthetic patient notes are illegal to store in any computer filesystem.' },
      { label: 'D', text: 'Synthetic data always runs 10x slower than human-written text.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Synthetic Benchmark Homogeneity and Blindspot Hazards',
    explanation: 'While synthetic datasets accelerate test authoring, they tend to be overly uniform and share the generative biases of the creator model. Production evaluation suites must blend synthetic data with real, sanitized, human-curated edge cases to ensure true robustness.',
    distractorAnalysis: {
      B: 'Synthetic text files are standard string data and cannot corrupt Python virtual environments.',
      C: 'Synthetic data is widely used specifically because it avoids real patient privacy restrictions.',
      D: 'Inference speed depends on token length and compute capacity, not text authorship origin.',
    },
    references: [
      { title: 'Synthetic Data Evaluation Best Practices', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/evaluate-prompts' }
    ]
  },
];
