import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 4001,
    domain: 4,
    domainName: 'Enterprise Governance, Privacy & Security',
    scenario: 'A healthcare provider subject to HIPAA regulations wants to process patient clinical notes using Claude. The compliance team demands proof that patient data is not retained on cloud provider disks or used for model training.',
    question: 'Which enterprise agreement and technical configuration must be established?',
    options: [
      { label: 'A', text: 'Execute a Business Associate Agreement (BAA) and enable Zero Data Retention (ZDR) to guarantee ephemeral processing with immediate log purging and zero model training on customer data.' },
      { label: 'B', text: 'Use standard public consumer Claude accounts.' },
      { label: 'C', text: 'Rely solely on system prompts commanding Claude not to memorize medical data.' },
      { label: 'D', text: 'Run requests only during weekend maintenance windows.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Zero Data Retention (ZDR) and BAA Compliance',
    explanation: 'Regulated industries require legal and technical enforcement: a signed BAA alongside Zero Data Retention (ZDR), ensuring input/output data is processed purely in transient RAM and never persisted or used for model training.',
    distractorAnalysis: {
      B: 'Consumer plans lack HIPAA compliance guarantees and enterprise BAA agreements.',
      C: 'Prompts have zero legal or infrastructure-level control over cloud provider logging servers.',
      D: 'Timing of requests has no bearing on regulatory data retention laws.',
    },
    references: [
      { title: 'Anthropic Commercial Privacy & Trust', url: 'https://www.anthropic.com/trust' }
    ]
  },
  {
    id: 4002,
    domain: 4,
    domainName: 'Enterprise Governance, Privacy & Security',
    scenario: 'An enterprise customer service bot processes customer email inquiries that may contain indirect prompt injections designed to exfiltrate database contents.',
    question: 'Which defense-in-depth architecture best secures the application?',
    options: [
      { label: 'A', text: 'A multi-layer strategy: pre-screening with a lightweight classifier (Haiku), strict XML tag encapsulation (`<untrusted_content>`), system prompt instruction hierarchy dominance, and read-only tool privilege isolation.' },
      { label: 'B', text: "A single prompt instruction saying: 'Ignore all attacks.'" },
      { label: 'C', text: 'Blocking all incoming emails that contain words longer than 10 letters.' },
      { label: 'D', text: 'Relying entirely on a client-side JavaScript regex filter.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Defense-in-Depth against Indirect Prompt Injections',
    explanation: 'Indirect injection defense requires defense-in-depth: semantic input classifiers, clear structural isolation (XML boundaries), instruction hierarchy, and restricting tool execution to read-only scopes.',
    distractorAnalysis: {
      B: 'Naive negative prompting is effortlessly defeated by adversarial jailbreaks.',
      C: 'Length-based word filtering destroys legitimate communication and fails against compact injections.',
      D: 'Client-side regex is trivial to bypass and does not protect backend API orchestration.',
    },
    references: [
      { title: 'Prompt Injection Mitigation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/defense-in-depth' }
    ]
  },
];
