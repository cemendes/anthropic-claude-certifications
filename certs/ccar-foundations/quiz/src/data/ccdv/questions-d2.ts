import type { Question } from '../../types';

export const questionsD2: Question[] = [
  {
    id: 201,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: 'You want to build a triage assistant that is strictly forced to execute at least one tool from the tools array on the user query, but Claude should autonomously decide which tool is most appropriate.',
    question: 'Which tool_choice configuration should you provide in the request?',
    options: [
      { label: 'A', text: 'tool_choice={"type": "auto"}' },
      { label: 'B', text: 'tool_choice={"type": "any"}' },
      { label: 'C', text: 'tool_choice={"type": "required"}' },
      { label: 'D', text: 'tool_choice={"type": "tool", "name": "all"}' }
    ],
    correctAnswer: 'B',
    keyConcept: 'tool_choice any mode',
    explanation: 'tool_choice: {"type": "any"} forces the model to choose and invoke at least one tool from the provided tools list, rather than responding with plain conversational text.',
    distractorAnalysis: {
      A: '"auto" allows Claude to answer with plain text without invoking any tool.',
      C: '"required" is OpenAI schema syntax, not supported in Anthropic Messages API.',
      D: 'To force a specific tool, you must name a real tool in the list, not "all".'
    },
    references: [
      { title: 'Anthropic Tool Choice Documentation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use' }
    ]
  },
  {
    id: 202,
    domain: 2,
    domainName: 'Tool Calling & JSON Schemas',
    scenario: 'A local database query fails due to a timeout after Claude triggers a tool_use block with id "toolu_xyz".',
    question: 'How should the application report this failure back to Claude in the subsequent turn?',
    options: [
      { label: 'A', text: 'Throw an unhandled exception in the client and disconnect the session.' },
      { label: 'B', text: 'Send a user message with a tool_result block containing tool_use_id: "toolu_xyz", content: "Timeout error", and is_error: true.' },
      { label: 'C', text: 'Send an assistant message with role: "error" and the error message string.' },
      { label: 'D', text: 'Omit the tool_result block and ask the user to rephrase their prompt.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Graceful Tool Error Handling with is_error',
    explanation: 'When a tool execution fails locally, return a tool_result block with is_error: true. This allows Claude to see the exact error and either retry with adjusted parameters or explain the issue gracefully to the user.',
    distractorAnalysis: {
      A: 'Crashing the client stops the conversational workflow.',
      C: 'There is no role: "error" in the Messages API schema.',
      D: 'Omitting the tool_result for a pending tool_use will trigger an HTTP 400 validation error.'
    },
    references: [
      { title: 'Anthropic Handling Tool Errors', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#handling-errors' }
    ]
  }
];
