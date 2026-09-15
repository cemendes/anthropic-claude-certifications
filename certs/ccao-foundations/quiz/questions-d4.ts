import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 401,
    domain: 4,
    domainName: 'Everyday Prompting & Structuring for Knowledge Workers',
    scenario: "A sales executive wants Claude to draft a personalized outreach email to a prospective enterprise customer based on recent press releases. The executive's first prompt, 'Write a sales email to Acme Corp,' produced generic marketing buzzwords.",
    question: 'Which prompt engineering technique will most reliably elevate the quality, tone, and relevance of the draft?',
    options: [
      { label: 'A', text: "Assign Claude a specific professional role ('Senior Enterprise Account Executive'), provide recent Acme news as source text inside XML tags, and define exact tone and length parameters." },
      { label: 'B', text: "Add 'URGENT: Make this high quality and do not use buzzwords' in all capital letters." },
      { label: 'C', text: 'Increase the browser zoom level to 125% to allocate more screen space to the prompt input field.' },
      { label: 'D', text: "Repeat the word 'professional' twenty times throughout the prompt." },
    ],
    correctAnswer: 'A',
    keyConcept: 'Role Priming, Context Injection, and Output Constraints',
    explanation: 'Role prompting sets the persona and perspective, enclosing source data in XML tags provides factual grounding, and specifying explicit tone and length boundaries gives Claude clear criteria for success.',
    distractorAnalysis: {
      B: 'All-caps emotional appeals are less effective than structured context and concrete constraints.',
      C: 'Browser zoom has zero impact on model inference or token processing.',
      D: 'Keyword repetition adds noise and degrades prompt clarity without defining actionable criteria.',
    },
    references: [
      { title: 'Prompt Engineering Overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' }
    ]
  },
  {
    id: 402,
    domain: 4,
    domainName: 'Everyday Prompting & Structuring for Knowledge Workers',
    scenario: 'A human resources manager wants Claude to evaluate job applicants against a scoring rubric. In the prompt, the manager includes the rubric, interview notes, and company hiring policies all as a single unbroken block of text, leading Claude to mix up applicant answers with policy rules.',
    question: 'Which structuring technique solves this ambiguity most effectively for Claude?',
    options: [
      { label: 'A', text: 'Enclose each distinct information block within semantic XML tags, such as <rubric>, <policies>, and <candidate_notes>.' },
      { label: 'B', text: "Separate each section with long strings of random punctuation marks like '~~~~~~~~~' or '**********'." },
      { label: 'C', text: 'Use different colored fonts by pasting rich HTML into the chat box.' },
      { label: 'D', text: 'Instruct Claude to use psychic intuition to guess where sections begin and end.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'XML Tag Structuring for Multi-Part Prompts',
    explanation: 'Claude is specifically fine-tuned to recognize and parse XML tags (e.g., <instructions>, <context>, <examples>). Tagging distinct components eliminates ambiguity and ensures clear separation between instructions and reference data.',
    distractorAnalysis: {
      B: 'Arbitrary punctuation strings lack semantic meaning and do not structure inputs as cleanly as XML tags.',
      C: 'Claude receives sanitized plaintext tokens; font colors are stripped during tokenization.',
      D: 'Models operate on statistical and linguistic token representations, not psychic intuition.',
    },
    references: [
      { title: 'Use XML Tags', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags' }
    ]
  },
  {
    id: 403,
    domain: 4,
    domainName: 'Everyday Prompting & Structuring for Knowledge Workers',
    scenario: 'A business analyst needs customer support feedback categorized into one of four rigid sentiment categories: [Bug, Feature Request, Billing Inquiry, Praise]. Zero deviation or conversational preamble is permitted.',
    question: 'What is the best way to ensure Claude formats the output with 100% adherence to this classification schema?',
    options: [
      { label: 'A', text: 'Provide 3–5 diverse few-shot examples showing raw feedback and exact expected categorical output inside <examples> tags, and instruct Claude to output only the label.' },
      { label: 'B', text: "Tell Claude: 'Classify this, please do your best!'" },
      { label: 'C', text: 'Threaten Claude with negative consequences if it outputs conversational greetings.' },
      { label: 'D', text: 'Ask Claude to write an essay explaining the history of sentiment classification before outputting the label.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Few-Shot Prompting and Format Enforcement',
    explanation: 'Few-shot examples provide concrete demonstrations of expected input/output mapping. Showing Claude exact target outputs eliminates conversational preamble and establishes exact stylistic and formatting boundaries.',
    distractorAnalysis: {
      B: "Vague instructions without examples frequently result in chatty preamble ('Sure, here is your classification...').",
      C: 'Adversarial or threatening phrasing is unprofessional and far less reliable than structural few-shot examples.',
      D: 'Requesting an essay directly violates the requirement for zero conversational deviation.',
    },
    references: [
      { title: 'Give Claude Examples', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/give-examples' }
    ]
  },
  {
    id: 404,
    domain: 4,
    domainName: 'Everyday Prompting & Structuring for Knowledge Workers',
    scenario: "A policy analyst is querying a 100-page government regulation uploaded to Claude. When asked about specific compliance penalties, the analyst wants to guarantee that Claude's answer does not hallucinate fictional statutory citations.",
    question: 'Which prompt instruction is most effective at preventing hallucinations when analyzing reference text?',
    options: [
      { label: 'A', text: "Instruct Claude: 'Quote exact excerpts from the text into <quotes> tags that support your answer before explaining your conclusion. If the document does not mention the answer, state that it is not found.'" },
      { label: 'B', text: "Instruct Claude: 'Never make mistakes, and make sure your confidence is 100%.'" },
      { label: 'C', text: "Instruct Claude: 'Search the public internet to verify the document's claims.'" },
      { label: 'D', text: "Instruct Claude: 'Translate the document into Latin first, then translate it back to English.'" },
    ],
    correctAnswer: 'A',
    keyConcept: 'Quote-First Grounding and Fallback Permission',
    explanation: "Forcing Claude to extract verbatim citations into <quotes> tags grounds its reasoning directly in the source text. Explicitly granting permission to say 'not found in text' prevents the model from confabulating answers when information is absent.",
    distractorAnalysis: {
      B: 'Demanding 100% confidence causes overconfident hallucinations rather than verifiable grounding.',
      C: 'Standard Claude prompts without external tool configuration cannot arbitrarily browse the live web.',
      D: 'Double translation degrades semantic nuances and increases hallucination risks.',
    },
    references: [
      { title: 'Grounding and Avoiding Hallucinations', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/grounding' }
    ]
  },
  {
    id: 405,
    domain: 4,
    domainName: 'Everyday Prompting & Structuring for Knowledge Workers',
    scenario: 'A management consultant asks Claude to analyze a complex acquisition scenario with multiple conflicting financial statements, tax liabilities, and regulatory hurdles. The first attempt yields a rushed, superficial recommendation.',
    question: 'Which prompting technique gives Claude the cognitive leeway to work through complex logic before arriving at the recommendation?',
    options: [
      { label: 'A', text: "Direct Claude to 'think step-by-step' inside <scratchpad> or <thinking> tags to evaluate each financial and tax dimension before writing the final recommendation." },
      { label: 'B', text: 'Ask Claude to answer in less than 10 words to force concise thinking.' },
      { label: 'C', text: 'Set the model temperature to 1.0 to encourage maximum randomness.' },
      { label: 'D', text: 'Submit the query five times simultaneously in separate tabs.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Chain-of-Thought Scratchpads (Giving Claude Room to Think)',
    explanation: 'Directing Claude to think step-by-step and write out intermediate evaluations in a scratchpad allows the autoregressive model to generate its own reasoning context, leading to significantly deeper and more sound analytical conclusions.',
    distractorAnalysis: {
      B: 'Forcing extreme brevity deprives the model of tokens needed to reason through multi-variable trade-offs.',
      C: 'High temperature introduces stochastic variance and reduces analytical consistency.',
      D: 'Submitting parallel queries without altering the prompt repeats the same superficial reasoning.',
    },
    references: [
      { title: 'Give Claude Time to Think', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/give-claude-time-to-think' }
    ]
  },
  {
    id: 406,
    domain: 4,
    domainName: 'Everyday Prompting & Structuring for Knowledge Workers',
    scenario: "A user wants Claude to generate a clean, automated summary for an executive dashboard. In previous turns, Claude always began its output with polite conversational filler: 'Sure! I would be delighted to help you summarize this document. Here is your summary:'.",
    question: 'How can the user eliminate this conversational filler and obtain only the raw summary?',
    options: [
      { label: 'A', text: "Add a negative constraint: 'Do not include any conversational pleasantries, intros, or outros. Output only the raw summary text starting immediately with the header.'" },
      { label: 'B', text: "Type 'STOP TALKING' at the end of the prompt." },
      { label: 'C', text: 'Clear the browser cache and change account language settings.' },
      { label: 'D', text: 'Downgrade the account from Claude Pro to Claude Free.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Eliminating Conversational Filler and Direct Output Prompting',
    explanation: "Explicit output formatting constraints ('Do not include pleasantries; start directly with...') instruct Claude to bypass default conversational niceties and emit only the requested payload.",
    distractorAnalysis: {
      B: 'Aggressive, vague commands are less reliable than clear structural formatting instructions.',
      C: 'Browser cache and UI localization settings do not modify model preamble behavior.',
      D: 'Account tiers have no bearing on model conversational formatting style.',
    },
    references: [
      { title: 'Control Output Format', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/control-output-format' }
    ]
  },
];
