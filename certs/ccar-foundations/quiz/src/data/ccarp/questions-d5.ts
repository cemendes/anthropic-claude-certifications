import type { Question } from '../../types';

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
];
