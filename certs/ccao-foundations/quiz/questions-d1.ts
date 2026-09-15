import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 101,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'A marketing team lead needs all members of their department to generate campaign copy adhering to strict company voice guidelines, approved product terminology, and regulatory disclaimers without manually pasting instructions into every new chat session.',
    question: 'Which Claude feature is best designed to centrally enforce these guidelines across all departmental conversations?',
    options: [
      { label: 'A', text: 'Set up a shared Claude Project workspace, populate the Project Knowledge base with style guides, and configure Project Custom Instructions.' },
      { label: 'B', text: 'Instruct each team member to paste the full style guide into their personal account Global Custom Instructions.' },
      { label: 'C', text: 'Create a shared Artifact containing the style guide and instruct members to link to it in every prompt.' },
      { label: 'D', text: 'Use the Claude Desktop app local storage directory to synchronize configuration files via a git repository.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Projects Knowledge and Custom Instructions',
    explanation: 'Claude Projects allow teams to define persistent Project Knowledge documents and tailored Project Custom Instructions that automatically apply to every new chat initiated inside that specific project workspace.',
    distractorAnalysis: {
      B: 'Account-level Global Custom Instructions apply across every personal conversation the user has, leaking marketing rules into unrelated tasks and requiring tedious manual maintenance per user.',
      C: 'Artifacts are output components and cannot automatically inject instructions into independent chat sessions created by other users.',
      D: 'Claude Desktop local storage does not support multi-user synchronized team governance or project sharing.',
    },
    references: [
      { title: 'Claude Projects Overview', url: 'https://docs.anthropic.com/en/docs/claude-projects' }
    ]
  },
  {
    id: 102,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'An enterprise analyst is adding reference material to a Project Knowledge base. They upload 15 quarterly earnings reports (PDFs), 10 spreadsheet extracts (CSV), and 5 internal process guides (DOCX). The project context indicator shows that the knowledge base has reached 75% capacity.',
    question: 'How does project knowledge capacity affect token availability for individual chat turns created within this project?',
    options: [
      { label: 'A', text: "Project Knowledge consumes a portion of the conversation's 200,000 token context window on every turn, reducing the remaining tokens available for ongoing chat turns and attachments." },
      { label: 'B', text: 'Project Knowledge is stored in an external vector index and consumes zero tokens from the active 200,000 token conversational context window.' },
      { label: 'C', text: 'Each chat inside a project automatically receives a separate, dedicated 500,000 token context window to prevent knowledge overflow.' },
      { label: 'D', text: 'Project Knowledge is only sent to Claude during the very first message of a conversation and is omitted from subsequent turns.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Project Knowledge Context Window Consumption',
    explanation: 'Project Knowledge documents are included in the prompt context of chats within that project. As the knowledge base grows, it occupies part of the 200,000 token context window, leaving less headroom for lengthy conversation history and large turn attachments.',
    distractorAnalysis: {
      B: 'In Claude Projects, knowledge documents are loaded directly into the model context to guarantee high-fidelity recall, directly utilizing available context window tokens.',
      C: 'Claude models currently support up to a 200,000 token context window; there is no 500,000 token expansion tier for standard project chats.',
      D: 'Because LLM APIs are stateless, all relevant background context, instructions, and conversation history must be supplied on every conversational turn.',
    },
    references: [
      { title: 'Managing Project Knowledge', url: 'https://support.anthropic.com/en/articles/9517075-what-is-a-project' }
    ]
  },
  {
    id: 103,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'A knowledge worker wants to analyze several large data files in Claude Web. They have an audio recording transcript (.docx), a 25MB raw MP4 product demo video, a 15MB scanned PDF handbook, and a 50MB SQLite database file.',
    question: 'Which of these files can be directly uploaded and processed in Claude Web without pre-conversion or transcription?',
    options: [
      { label: 'A', text: 'The .docx transcript and the scanned PDF handbook.' },
      { label: 'B', text: 'The MP4 video demo and the SQLite database file.' },
      { label: 'C', text: 'All four files are natively supported for direct upload in Claude Web.' },
      { label: 'D', text: 'Only the SQLite database file, provided it has an active ODBC driver.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Supported File Formats and Modality Limits',
    explanation: 'Claude natively supports documents and text files (such as DOCX, PDF, TXT, CSV, RTF) as well as static images. It does not support native video files (like MP4) or binary database files (like SQLite) directly; video must be sampled as image frames and audio transcribed to text.',
    distractorAnalysis: {
      B: 'Raw video files (MP4) and binary database files (SQLite) are not supported formats for direct file upload in Claude Web.',
      C: 'Claude does not accept direct video (MP4) or binary database files (SQLite) as input attachments.',
      D: 'Claude Web does not connect to external local ODBC drivers or ingest raw SQLite binaries.',
    },
    references: [
      { title: 'Uploading Files to Claude', url: 'https://support.anthropic.com/en/articles/8241133-how-do-i-upload-files-to-claude' }
    ]
  },
  {
    id: 104,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'A user on the Claude Desktop application frequently works on offline flights and asks if Claude Desktop can process documents and generate responses without an active Internet connection.',
    question: 'What is the operational architecture of the Claude Desktop application regarding local execution and network connectivity?',
    options: [
      { label: 'A', text: 'Claude Desktop is a client application that requires an active Internet connection to connect to Anthropic cloud infrastructure for model inference.' },
      { label: 'B', text: 'Claude Desktop downloads an offline quantized Claude 3.5 Haiku weights package that runs locally on Apple Silicon / CUDA hardware.' },
      { label: 'C', text: 'Claude Desktop operates offline for text processing, but requires Internet only when rendering visual Artifacts.' },
      { label: 'D', text: 'Claude Desktop caches the last 10,000 interactions and can generate new responses offline using speculative decoding.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Claude Desktop Cloud-Connected Architecture',
    explanation: 'The Claude Desktop app provides native OS integration (such as keyboard shortcuts and local Model Context Protocol integrations) but relies entirely on Anthropic cloud APIs for inference. An active Internet connection is mandatory.',
    distractorAnalysis: {
      B: 'Anthropic does not distribute quantized local model weights to consumer desktop applications.',
      C: 'All inference requires the cloud API; offline text processing is not supported.',
      D: 'Local caching enables viewing past conversations offline, but generating new turns offline is impossible without cloud connectivity.',
    },
    references: [
      { title: 'Claude Desktop App', url: 'https://claude.ai/download' }
    ]
  },
  {
    id: 105,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: "A project manager has configured Project Custom Instructions with the directive: 'Always respond in three bullet points, maximum 50 words total.' In an active chat within this project, the manager enters the prompt: 'Provide a comprehensive 1,000-word executive briefing on our Q3 roadmap.'",
    question: 'How will Claude prioritize these conflicting instructions?',
    options: [
      { label: 'A', text: 'Claude typically gives precedence to specific turn-level user prompt constraints over general Project Custom Instructions, though it may attempt to balance both.' },
      { label: 'B', text: 'Project Custom Instructions are hard system constraints that completely block and reject any user prompt requesting more than 50 words.' },
      { label: 'C', text: 'The conversation crashes with an HTTP 400 Instruction Conflict exception in Claude Web.' },
      { label: 'D', text: 'Claude strictly defaults to the account-level Global Custom Instructions, ignoring both the project instructions and the user prompt.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Instruction Hierarchy and Precedence',
    explanation: 'In conversational prompting, immediate turn-level user prompts generally take practical precedence over background project instructions when an explicit override is commanded, though well-crafted prompts should acknowledge or relax project guidelines to prevent ambiguous outputs.',
    distractorAnalysis: {
      B: 'Project instructions guide behavior probabilistically and do not act as rigid input validation firewalls that reject requests.',
      C: 'Conflicting prompt instructions do not trigger API or web client exceptions.',
      D: 'Project Custom Instructions take precedence over account-level instructions, but turn-level instructions directly direct the immediate turn response.',
    },
    references: [
      { title: 'Custom Instructions Best Practices', url: 'https://support.anthropic.com/en/articles/8454988-how-do-i-use-custom-instructions' }
    ]
  },
  {
    id: 106,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'An author is collaborating with an editor on a book proposal inside a Claude Project. The author uploads a chapter draft (draft_v1.docx). Two days later, the author edits the draft locally and uploads draft_v2.docx without deleting draft_v1.docx.',
    question: "What is the most likely consequence when asking Claude: 'Summarize the protagonist's motives described in the manuscript'?",
    options: [
      { label: 'A', text: 'Claude will inspect all files in the Project Knowledge base, potentially synthesizing contradictory information across both draft versions or citing the outdated draft.' },
      { label: 'B', text: 'Claude automatically detects semantic file versioning and archives draft_v1.docx permanently.' },
      { label: 'C', text: 'Claude returns an error indicating duplicate manuscript entities in the knowledge repository.' },
      { label: 'D', text: 'Claude automatically deletes draft_v1.docx from the project workspace storage.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Project Knowledge Hygiene and Versioning',
    explanation: 'Project Knowledge does not automatically deduplicate or deprecate older document revisions. Retaining multiple drafts with conflicting statements creates ambiguous context, causing Claude to blend or quote superseded information.',
    distractorAnalysis: {
      B: 'Claude Projects does not implement automated semantic version archival or file deprecation.',
      C: 'Uploading multiple versions of documents is permitted and will not cause an error.',
      D: 'Claude never deletes user files from Project Knowledge automatically.',
    },
    references: [
      { title: 'Project Knowledge Best Practices', url: 'https://docs.anthropic.com/en/docs/claude-projects' }
    ]
  },
  {
    id: 107,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'A financial analyst on a Claude Pro plan creates a project to analyze company filings. They attempt to upload a single 80MB PDF file containing an uncompressed scan of an annual report, but the upload fails.',
    question: 'What is the primary constraint causing this upload failure in Claude Web?',
    options: [
      { label: 'A', text: 'Individual file uploads in Claude Web have a maximum per-file size limit (typically 30MB), which the 80MB PDF exceeds.' },
      { label: 'B', text: 'Claude Pro users cannot upload PDF files; PDF parsing is restricted exclusively to Claude Enterprise plans.' },
      { label: 'C', text: 'Claude only accepts files formatted in plain UTF-8 JSON or CSV.' },
      { label: 'D', text: 'The file name contains more than 12 characters, violating the Project Knowledge file naming convention.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'File Upload Size Limits in Claude Web',
    explanation: 'Claude Web enforces a file size limit (30MB per individual file). Uploads exceeding this threshold must be compressed, split into smaller volumes, or converted to text before uploading.',
    distractorAnalysis: {
      B: 'PDF uploads are supported across Free, Pro, Team, and Enterprise plans.',
      C: 'PDF, DOCX, TXT, CSV, and image formats are all supported.',
      D: 'There is no 12-character file naming restriction.',
    },
    references: [
      { title: 'File Upload Limits', url: 'https://support.anthropic.com/en/articles/8241133-how-do-i-upload-files-to-claude' }
    ]
  },
  {
    id: 108,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'A research scientist has an active conversation with 45 back-and-forth turns analyzing a complex biological paper. Towards the end of the chat, Claude begins omitting earlier established acronym definitions and requests re-uploading documents.',
    question: 'What technical boundary has the conversation reached, and what is the recommended workflow to continue?',
    options: [
      { label: 'A', text: 'The conversation is approaching the context window length limit; the user should summarize key findings and start a fresh chat or migrate core reference docs to Project Knowledge.' },
      { label: 'B', text: "The user's daily message quota has expired; they must wait 24 hours for the model context to refresh." },
      { label: 'C', text: 'Claude has entered sleep mode; clearing the browser cookies and refreshing the page will restore all forgotten tokens.' },
      { label: 'D', text: 'The user must execute a hard restart of the Claude Web backend using the /flush command.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Context Window Saturation and Workflow Reset',
    explanation: 'As a conversation accumulates many turns, the prompt approaches the 200k token context window ceiling. To maintain high reasoning fidelity, starting a clean chat seeded with an executive summary and placing permanent reference materials into Project Knowledge is the recommended pattern.',
    distractorAnalysis: {
      B: 'Rate limits affect whether a message can be sent, not selective in-session token forgetting.',
      C: 'Browser cookies do not alter server-side conversational context windows.',
      D: 'There is no user-facing /flush slash command in Claude Web.',
    },
    references: [
      { title: 'Best Practices for Long Conversations', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' }
    ]
  },
  {
    id: 109,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: "A software team lead creates a Project titled 'API Refactoring' containing architecture specs and shares it with their organization on a Claude Team plan. A teammate opens the project and starts a chat.",
    question: 'Can the team lead view the private exploratory chat sessions started by their teammate inside the shared project?',
    options: [
      { label: 'A', text: 'Chats created within a shared Project remain private to the individual user who created them unless explicitly shared by that user.' },
      { label: 'B', text: 'Yes; all chats created inside a shared Project are immediately visible and editable by all members of the team by default.' },
      { label: 'C', text: 'Yes, but only if the team lead is designated as an Organization Workspace Owner.' },
      { label: 'D', text: 'No; shared Projects do not allow teammates to create individual chats.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Project Chat Privacy and Sharing Boundaries',
    explanation: 'In Claude Team workspaces, Project Knowledge and Custom Instructions are shared across members, but individual chat sessions initiated within the project remain strictly private to the author unless they choose to share the conversation link with the team.',
    distractorAnalysis: {
      B: 'Individual chats inside projects are private by default to encourage unconstrained exploration.',
      C: "Workspace Owners cannot read employees' private project chats unless shared.",
      D: 'Members of a shared project are encouraged to launch their own independent chats against the shared knowledge.',
    },
    references: [
      { title: 'Collaborating in Projects', url: 'https://support.anthropic.com/en/articles/9517075-what-is-a-project' }
    ]
  },
  {
    id: 110,
    domain: 1,
    domainName: 'Claude Web, Desktop & Project Knowledge Bases',
    scenario: 'A legal consultant frequently switches between Claude on macOS Desktop, Claude on the Web via Chrome, and Claude on their iPad. They want to ensure their custom project files and chats stay synchronized across all devices.',
    question: 'How does Claude handle multi-device synchronization for projects and conversation histories?',
    options: [
      { label: 'A', text: "Projects, knowledge files, custom instructions, and chat histories are stored centrally in the user's cloud account and automatically synchronize across Web, Desktop, and Mobile apps." },
      { label: 'B', text: 'Projects and chat history are saved exclusively in local browser IndexedDB storage and require manual JSON export and import across devices.' },
      { label: 'C', text: 'Only Claude Pro users on macOS Desktop can access cloud sync; Web and Mobile clients remain local-only.' },
      { label: 'D', text: 'Cloud sync is supported for chat messages, but Project Knowledge files must be re-uploaded independently on each individual device.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Cloud-Synchronized Workspaces',
    explanation: 'Claude account data—including Projects, Project Knowledge files, Custom Instructions, and conversation history—is cloud-hosted, ensuring seamless synchronization across Web, Desktop, and mobile apps when signed into the same account.',
    distractorAnalysis: {
      B: 'Account data is not confined to local IndexedDB storage.',
      C: 'Synchronization is standard across all supported platforms for authenticated accounts.',
      D: 'Project Knowledge files reside in cloud project storage and are instantly available on all connected devices.',
    },
    references: [
      { title: 'Claude Account Synchronization', url: 'https://support.anthropic.com/en/articles/8241133-how-do-i-upload-files-to-claude' }
    ]
  },
];
