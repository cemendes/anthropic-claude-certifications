import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 201,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: "A developer asks Claude in the web interface: 'Write a Python function to check if a string is a palindrome.' The output is an 8-line code block. In the next turn, the developer asks: 'Write a complete Flask web server with user authentication, route guards, and SQLite models.' The output is a 120-line file.",
    question: 'How will Claude display these two responses with respect to the Artifacts panel?',
    options: [
      { label: 'A', text: 'The 8-line snippet will remain inline in the chat; the 120-line Flask application will render as a dedicated standalone Artifact.' },
      { label: 'B', text: 'Both snippets will automatically render as Artifacts because all code is isolated from chat.' },
      { label: 'C', text: 'Both snippets will remain inline in the chat because Python code cannot be rendered in an Artifact panel.' },
      { label: 'D', text: 'The 8-line snippet triggers an Artifact, while the 120-line code triggers an immediate file download prompt.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'The 15-Line Artifact Trigger Heuristic',
    explanation: 'Claude uses a well-defined heuristic for Artifacts: substantial, self-contained content (generally >= 15 lines of code or multi-paragraph standalone documents) that users are likely to edit, run, or reuse generates an Artifact. Short conversational snippets (< 15 lines) remain inline in the chat.',
    distractorAnalysis: {
      B: 'Short conversational code snippets stay inline to avoid cluttering the interface with trivial snippets.',
      C: 'Artifacts support all programming languages, Markdown, HTML, SVG, and React, not just browser-executable languages.',
      D: 'Artifacts display in the side-by-side interactive viewer; they do not force immediate file download prompts.',
    },
    references: [
      { title: 'About Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 202,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A front-end designer asks Claude to create an interactive customer dashboard prototype with filter buttons, dynamic bar charts, and a dark-mode toggle.',
    question: 'Which artifact format allows Claude to deliver an immediately clickable, live-rendered interactive component in the Artifact panel?',
    options: [
      { label: 'A', text: 'A React component using Tailwind CSS and Lucide icons (or standalone HTML/JS with inline styles).' },
      { label: 'B', text: 'A Python Streamlit script executed in the browser sandbox.' },
      { label: 'C', text: 'A Dockerfile specifying an Nginx container image.' },
      { label: 'D', text: 'An Adobe Photoshop .PSD binary file.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Interactive React and HTML Artifact Rendering',
    explanation: 'The Claude Artifacts viewer has built-in sandboxed runtime support for rendering React components (with Tailwind CSS and Lucide-React icons) as well as standalone HTML/CSS/JavaScript, allowing users to interact directly with buttons, state, and visual controls.',
    distractorAnalysis: {
      B: 'Claude Web Artifacts sandbox does not execute a server-side Python runtime or Streamlit daemon.',
      C: 'Dockerfiles are static text artifacts and cannot be interactively rendered as a visual UI component in the browser.',
      D: 'Binary Adobe PSD files cannot be rendered or compiled by Claude Artifacts.',
    },
    references: [
      { title: 'Rendering React Components in Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 203,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A technical writer has Claude generate a comprehensive 10-page API documentation guide in an Artifact. Over 5 subsequent chat turns, the writer asks Claude to update individual sections, add authentication headers, and fix code examples.',
    question: 'How does Claude manage the progression of changes to the document across these turns?',
    options: [
      { label: 'A', text: 'Claude maintains a version history selector at the bottom or top of the Artifact panel, allowing the user to view or revert to previous versions while displaying the latest version.' },
      { label: 'B', text: 'Claude generates 5 completely separate new chat windows, one for each document revision.' },
      { label: 'C', text: 'Claude permanently overwrites the original document in browser memory, making historical revisions unrecoverable.' },
      { label: 'D', text: 'Claude prints git patch diff files directly in the chat and requires the user to apply them manually via terminal.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Artifact Version History and Iterative Refinement',
    explanation: "When an artifact is updated during a conversation, Claude increments the artifact's version. The UI provides a version picker (e.g. 'v1', 'v2', 'v3') allowing users to review previous states or track changes across conversational turns.",
    distractorAnalysis: {
      B: 'Revisions occur within the same conversational thread and Artifact panel, not separate browser windows.',
      C: 'Version history is preserved across the conversation lifecycle and can be freely navigated.',
      D: 'Artifacts provide clean rendered updates and source code views, not mandatory manual git patch application.',
    },
    references: [
      { title: 'Navigating Artifact Versions', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 204,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A software engineer is viewing a generated React component in the Artifacts window. They want to inspect the underlying JSX markup and copy specific functions rather than just interacting with the rendered preview.',
    question: 'Which UI controls inside the Artifact panel enable this capability?',
    options: [
      { label: 'A', text: "The 'Code' and 'Preview' toggle buttons at the top of the Artifact panel." },
      { label: 'B', text: 'Opening Chrome DevTools and inspecting the iframe DOM tree.' },
      { label: 'C', text: 'Sending a new prompt asking Claude to repeat the code in raw plaintext.' },
      { label: 'D', text: 'Downloading the Claude Desktop source code repository.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Code and Preview Toggle Controls',
    explanation: "Visual artifacts (React, HTML, SVG) provide intuitive 'Code' and 'Preview' toggles at the top of the panel, allowing users to instantly switch between the live interactive rendering and the editable source code.",
    distractorAnalysis: {
      B: 'Inspecting through DevTools is unnecessary and complex when native Code view toggles exist.',
      C: 'Re-prompting consumes unnecessary context tokens and time.',
      D: 'Downloading Desktop source code has no relevance to viewing web artifact source.',
    },
    references: [
      { title: 'Using Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 205,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: "A business analyst asks Claude to generate an architecture flowchart comparing three payment gateways. The analyst specifies: 'I want a vector graphic diagram that scales cleanly without pixelation when inserted into executive slides.'",
    question: 'Which artifact format should Claude use to satisfy this scaling requirement directly inside the browser?',
    options: [
      { label: 'A', text: 'An SVG (Scalable Vector Graphics) artifact.' },
      { label: 'B', text: 'A low-resolution 72 DPI PNG raster image.' },
      { label: 'C', text: 'A raw ASCII art block wrapped in triple backticks.' },
      { label: 'D', text: 'An uncompressed BMP bitmap file.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'SVG Vector Graphics in Artifacts',
    explanation: 'SVG artifacts are rendered natively as vector graphics within the Artifacts panel. They scale infinitely without pixelation, can be previewed visually, and allow copying the raw XML/SVG markup for direct embedding in slides or design tools.',
    distractorAnalysis: {
      B: 'Raster PNGs lose fidelity and pixelate when scaled up on high-resolution presentation displays.',
      C: 'ASCII art lacks professional aesthetics and cannot be scaled cleanly as vector graphics.',
      D: 'BMP is a legacy raster format with huge file sizes that lacks responsive vector scaling.',
    },
    references: [
      { title: 'Visual Artifacts Types', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/artifacts' }
    ]
  },
  {
    id: 206,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A developer wants to export a completed Node.js microservice script generated in an Artifact panel to their local workstation to commit it to GitHub.',
    question: 'What is the most direct native method to retrieve the file from the Artifact panel?',
    options: [
      { label: 'A', text: 'Click the download icon located in the bottom-right or top-right header of the Artifact panel to save the file locally with its appropriate extension.' },
      { label: 'B', text: 'Ask Claude to email the file as an attachment to their registered email address.' },
      { label: 'C', text: 'Take a screenshot of the code and run local optical character recognition (OCR).' },
      { label: 'D', text: 'Configure an AWS S3 bucket sync integration inside the Claude Web settings menu.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Artifact Download and Export Capabilities',
    explanation: "Artifacts have native 'Download' and 'Copy to clipboard' controls in their UI header/footer, allowing immediate one-click export of the raw source file directly to the user's local operating system.",
    distractorAnalysis: {
      B: 'Claude Web does not have an automated outbound email dispatch service for artifacts.',
      C: 'Taking screenshots and running OCR is error-prone and unnecessary given native download buttons.',
      D: 'Claude Web does not provide direct S3 bucket synchronization settings for personal chats.',
    },
    references: [
      { title: 'Exporting Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 207,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A product manager wants to share an interactive prototype created in Claude Artifacts with an external client who does not have a Claude account, allowing them to view and interact with the widget.',
    question: 'How can the product manager share this Artifact externally?',
    options: [
      { label: 'A', text: "Click the 'Publish' or 'Share' button on the Artifact to generate a public standalone link that anyone can open in their browser without an account." },
      { label: 'B', text: 'The external client must purchase a Claude Enterprise license before any shared link can be rendered.' },
      { label: 'C', text: 'The manager must invite the client to their personal Google Workspace account.' },
      { label: 'D', text: 'Artifacts cannot be shared; they can only be viewed by the user who initiated the chat session.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Publishing and Sharing Standalone Artifacts',
    explanation: "Claude allows users to publish artifacts to generate a standalone web link. Anyone with the link can view and interact with the published artifact without needing to log in or see the creator's full conversation history.",
    distractorAnalysis: {
      B: 'Recipients do not need a paid Claude account or Enterprise license to interact with public shared artifacts.',
      C: 'Google Workspace permissions are independent of Anthropic artifact hosting.',
      D: 'Artifacts are explicitly designed with public sharing and remix capabilities.',
    },
    references: [
      { title: 'Sharing Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 208,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A data analyst receives an interactive revenue simulation Artifact published by a colleague. The analyst wants to use it as a starting point to test their own regional assumptions.',
    question: "Which action allows the analyst to bring the colleague's published Artifact into their own Claude workspace to continue developing it?",
    options: [
      { label: 'A', text: "Click 'Remix' on the shared Artifact page to load the artifact and its code into a fresh conversation in their own Claude account." },
      { label: 'B', text: 'Fork the underlying GitHub repository using git clone via terminal.' },
      { label: 'C', text: 'Contact Anthropic Support to transfer artifact domain ownership.' },
      { label: 'D', text: 'Re-type the code manually into a prompt from scratch.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Remixing Shared Artifacts',
    explanation: "Published Claude Artifacts include a 'Remix' feature. Clicking 'Remix' copies the artifact and opens a new chat in the user's Claude account, allowing them to prompt Claude to modify, extend, or refine the existing work.",
    distractorAnalysis: {
      B: 'Remixing is a native web feature that requires no external git repository forks.',
      C: 'Support tickets are not involved in standard user artifact collaboration.',
      D: 'Manual re-typing is counterproductive when instant digital remixing is built into the UI.',
    },
    references: [
      { title: 'Remixing Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
  {
    id: 209,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: 'A user notices that Claude is generating an Artifact for every 3-line shell script and minor text response, disrupting the conversational flow of their chat.',
    question: 'How can the user regain control over when Artifacts are created?',
    options: [
      { label: 'A', text: "Explicitly instruct Claude in the prompt or Custom Instructions: 'Keep all short code snippets and explanations inline; only use Artifacts for complete multi-file modules or visual components.'" },
      { label: 'B', text: 'Artifact creation is governed by an unmodifiable hardcoded neural network weight and cannot be influenced by prompts.' },
      { label: 'C', text: 'Reinstall the web browser to reset the default operating threshold.' },
      { label: 'D', text: 'Switch to an incognito window with ad blockers disabled.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Guiding Artifact Creation Behavior',
    explanation: 'While Claude follows standard heuristics for generating artifacts, users can explicitly instruct Claude in their prompt or Custom Instructions to favor inline replies or restrict artifacts to substantial, multi-paragraph documents.',
    distractorAnalysis: {
      B: "Claude's decision to trigger an artifact is highly responsive to conversational instructions and context.",
      C: 'Browser reinstallation has no impact on model generation decisions.',
      D: 'Ad blockers do not dictate server-side artifact decision heuristics.',
    },
    references: [
      { title: 'Prompting for Artifacts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/artifacts' }
    ]
  },
  {
    id: 210,
    domain: 2,
    domainName: 'Artifacts Lifecycle & Component Visualizations',
    scenario: "A student asks Claude to help visualize data structures: 'Show me an animated binary search tree insertion process.'",
    question: 'Which technology combination within Claude Artifacts is most suitable for rendering this interactive, visual computer science tutorial?',
    options: [
      { label: 'A', text: 'A React component using state hooks (useState, useEffect) and SVG elements to animate tree node insertion step-by-step.' },
      { label: 'B', text: 'A compiled C++ binary executable file packaged inside a tar archive.' },
      { label: 'C', text: 'A raw CSV file containing node coordinates.' },
      { label: 'D', text: 'A serialized Java applet requiring browser NPAPI plugins.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Interactive React and SVG Visualizations',
    explanation: 'React combined with SVG allows full stateful animations, dynamic DOM tree updates, and interactive controls (Play, Pause, Step Next) within the safe browser-rendered Artifact sandbox.',
    distractorAnalysis: {
      B: 'Compiled C++ binaries cannot execute in the client-side JavaScript Artifact sandbox.',
      C: 'Raw CSV coordinates are static text data without interactive visual rendering.',
      D: 'Java NPAPI applets have been deprecated across all modern browsers for over a decade and are unsupported.',
    },
    references: [
      { title: 'Interactive Artifacts', url: 'https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them' }
    ]
  },
];
