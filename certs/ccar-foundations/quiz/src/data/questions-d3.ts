import type { Question } from '../types';

export const questionsD3: Question[] = [
  {
    id: 48,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are building a customer service bot that categorizes incoming emails. The bot frequently mixes up its system instructions with the actual user email content, leading to categorizations that describe the prompt itself rather than the email.',
    question: 'How should you modify the prompt structure to resolve this instruction-following issue?',
    options: [
      { label: 'A', text: 'Wrap the user email content in <email> XML tags and place it clearly separated from the system instructions.' },
      { label: 'B', text: 'Add a natural language plea: "Please do not categorize the instructions, only categorize the email."' },
      { label: 'C', text: 'Use a larger model like Opus instead of Haiku to improve comprehension.' },
      { label: 'D', text: 'Force the model to output a JSON schema by appending "Return JSON" to the system prompt.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'XML Tag Demarcation for Rigid Separation of Data and Instructions',
    explanation: 'Claude is trained to pay special attention to XML tags. When you separate the data (user email) from the instructions using XML tags like `<email>`, it creates a clear boundary.\n\nBy placing the text within tags, Claude understands that this section is the payload to process, not additional instructions. This eliminates confusion and prevents the model from acting on the content as if it were a command.\n\n```xml\n<system_instructions>\nCategorize the following email.\n</system_instructions>\n<email>\n{{USER_EMAIL_CONTENT}}\n</email>\n```\n\n',
    distractorAnalysis: {
      B: 'Adding a natural language plea is "hope-based prompting." It doesn\'t fundamentally fix the ambiguity of where instructions end and data begins. The model can easily lose track of such instructions in long context windows.',
      C: 'Over-engineering by switching to a more expensive model doesn\'t solve poor prompt structure, which is the root cause. Even Opus can get confused if data and instructions are completely mixed together.',
      D: 'Forcing JSON output doesn\'t help the model differentiate between the input data and the system prompt instructions. It will simply return a JSON object containing the wrong categorization.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 49,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'Your financial analysis agent needs to process Q3 earnings reports and extract specific metrics. However, when processing very long reports, the agent sometimes misses key figures or hallucinates numbers that were not in the document.',
    question: 'Which approach minimizes hallucinations and improves extraction accuracy for long documents?',
    options: [
      { label: 'A', text: 'Ask the model to extract the metrics immediately without any intermediate steps.' },
      { label: 'B', text: 'Prompt the model to first quote the relevant sections of the report in <quotes> tags before extracting the metrics.' },
      { label: 'C', text: 'Break the report into 500-token chunks and make separate API calls for each chunk.' },
      { label: 'D', text: 'Set the temperature to 0.0 and use the top_k parameter to restrict token selection.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Verbatim Quote Grounding to Eliminate Extraction Hallucinations',
    explanation: 'When asking Claude to extract information from long documents, having it first extract exact quotes significantly reduces hallucinations.\n\nThis technique forces the model to ground its response in the source material before synthesizing or extracting the final answer, acting as a form of Chain-of-Thought reasoning.\n\n```xml\nFirst, extract the exact sentences containing revenue metrics into <quotes> tags.\nThen, use those quotes to build the final JSON extraction.\n```\n\n',
    distractorAnalysis: {
      A: 'Asking for immediate extraction increases the likelihood of hallucination on long contexts. The model benefits from a "scratchpad" to locate the data before finalizing output.',
      C: 'Chunking destroys the global context of the document, which might be necessary if metrics are referenced across different sections. Furthermore, maintaining chunks is computationally complex compared to utilizing Claude\'s large context window.',
      D: 'While lowering temperature reduces randomness, it doesn\'t inherently force the model to find the correct information in a large context. It merely makes the potential hallucination more deterministic.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 50,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are using Claude to generate SQL queries from natural language. You need the output to strictly be a valid SQL query without any conversational filler like "Here is your query:".',
    question: 'What is the most reliable way to ensure the response contains only the SQL query?',
    options: [
      { label: 'A', text: 'Prefill the Assistant message with "SELECT" and append it to the final prompt.' },
      { label: 'B', text: 'Tell the model "Under no circumstances should you include conversational filler."' },
      { label: 'C', text: 'Use the tool_choice parameter and force the model to call a dummy tool with the SQL query as an argument.' },
      { label: 'D', text: 'Both A and C are highly effective.' }
    ],
    correctAnswer: 'D',
    keyConcept: 'Prefilling Assistant Messages and Tool Forcing for Structured Output',
    explanation: 'Both prefilling the Assistant message and forcing tool use are highly effective techniques for structured output.\n\nPrefilling the assistant response with "SELECT" forces the model to continue directly from that word, bypassing conversational filler. Alternatively, defining a tool (e.g., `execute_sql`) and forcing the model to use it guarantees the output will be structured as a JSON argument.\n\n```python\n# Using Prefill\nmessages.append({"role": "assistant", "content": "SELECT "})\n```\n\n',
    distractorAnalysis: {
      A: 'A is correct, but C is also correct. D encompasses both. Prefilling is an excellent way to force a raw string output.',
      B: 'Negative constraints are often less reliable than prefilling or tool forcing. The model may still apologize or prepend text like "Understood, here is the query without filler:".',
      C: 'C is correct, but A is also correct. D encompasses both. Tool forcing is the best way to guarantee a structured JSON payload.'
    },
    references: [
      { title: 'Anthropic API Docs — Prefill Responses', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prefill-responses' },
      { title: 'Anthropic API Docs — Forcing Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use' }
    ]
  },
  {
    id: 51,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are defining an MCP tool for an agent to search an internal knowledge base. The tool requires a query string and an optional category filter. The model occasionally provides invalid categories that cause the tool to fail.',
    question: 'How should you modify the tool definition to prevent the model from hallucinating invalid categories?',
    options: [
      { label: 'A', text: 'Add a natural language instruction in the prompt telling it to only use valid categories.' },
      { label: 'B', text: 'Define the category property in the JSON schema as an enum with the exact valid category strings.' },
      { label: 'C', text: 'Make the category parameter required instead of optional.' },
      { label: 'D', text: 'Return a 500 Internal Server Error when an invalid category is provided.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Schema-Level \'enum\' Constraints for Deterministic Value Enforcement',
    explanation: 'When defining tools, leveraging JSON schema features like `enum` is the most robust way to constrain the model\'s choices.\n\nClaude understands JSON schema natively and will restrict its outputs to the provided enum values, virtually eliminating category hallucinations.\n\n```json\n"category": {\n  "type": "string",\n  "enum": ["engineering", "sales", "hr", "finance"]\n}\n```\n\n',
    distractorAnalysis: {
      A: 'Relying on natural language is less strict and prone to failure compared to schema constraints. The model might still make a typographical error that breaks the API.',
      C: 'Making it required doesn\'t stop the model from hallucinating an invalid string. It just forces the model to always hallucinate a string.',
      D: 'Error handling is reactive; using an enum prevents the error proactively. Providing a 500 error does not help the model self-correct easily.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 52,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are designing a complex multi-step reasoning task for Claude. The task involves analyzing legal contracts. You notice the model occasionally jumps to conclusions too quickly.',
    question: 'Which approach will best guide the model\'s reasoning process?',
    options: [
      { label: 'A', text: 'Increase the top_p parameter to allow more diverse token generation.' },
      { label: 'B', text: 'Instruct the model to write its step-by-step thinking inside <thinking> tags before providing the final answer.' },
      { label: 'C', text: 'Use a system prompt that says "You are a highly analytical legal expert."' },
      { label: 'D', text: 'Provide 50 examples of correct analyses in the prompt.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Chain-of-Thought Reasoning via \'<thinking>\' Tags for Complex Analysis',
    explanation: 'Encouraging the model to use a scratchpad, often implemented via `<thinking>` tags, forces Chain-of-Thought reasoning.\n\nThis gives the model space to break down the problem, evaluate evidence, and plan its response before committing to a final answer, significantly reducing hasty conclusions.\n\n```xml\nPlease evaluate the contract.\nFirst, wrap your step-by-step legal analysis in <thinking> tags.\nThen, provide the final verdict in <verdict> tags.\n```\n\n',
    distractorAnalysis: {
      A: 'Altering sampling parameters does not enforce a structured reasoning process. Increasing top_p will just make the hasty conclusions more varied and potentially less accurate.',
      C: 'Role-prompting alone is insufficient for complex multi-step reasoning without a structured methodology. While helpful, it doesn\'t provide the structural space for the model to "think".',
      D: 'While few-shot prompting is helpful, providing 50 long examples is inefficient and doesn\'t replace explicit step-by-step reasoning instructions. It also vastly increases token costs.'
    },
    references: [
      { title: 'Anthropic API Docs — Extended Thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' }
    ]
  },
  {
    id: 53,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are deploying an automated technical support agent that troubleshoots customer database issues. The agent has access to several diagnostic tools. However, you notice the agent frequently invokes tools prematurely without properly analyzing the customer\'s initial error logs, leading to unnecessary API calls and confused responses.',
    question: 'How can you structure your prompt to ensure the agent analyzes the logs before calling any tools?',
    options: [
      { label: 'A', text: 'Increase the model temperature to encourage more thorough log analysis.' },
      { label: 'B', text: 'Require the agent to output its analysis inside <thinking> tags prior to emitting a tool invocation.' },
      { label: 'C', text: 'Set tool_choice to "auto" so the model knows it has the option not to use tools immediately.' },
      { label: 'D', text: 'Place the logs at the very bottom of the user prompt to emphasize their importance.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Enforcing Pre-Invocation Error Log Analysis with \'<thinking>\' Blocks',
    explanation: 'By enforcing a Chain-of-Thought process using `<thinking>` tags, you require the model to explicitly reason about the problem before taking action.\n\nThis structured reasoning phase gives the model the opportunity to analyze the error logs and plan its diagnostic steps, which prevents premature or unnecessary tool invocations.\n\n',
    distractorAnalysis: {
      A: 'Increasing temperature adds randomness, which does not enforce structured analysis and might make responses less reliable. Randomness is the opposite of methodical log analysis.',
      C: '"auto" is the default behavior. It does not force the model to analyze logs before making a decision, so the model may still jump straight to tool usage.',
      D: 'While placing context at the end can help with recall, it does not guarantee the model will perform analysis before calling a tool. Structural constraints like thinking tags are required.'
    },
    references: [
      { title: 'Anthropic API Docs — Extended Thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' }
    ]
  },
  {
    id: 54,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'Your team is building a legal compliance checker. The model must review a contract, identify risky clauses, and then return a structured JSON summary. Often, the model skips evaluating the risk severity and just outputs a hastily formatted JSON object.',
    question: 'Which prompting strategy best ensures the model thoroughly evaluates the contract before generating the final JSON?',
    options: [
      { label: 'A', text: 'Instruct the model to conduct a step-by-step risk assessment within <scratchpad> tags, then format the final output as JSON.' },
      { label: 'B', text: 'Add negative constraints telling the model "do not skip the risk severity evaluation under any circumstances."' },
      { label: 'C', text: 'Provide a larger context window so the model can read the contract more slowly.' },
      { label: 'D', text: 'Use a system prompt that strictly enforces a JSON-only response format.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Dedicated Scratchpad Blocks for Step-by-Step Risk Evaluation before JSON',
    explanation: 'Using a `<scratchpad>` or `<thinking>` block encourages the model to perform Chain-of-Thought reasoning.\n\nBy instructing the model to perform its risk assessment in this designated area first, it builds the necessary context and evaluation logic. Once the reasoning is complete, it can accurately populate the final JSON structure based on that thorough evaluation.\n\n',
    distractorAnalysis: {
      B: 'Negative constraints are generally less effective than providing a structured space for reasoning. The model may acknowledge the instruction but still fail the execution if it has no room to think.',
      C: 'The context window size dictates how much data can be inputted, not the depth of the model\'s reasoning process. The model processes the whole context simultaneously, it does not "read more slowly".',
      D: 'Forcing JSON-only output actually prevents the model from doing any written reasoning, likely exacerbating the hasty output issue. The model needs a text buffer to perform calculations.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 55,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You have designed an internal HR agent that handles employee vacation requests. The agent uses a tool to check vacation balances. To prevent errors, you want the agent to explicitly verify the employee ID and date format before executing the tool call.',
    question: 'What is the most reliable method to enforce this verification step?',
    options: [
      { label: 'A', text: 'Configure the tool definition to accept only pre-verified data.' },
      { label: 'B', text: 'Instruct the agent to write a <verification> block confirming the ID and dates before invoking the tool.' },
      { label: 'C', text: 'Pass the employee ID and dates as system prompt variables so they are implicitly verified.' },
      { label: 'D', text: 'Limit the max_tokens parameter so the model cannot generate invalid formats.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Articulated Verification Blocks prior to Executing State-Modifying Tools',
    explanation: 'Instructing the model to output a specific XML block, such as `<verification>`, creates a dedicated space for Chain-of-Thought reasoning.\n\nThis forces the model to articulate its checks on the employee ID and dates. By writing out the verification steps before emitting the tool call, the model is much less likely to pass malformed data to the tool.\n\n',
    distractorAnalysis: {
      A: 'The tool definition defines the schema, but the model still needs to extract and verify the data accurately from the conversation. The schema cannot verify whether an ID belongs to a specific user contextually.',
      C: 'Passing variables does not guarantee the model will correctly map them to the tool arguments without verification. The model must still execute the logic properly.',
      D: 'Limiting max_tokens will just truncate the response, not improve its accuracy or adherence to formats. Truncation breaks tool calls entirely.'
    },
    references: [
      { title: 'Anthropic API Docs — Extended Thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' }
    ]
  },
  {
    id: 56,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'An enterprise architecture team is using Claude to generate initial threat models for new software designs. The threat models need to be comprehensive, covering spoofing, tampering, and information disclosure. The initial outputs are often shallow and miss subtle edge cases.',
    question: 'Which technique should you apply to deepen the model\'s analysis and uncover subtle threats?',
    options: [
      { label: 'A', text: 'Use a tool to query a known vulnerabilities database.' },
      { label: 'B', text: 'Prompt the model to outline its reasoning process step-by-step using <thinking> tags before listing the threats.' },
      { label: 'C', text: 'Reduce the temperature to 0 to make the outputs more deterministic.' },
      { label: 'D', text: 'Format the request as a JSON object to enforce strict schema adherence.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Deepening Threat Modeling via Chain-of-Thought Deliberation',
    explanation: 'For complex analytical tasks like threat modeling, enforcing a Chain-of-Thought process is crucial.\n\nBy requiring the model to write out its reasoning inside `<thinking>` tags, it systematically evaluates the architecture against different threat vectors before jumping to conclusions. This structured deliberation leads to a more comprehensive and nuanced final output.\n\n',
    distractorAnalysis: {
      A: 'While querying a database might provide facts, it does not improve the model\'s architectural reasoning capabilities. The model must still synthesize those facts into a coherent model.',
      C: 'Lowering temperature reduces creativity, which might actually hinder the model from identifying subtle or novel edge cases. Low temperature leads to very standard, basic outputs.',
      D: 'Enforcing a JSON schema organizes the output but does not deepen the underlying reasoning process. JSON actually restricts the free-form reasoning space if not coupled with a thinking tag.'
    },
    references: [
      { title: 'Anthropic API Docs — Extended Thinking', url: 'https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking' }
    ]
  },
  {
    id: 57,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are building a pipeline that extracts named entities from news articles. The downstream system requires the output to be strictly formatted as a JSON array of strings. Even with explicit instructions, Claude occasionally includes a conversational prefix like "Here are the entities:".',
    question: 'How can you guarantee the output contains only the JSON array without relying on tool forcing?',
    options: [
      { label: 'A', text: 'Prefill the assistant\'s response with a `[` character.' },
      { label: 'B', text: 'Set the output_format parameter to "json_array".' },
      { label: 'C', text: 'Append "CRITICAL: DO NOT INCLUDE CONVERSATIONAL FILLER" to the system prompt.' },
      { label: 'D', text: 'Lower the temperature to 0.1.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Assistant Response Prefilling (\'[\') to Suppress Conversational Filler',
    explanation: 'Prefilling the assistant\'s response is a powerful technique to control output formatting. By starting the assistant\'s turn with `[`, you force Claude to continue generating from that exact point.\n\nThis effectively bypasses any introductory conversational filler and ensures the output begins directly with the required JSON array structure.\n\n```python\nmessages.append({"role": "assistant", "content": "["})\n# The model\'s output will immediately continue with the rest of the array elements\n```\n\n',
    distractorAnalysis: {
      B: 'There is no built-in "output_format" parameter that magically enforces a JSON array in the Anthropic API without prefilling or tool use.',
      C: 'Negative constraints are notoriously unreliable for completely eliminating conversational filler. The model often apologizes for using filler, which itself is filler.',
      D: 'Temperature affects token probability, not structural adherence. A low-temperature model can still consistently output conversational filler if it thinks it is polite.'
    },
    references: [
      { title: 'Anthropic API Docs — Prefill Responses', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prefill-responses' }
    ]
  },
  {
    id: 58,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'Your e-commerce application uses Claude to summarize product reviews and assign a sentiment score. You want the output to strictly adhere to a specific JSON schema with properties for "summary" and "score".',
    question: 'Which method provides the strongest guarantee that the model will adhere to your specific JSON schema?',
    options: [
      { label: 'A', text: 'Provide an example of the expected JSON in the prompt.' },
      { label: 'B', text: 'Use the tool_choice parameter to force the model to use a custom tool defined with your JSON schema.' },
      { label: 'C', text: 'Prefill the assistant response with `{\n "summary": "`.' },
      { label: 'D', text: 'Instruct the model to validate its own output against the schema before responding.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Enforcing Exact JSON Output via \'tool_choice\' Schema Forcing',
    explanation: 'Using the tool use API is the most robust way to enforce structured JSON output. By defining a tool with your exact JSON schema and using `tool_choice: {"type": "tool", "name": "your_tool_name"}`, you force Claude to generate arguments that match the schema.\n\nThe model is highly tuned to obey tool schemas, making this much more reliable than prompt-based instructions alone.\n\n',
    distractorAnalysis: {
      A: 'While few-shot examples help, they do not provide the strict enforcement mechanisms inherent to the tool use API. The model might still miss keys or hallucinate new ones.',
      C: 'While prefilling starts the JSON object, it does not guarantee the model will adhere to the full schema (e.g., proper types or missing fields) later in the generation. It only guarantees the first few tokens.',
      D: 'Asking the model to self-validate is prone to hallucination; it cannot execute external validation scripts on its own output during generation.'
    },
    references: [
      { title: 'Anthropic API Docs — Forcing Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use' }
    ]
  },
  {
    id: 59,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are developing an automated medical coding assistant. The agent needs to extract diagnosis codes from clinical notes. You decide to define an extraction tool to enforce structured output, but you notice the agent sometimes ignores the tool and replies conversationally.',
    question: 'How do you configure the API request to ensure the agent ALWAYS uses the extraction tool?',
    options: [
      { label: 'A', text: 'Set `tool_choice` to `{"type": "any"}`.' },
      { label: 'B', text: 'Set `tool_choice` to `{"type": "tool", "name": "extract_codes"}`.' },
      { label: 'C', text: 'Include a strict command in the system prompt: "You must use the extract_codes tool."' },
      { label: 'D', text: 'Remove all conversational abilities by setting the top_k parameter to 1.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Constraining Parameter Diversity with Schema \'enum\' vs Sampling Parameters',
    explanation: 'To guarantee that Claude uses a specific tool, you must explicitly force it using the `tool_choice` parameter.\n\nBy setting `tool_choice` to `{"type": "tool", "name": "extract_codes"}`, you instruct the API to reject any response that does not invoke this specific tool, ensuring 100% compliance with your structured output requirements.\n\n```python\nresponse = client.messages.create(\n    model="claude-3-5-sonnet-20241022",\n    tools=[extract_codes_tool],\n    tool_choice={"type": "tool", "name": "extract_codes"},\n    messages=[...]\n)\n```\n\n',
    distractorAnalysis: {
      A: '`{"type": "any"}` forces the model to use *some* tool, but if multiple tools are provided, it doesn\'t guarantee the use of `extract_codes`. If it is the only tool, `any` works, but specifying by name is safer.',
      C: 'System prompt commands can be ignored by the model, especially in complex edge cases. They do not carry the hard mechanical guarantee of the `tool_choice` parameter.',
      D: 'Modifying sampling parameters like top_k restricts token diversity but does not enforce tool usage. It just makes the conversational response incredibly robotic.'
    },
    references: [
      { title: 'Anthropic API Docs — Forcing Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use#forcing-tool-use' }
    ]
  },
  {
    id: 60,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'Your startup uses Claude to translate natural language user queries into complex GraphQL queries. You have provided a system prompt with schema details, but occasionally the model wraps the GraphQL output in markdown formatting (```graphql ... ```), breaking your parser.',
    question: 'What is the simplest way to prevent the model from outputting markdown code blocks?',
    options: [
      { label: 'A', text: 'Write a regex pattern in your application to strip the markdown tags post-generation.' },
      { label: 'B', text: 'Prefill the assistant response with the first word of the query (e.g., `query {`).' },
      { label: 'C', text: 'Define a tool that accepts the GraphQL query as a string argument.' },
      { label: 'D', text: 'Use the `stop_sequences` parameter to halt generation at the first backtick.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Comparison of Assistant Prefilling vs Tool Forcing for Complex Schemas',
    explanation: 'Prefilling the assistant\'s response is the simplest and most effective way to dictate the exact starting format of the output.\n\nBy prefilling with `query {` (or similar starting tokens), you bypass the initial backticks and formatting text the model might otherwise generate. The model will seamlessly continue writing the query from that point.\n\n',
    distractorAnalysis: {
      A: 'While parsing is a valid fallback, the question asks for the simplest way to prevent the model from *outputting* the markdown in the first place. Fixing it post-generation is a workaround, not a solution to the generation issue.',
      C: 'Defining a tool is heavier and more complex than a simple prefill for a plain string output. Tools are overkill if you just need a raw string format.',
      D: 'Stopping at a backtick might prematurely cut off a legitimate query that happens to use backticks internally, and it doesn\'t fix the initial markdown wrapper.'
    },
    references: [
      { title: 'Anthropic API Docs — Prefill Responses', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prefill-responses' }
    ]
  },
  {
    id: 61,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are using Claude to categorize customer feedback into one of five predefined buckets. You want to receive just the category name in JSON format. You decide to use JSON Mode.',
    question: 'Which of the following must you include in your API call to successfully use JSON Mode?',
    options: [
      { label: 'A', text: 'Set `json_mode: true` in the top-level API parameters.' },
      { label: 'B', text: 'Explicitly ask Claude to output JSON in your prompt and ensure your application parses the response.' },
      { label: 'C', text: 'Provide a JSON schema definition in the `schema` parameter.' },
      { label: 'D', text: 'Use the `tool_choice` parameter with type "json".' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Anthropic API JSON Extraction Mechanics (Tool Use vs OpenAI JSON Mode)',
    explanation: 'Unlike some other providers, Anthropic does not have a dedicated `json_mode: true` flag in the API for standard text generation. To get JSON output, you must explicitly prompt Claude to return JSON.\n\nYou typically accomplish this by giving clear instructions, providing a schema or example in the prompt, and prefilling the assistant response with `{` to guarantee the format.\n\n',
    distractorAnalysis: {
      A: 'There is no top-level `json_mode: true` parameter in the standard Anthropic Messages API. This is a common point of confusion for developers migrating from other LLMs.',
      C: 'The `schema` parameter does not exist; schemas are used within tool definitions, not as a standalone standard API parameter for raw text.',
      D: '"json" is not a valid type for `tool_choice` (valid types include "auto", "any", and "tool").'
    },
    references: [
      { title: 'Anthropic API Docs — JSON Mode', url: 'https://docs.anthropic.com/en/docs/build-with-claude/json-mode' }
    ]
  },
  {
    id: 62,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'A financial services company uses Claude to extract risk factors from quarterly reports. The prompt works well for standard reports but fails completely when a report uses unusual formatting or omits standard sections.',
    question: 'How should you modify your few-shot examples to improve robustness?',
    options: [
      { label: 'A', text: 'Provide more examples of standard, well-formatted reports.' },
      { label: 'B', text: 'Include edge cases in your examples, such as reports with missing sections or abnormal formatting.' },
      { label: 'C', text: 'Remove all examples and rely purely on zero-shot reasoning.' },
      { label: 'D', text: 'Include negative examples showing what the model should NOT do.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Few-Shot Example Distribution Balance with Representative Edge Cases',
    explanation: 'Few-shot prompting is most effective when the examples represent the actual distribution of inputs the model will face, including edge cases.\n\nBy including examples of poorly formatted or atypical reports, you teach the model how to gracefully handle ambiguity and extract data even when standard patterns are broken.\n\n',
    distractorAnalysis: {
      A: 'Adding more of the same easy examples does not teach the model how to handle difficult edge cases. It just reinforces the happy path.',
      C: 'Zero-shot is generally less robust than a well-designed few-shot prompt for complex extraction tasks. Without examples, the model will struggle with edge cases even more.',
      D: 'Models generally learn better from positive examples of correct behavior rather than negative examples of incorrect behavior. Teaching the model *how* to handle the bad formatting is better than just telling it not to fail.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 63,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are training a model to format citations in a highly specific, proprietary academic format. You have provided instructions, but the model occasionally slips back into standard APA or MLA formats.',
    question: 'What is the most effective way to ensure the model strictly adheres to your proprietary citation format?',
    options: [
      { label: 'A', text: 'Use a larger model to better understand the instructions.' },
      { label: 'B', text: 'Provide 3 to 5 highly representative positive examples of the proprietary format in the prompt.' },
      { label: 'C', text: 'Explicitly tell the model "Do not use APA or MLA format."' },
      { label: 'D', text: 'Set the temperature to 0.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Demonstrating Malformed and Missing Field Handling in Few-Shot Examples',
    explanation: 'For highly specific or idiosyncratic formatting tasks, few-shot prompting with representative positive examples is the most powerful technique.\n\nShowing the model exactly what the correct output looks like anchors its generation process to your specific pattern, far more effectively than abstract instructions alone.\n\n```xml\n<example>\nInput: Smith 2023 Journal of Science\nOutput: [PRP-CITE: SMITH(23)-JoS]\n</example>\n```\n\n',
    distractorAnalysis: {
      A: 'Even large models have strong priors for common formats (like APA); few-shot examples are needed to override these priors. The model\'s internal weights heavily favor standard formats.',
      C: 'Negative constraints are weaker than demonstrating the desired positive behavior. Mentioning APA or MLA might inadvertently trigger the model to generate them.',
      D: 'Lowering temperature only makes the model more deterministic in outputting whatever format it thinks is best, which might still be APA. It does not teach the proprietary format.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 64,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are designing a few-shot prompt to teach Claude how to categorize IT support tickets. You want to wrap your examples in XML tags to ensure Claude distinguishes them from the current user request.',
    question: 'Which tag structure is considered a best practice for providing examples to Claude?',
    options: [
      { label: 'A', text: 'Use `<example>` tags containing `<user>` and `<assistant>` sub-tags for each interaction.' },
      { label: 'B', text: 'Use `<training_data>` tags and format the examples as a JSON array.' },
      { label: 'C', text: 'Use `<system>` tags to encapsulate all previous conversations.' },
      { label: 'D', text: 'Use `<history>` tags containing plain text transcripts.' }
    ],
    correctAnswer: 'A',
    keyConcept: 'Maintaining Schema Stability Across Long-Context Few-Shot Batches',
    explanation: 'When providing few-shot examples, it is best practice to clearly demarcate the examples using XML tags.\n\nUsing `<example>` tags, and explicitly showing the turn-by-turn interaction with `<user>` and `<assistant>` tags inside, perfectly maps to Claude\'s conversational training. This clearly separates the demonstration data from the actual task.\n\n',
    distractorAnalysis: {
      B: 'Formatting conversational examples as JSON is less natural for Claude than using XML tags representing dialogue turns. Claude is optimized for XML syntax in prompts.',
      C: '`<system>` tags are for instructions, not for delineating examples. Overloading system tags confuses the model\'s instruction-following hierarchy.',
      D: 'Plain text transcripts are harder for the model to parse cleanly compared to structured XML. Lack of structure can cause the model to confuse where the example ends and the task begins.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 65,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'Your application evaluates student essays and assigns a letter grade. You notice that if you provide 10 examples of "A" grade essays in your prompt, the model starts assigning "A" grades to almost every essay it sees.',
    question: 'What concept explains this behavior and how should you fix it?',
    options: [
      { label: 'A', text: 'Context collapse. Fix it by reducing the number of examples to 2.' },
      { label: 'B', text: 'Overfitting. Fix it by lowering the temperature to 0.2.' },
      { label: 'C', text: 'Class imbalance. Fix it by providing an equal distribution of examples across all letter grades (A, B, C, D, F).' },
      { label: 'D', text: 'Recency bias. Fix it by placing the user\'s essay at the top of the prompt.' }
    ],
    correctAnswer: 'C',
    keyConcept: 'Avoiding Negative Demonstration Traps in Few-Shot Prompt Design',
    explanation: 'Models are highly sensitive to the distribution of examples provided in a few-shot prompt. If you provide examples skewed heavily toward one class (e.g., all "A" essays), the model develops a bias toward that class.\n\nTo ensure accurate evaluation, your few-shot examples must be representative and balanced across all possible outputs.\n\n',
    distractorAnalysis: {
      A: 'A is incorrect. While reducing examples might lessen the bias, it doesn\'t solve the root cause, which is the lack of diverse examples for other grades. You need a balanced representation, not just fewer examples.',
      B: 'Lowering temperature will actually make the model more rigidly adhere to the biased pattern established by the examples. Determinism increases the impact of the bias.',
      D: 'Recency bias refers to weighting recent tokens more heavily; it does not explain systemic bias caused by uniform examples. The issue here is the uniformity of the few-shot data.'
    },
    references: [
      { title: 'Anthropic API Docs — Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' }
    ]
  },
  {
    id: 66,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You are using Claude to generate complex configuration files based on a Pydantic schema. Despite your best prompting efforts, the model occasionally outputs invalid syntax that fails Pydantic validation.',
    question: 'What is the most resilient architectural pattern to handle these validation failures?',
    options: [
      { label: 'A', text: 'Switch to a different LLM provider that guarantees 100% schema compliance.' },
      { label: 'B', text: 'Implement a validation-retry loop: catch the Pydantic error and send it back to Claude as a new user message asking for a correction.' },
      { label: 'C', text: 'Write a fallback regex script to manually repair the broken configuration file.' },
      { label: 'D', text: 'Return a generic error message to the user and ask them to try again later.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Pydantic Validation-Retry Loops with Injected Parser Errors',
    explanation: 'LLMs are probabilistic and will occasionally make formatting errors. The most robust engineering pattern is the validation-retry loop.\n\nBy catching the parser or validation error (like a Pydantic validation exception) and feeding that exact error string back to Claude, the model can use its self-correction capabilities to fix the syntax and return a valid response.\n\n```python\ntry:\n    config = parse_pydantic(response)\nexcept ValidationError as e:\n    # Retry loop logic:\n    messages.append({"role": "user", "content": f"Validation failed: {str(e)}. Please correct it."})\n```\n\n',
    distractorAnalysis: {
      A: 'No LLM can mathematically guarantee 100% schema compliance for complex, nested structures without a retry mechanism. All LLMs are probabilistic.',
      C: 'Writing custom regex to fix complex configuration files is fragile and scales poorly compared to letting the LLM self-correct. Regex cannot fix missing keys or structural issues.',
      D: 'It provides a poor user experience when the system could automatically recover. Agents should hide these temporary failures from the user.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  },
  {
    id: 67,
    domain: 3,
    domainName: 'Prompt Engineering & Structured Output',
    scenario: 'You have implemented a retry loop that sends JSON parser errors back to Claude when it fails to generate valid structured output. However, in rare edge cases, the model gets stuck in an infinite loop, repeatedly generating the same invalid JSON.',
    question: 'How must you modify your validation-retry architecture to prevent infinite loops?',
    options: [
      { label: 'A', text: 'Increase the temperature slightly on each retry attempt.' },
      { label: 'B', text: 'Implement a strict bounded retry limit (e.g., max 3 retries) and implement a graceful fallback.' },
      { label: 'C', text: 'Send the error message in all caps so the model understands the urgency.' },
      { label: 'D', text: 'Wipe the conversation history on each retry so the model starts fresh.' }
    ],
    correctAnswer: 'B',
    keyConcept: 'Bounded Retry Loops with Targeted Error Feedback for Malformed JSON',
    explanation: 'When implementing self-correction loops with LLMs, it is a critical safety practice to implement a bounded retry limit.\n\nIf the model is fundamentally confused or lacking context, it may repeatedly fail. Setting a maximum retry limit prevents infinite API calls, controls costs, and allows your application to fail gracefully.\n\n',
    distractorAnalysis: {
      A: 'While increasing temperature might break a deterministic loop, it doesn\'t prevent infinite looping if the model just invents new ways to fail. It is not a reliable structural fix.',
      C: 'Capitalizing text does not functionally improve the model\'s debugging capabilities. It is simply hope-based prompting.',
      D: 'Wiping the history removes the context of what the model previously tried and failed at, defeating the purpose of a self-correction loop. The model needs to see the error to fix it.'
    },
    references: [
      { title: 'Anthropic API Docs — Tool Use', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use' }
    ]
  }
];
