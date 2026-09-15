#!/usr/bin/env python3
"""
Generator script for CCAO-F (Claude Certified Associate: Foundations) question bank.
Generates exactly 40 high-yield scenario questions adhering to the TypeScript Question interface.
Outputs to:
  - certs/ccar-foundations/quiz/src/data/ccao/questions-d{1..5}.ts
  - certs/ccao-foundations/quiz/questions-d{1..5}.ts
"""

import json
import os

questions_d1 = [
  {
    "id": 101,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A marketing team lead needs all members of their department to generate campaign copy adhering to strict company voice guidelines, approved product terminology, and regulatory disclaimers without manually pasting instructions into every new chat session.",
    "question": "Which Claude feature is best designed to centrally enforce these guidelines across all departmental conversations?",
    "options": [
      {"label": "A", "text": "Set up a shared Claude Project workspace, populate the Project Knowledge base with style guides, and configure Project Custom Instructions."},
      {"label": "B", "text": "Instruct each team member to paste the full style guide into their personal account Global Custom Instructions."},
      {"label": "C", "text": "Create a shared Artifact containing the style guide and instruct members to link to it in every prompt."},
      {"label": "D", "text": "Use the Claude Desktop app local storage directory to synchronize configuration files via a git repository."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Projects Knowledge and Custom Instructions",
    "explanation": "Claude Projects allow teams to define persistent Project Knowledge documents and tailored Project Custom Instructions that automatically apply to every new chat initiated inside that specific project workspace.",
    "distractorAnalysis": {
      "B": "Account-level Global Custom Instructions apply across every personal conversation the user has, leaking marketing rules into unrelated tasks and requiring tedious manual maintenance per user.",
      "C": "Artifacts are output components and cannot automatically inject instructions into independent chat sessions created by other users.",
      "D": "Claude Desktop local storage does not support multi-user synchronized team governance or project sharing."
    },
    "references": [{"title": "Claude Projects Overview", "url": "https://docs.anthropic.com/en/docs/claude-projects"}]
  },
  {
    "id": 102,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "An enterprise analyst is adding reference material to a Project Knowledge base. They upload 15 quarterly earnings reports (PDFs), 10 spreadsheet extracts (CSV), and 5 internal process guides (DOCX). The project context indicator shows that the knowledge base has reached 75% capacity.",
    "question": "How does project knowledge capacity affect token availability for individual chat turns created within this project?",
    "options": [
      {"label": "A", "text": "Project Knowledge consumes a portion of the conversation's 200,000 token context window on every turn, reducing the remaining tokens available for ongoing chat turns and attachments."},
      {"label": "B", "text": "Project Knowledge is stored in an external vector index and consumes zero tokens from the active 200,000 token conversational context window."},
      {"label": "C", "text": "Each chat inside a project automatically receives a separate, dedicated 500,000 token context window to prevent knowledge overflow."},
      {"label": "D", "text": "Project Knowledge is only sent to Claude during the very first message of a conversation and is omitted from subsequent turns."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Project Knowledge Context Window Consumption",
    "explanation": "Project Knowledge documents are included in the prompt context of chats within that project. As the knowledge base grows, it occupies part of the 200,000 token context window, leaving less headroom for lengthy conversation history and large turn attachments.",
    "distractorAnalysis": {
      "B": "In Claude Projects, knowledge documents are loaded directly into the model context to guarantee high-fidelity recall, directly utilizing available context window tokens.",
      "C": "Claude models currently support up to a 200,000 token context window; there is no 500,000 token expansion tier for standard project chats.",
      "D": "Because LLM APIs are stateless, all relevant background context, instructions, and conversation history must be supplied on every conversational turn."
    },
    "references": [{"title": "Managing Project Knowledge", "url": "https://support.anthropic.com/en/articles/9517075-what-is-a-project"}]
  },
  {
    "id": 103,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A knowledge worker wants to analyze several large data files in Claude Web. They have an audio recording transcript (.docx), a 25MB raw MP4 product demo video, a 15MB scanned PDF handbook, and a 50MB SQLite database file.",
    "question": "Which of these files can be directly uploaded and processed in Claude Web without pre-conversion or transcription?",
    "options": [
      {"label": "A", "text": "The .docx transcript and the scanned PDF handbook."},
      {"label": "B", "text": "The MP4 video demo and the SQLite database file."},
      {"label": "C", "text": "All four files are natively supported for direct upload in Claude Web."},
      {"label": "D", "text": "Only the SQLite database file, provided it has an active ODBC driver."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Supported File Formats and Modality Limits",
    "explanation": "Claude natively supports documents and text files (such as DOCX, PDF, TXT, CSV, RTF) as well as static images. It does not support native video files (like MP4) or binary database files (like SQLite) directly; video must be sampled as image frames and audio transcribed to text.",
    "distractorAnalysis": {
      "B": "Raw video files (MP4) and binary database files (SQLite) are not supported formats for direct file upload in Claude Web.",
      "C": "Claude does not accept direct video (MP4) or binary database files (SQLite) as input attachments.",
      "D": "Claude Web does not connect to external local ODBC drivers or ingest raw SQLite binaries."
    },
    "references": [{"title": "Uploading Files to Claude", "url": "https://support.anthropic.com/en/articles/8241133-how-do-i-upload-files-to-claude"}]
  },
  {
    "id": 104,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A user on the Claude Desktop application frequently works on offline flights and asks if Claude Desktop can process documents and generate responses without an active Internet connection.",
    "question": "What is the operational architecture of the Claude Desktop application regarding local execution and network connectivity?",
    "options": [
      {"label": "A", "text": "Claude Desktop is a client application that requires an active Internet connection to connect to Anthropic cloud infrastructure for model inference."},
      {"label": "B", "text": "Claude Desktop downloads an offline quantized Claude 3.5 Haiku weights package that runs locally on Apple Silicon / CUDA hardware."},
      {"label": "C", "text": "Claude Desktop operates offline for text processing, but requires Internet only when rendering visual Artifacts."},
      {"label": "D", "text": "Claude Desktop caches the last 10,000 interactions and can generate new responses offline using speculative decoding."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Claude Desktop Cloud-Connected Architecture",
    "explanation": "The Claude Desktop app provides native OS integration (such as keyboard shortcuts and local Model Context Protocol integrations) but relies entirely on Anthropic cloud APIs for inference. An active Internet connection is mandatory.",
    "distractorAnalysis": {
      "B": "Anthropic does not distribute quantized local model weights to consumer desktop applications.",
      "C": "All inference requires the cloud API; offline text processing is not supported.",
      "D": "Local caching enables viewing past conversations offline, but generating new turns offline is impossible without cloud connectivity."
    },
    "references": [{"title": "Claude Desktop App", "url": "https://claude.ai/download"}]
  },
  {
    "id": 105,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A project manager has configured Project Custom Instructions with the directive: 'Always respond in three bullet points, maximum 50 words total.' In an active chat within this project, the manager enters the prompt: 'Provide a comprehensive 1,000-word executive briefing on our Q3 roadmap.'",
    "question": "How will Claude prioritize these conflicting instructions?",
    "options": [
      {"label": "A", "text": "Claude typically gives precedence to specific turn-level user prompt constraints over general Project Custom Instructions, though it may attempt to balance both."},
      {"label": "B", "text": "Project Custom Instructions are hard system constraints that completely block and reject any user prompt requesting more than 50 words."},
      {"label": "C", "text": "The conversation crashes with an HTTP 400 Instruction Conflict exception in Claude Web."},
      {"label": "D", "text": "Claude strictly defaults to the account-level Global Custom Instructions, ignoring both the project instructions and the user prompt."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Instruction Hierarchy and Precedence",
    "explanation": "In conversational prompting, immediate turn-level user prompts generally take practical precedence over background project instructions when an explicit override is commanded, though well-crafted prompts should acknowledge or relax project guidelines to prevent ambiguous outputs.",
    "distractorAnalysis": {
      "B": "Project instructions guide behavior probabilistically and do not act as rigid input validation firewalls that reject requests.",
      "C": "Conflicting prompt instructions do not trigger API or web client exceptions.",
      "D": "Project Custom Instructions take precedence over account-level instructions, but turn-level instructions directly direct the immediate turn response."
    },
    "references": [{"title": "Custom Instructions Best Practices", "url": "https://support.anthropic.com/en/articles/8454988-how-do-i-use-custom-instructions"}]
  },
  {
    "id": 106,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "An author is collaborating with an editor on a book proposal inside a Claude Project. The author uploads a chapter draft (draft_v1.docx). Two days later, the author edits the draft locally and uploads draft_v2.docx without deleting draft_v1.docx.",
    "question": "What is the most likely consequence when asking Claude: 'Summarize the protagonist's motives described in the manuscript'?",
    "options": [
      {"label": "A", "text": "Claude will inspect all files in the Project Knowledge base, potentially synthesizing contradictory information across both draft versions or citing the outdated draft."},
      {"label": "B", "text": "Claude automatically detects semantic file versioning and archives draft_v1.docx permanently."},
      {"label": "C", "text": "Claude returns an error indicating duplicate manuscript entities in the knowledge repository."},
      {"label": "D", "text": "Claude automatically deletes draft_v1.docx from the project workspace storage."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Project Knowledge Hygiene and Versioning",
    "explanation": "Project Knowledge does not automatically deduplicate or deprecate older document revisions. Retaining multiple drafts with conflicting statements creates ambiguous context, causing Claude to blend or quote superseded information.",
    "distractorAnalysis": {
      "B": "Claude Projects does not implement automated semantic version archival or file deprecation.",
      "C": "Uploading multiple versions of documents is permitted and will not cause an error.",
      "D": "Claude never deletes user files from Project Knowledge automatically."
    },
    "references": [{"title": "Project Knowledge Best Practices", "url": "https://docs.anthropic.com/en/docs/claude-projects"}]
  },
  {
    "id": 107,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A financial analyst on a Claude Pro plan creates a project to analyze company filings. They attempt to upload a single 80MB PDF file containing an uncompressed scan of an annual report, but the upload fails.",
    "question": "What is the primary constraint causing this upload failure in Claude Web?",
    "options": [
      {"label": "A", "text": "Individual file uploads in Claude Web have a maximum per-file size limit (typically 30MB), which the 80MB PDF exceeds."},
      {"label": "B", "text": "Claude Pro users cannot upload PDF files; PDF parsing is restricted exclusively to Claude Enterprise plans."},
      {"label": "C", "text": "Claude only accepts files formatted in plain UTF-8 JSON or CSV."},
      {"label": "D", "text": "The file name contains more than 12 characters, violating the Project Knowledge file naming convention."}
    ],
    "correctAnswer": "A",
    "keyConcept": "File Upload Size Limits in Claude Web",
    "explanation": "Claude Web enforces a file size limit (30MB per individual file). Uploads exceeding this threshold must be compressed, split into smaller volumes, or converted to text before uploading.",
    "distractorAnalysis": {
      "B": "PDF uploads are supported across Free, Pro, Team, and Enterprise plans.",
      "C": "PDF, DOCX, TXT, CSV, and image formats are all supported.",
      "D": "There is no 12-character file naming restriction."
    },
    "references": [{"title": "File Upload Limits", "url": "https://support.anthropic.com/en/articles/8241133-how-do-i-upload-files-to-claude"}]
  },
  {
    "id": 108,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A research scientist has an active conversation with 45 back-and-forth turns analyzing a complex biological paper. Towards the end of the chat, Claude begins omitting earlier established acronym definitions and requests re-uploading documents.",
    "question": "What technical boundary has the conversation reached, and what is the recommended workflow to continue?",
    "options": [
      {"label": "A", "text": "The conversation is approaching the context window length limit; the user should summarize key findings and start a fresh chat or migrate core reference docs to Project Knowledge."},
      {"label": "B", "text": "The user's daily message quota has expired; they must wait 24 hours for the model context to refresh."},
      {"label": "C", "text": "Claude has entered sleep mode; clearing the browser cookies and refreshing the page will restore all forgotten tokens."},
      {"label": "D", "text": "The user must execute a hard restart of the Claude Web backend using the /flush command."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Context Window Saturation and Workflow Reset",
    "explanation": "As a conversation accumulates many turns, the prompt approaches the 200k token context window ceiling. To maintain high reasoning fidelity, starting a clean chat seeded with an executive summary and placing permanent reference materials into Project Knowledge is the recommended pattern.",
    "distractorAnalysis": {
      "B": "Rate limits affect whether a message can be sent, not selective in-session token forgetting.",
      "C": "Browser cookies do not alter server-side conversational context windows.",
      "D": "There is no user-facing /flush slash command in Claude Web."
    },
    "references": [{"title": "Best Practices for Long Conversations", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"}]
  },
  {
    "id": 109,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A software team lead creates a Project titled 'API Refactoring' containing architecture specs and shares it with their organization on a Claude Team plan. A teammate opens the project and starts a chat.",
    "question": "Can the team lead view the private exploratory chat sessions started by their teammate inside the shared project?",
    "options": [
      {"label": "A", "text": "Chats created within a shared Project remain private to the individual user who created them unless explicitly shared by that user."},
      {"label": "B", "text": "Yes; all chats created inside a shared Project are immediately visible and editable by all members of the team by default."},
      {"label": "C", "text": "Yes, but only if the team lead is designated as an Organization Workspace Owner."},
      {"label": "D", "text": "No; shared Projects do not allow teammates to create individual chats."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Project Chat Privacy and Sharing Boundaries",
    "explanation": "In Claude Team workspaces, Project Knowledge and Custom Instructions are shared across members, but individual chat sessions initiated within the project remain strictly private to the author unless they choose to share the conversation link with the team.",
    "distractorAnalysis": {
      "B": "Individual chats inside projects are private by default to encourage unconstrained exploration.",
      "C": "Workspace Owners cannot read employees' private project chats unless shared.",
      "D": "Members of a shared project are encouraged to launch their own independent chats against the shared knowledge."
    },
    "references": [{"title": "Collaborating in Projects", "url": "https://support.anthropic.com/en/articles/9517075-what-is-a-project"}]
  },
  {
    "id": 110,
    "domain": 1,
    "domainName": "Claude Web, Desktop & Project Knowledge Bases",
    "scenario": "A legal consultant frequently switches between Claude on macOS Desktop, Claude on the Web via Chrome, and Claude on their iPad. They want to ensure their custom project files and chats stay synchronized across all devices.",
    "question": "How does Claude handle multi-device synchronization for projects and conversation histories?",
    "options": [
      {"label": "A", "text": "Projects, knowledge files, custom instructions, and chat histories are stored centrally in the user's cloud account and automatically synchronize across Web, Desktop, and Mobile apps."},
      {"label": "B", "text": "Projects and chat history are saved exclusively in local browser IndexedDB storage and require manual JSON export and import across devices."},
      {"label": "C", "text": "Only Claude Pro users on macOS Desktop can access cloud sync; Web and Mobile clients remain local-only."},
      {"label": "D", "text": "Cloud sync is supported for chat messages, but Project Knowledge files must be re-uploaded independently on each individual device."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Cloud-Synchronized Workspaces",
    "explanation": "Claude account data—including Projects, Project Knowledge files, Custom Instructions, and conversation history—is cloud-hosted, ensuring seamless synchronization across Web, Desktop, and mobile apps when signed into the same account.",
    "distractorAnalysis": {
      "B": "Account data is not confined to local IndexedDB storage.",
      "C": "Synchronization is standard across all supported platforms for authenticated accounts.",
      "D": "Project Knowledge files reside in cloud project storage and are instantly available on all connected devices."
    },
    "references": [{"title": "Claude Account Synchronization", "url": "https://support.anthropic.com/en/articles/8241133-how-do-i-upload-files-to-claude"}]
  }
]

questions_d2 = [
  {
    "id": 201,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A developer asks Claude in the web interface: 'Write a Python function to check if a string is a palindrome.' The output is an 8-line code block. In the next turn, the developer asks: 'Write a complete Flask web server with user authentication, route guards, and SQLite models.' The output is a 120-line file.",
    "question": "How will Claude display these two responses with respect to the Artifacts panel?",
    "options": [
      {"label": "A", "text": "The 8-line snippet will remain inline in the chat; the 120-line Flask application will render as a dedicated standalone Artifact."},
      {"label": "B", "text": "Both snippets will automatically render as Artifacts because all code is isolated from chat."},
      {"label": "C", "text": "Both snippets will remain inline in the chat because Python code cannot be rendered in an Artifact panel."},
      {"label": "D", "text": "The 8-line snippet triggers an Artifact, while the 120-line code triggers an immediate file download prompt."}
    ],
    "correctAnswer": "A",
    "keyConcept": "The 15-Line Artifact Trigger Heuristic",
    "explanation": "Claude uses a well-defined heuristic for Artifacts: substantial, self-contained content (generally >= 15 lines of code or multi-paragraph standalone documents) that users are likely to edit, run, or reuse generates an Artifact. Short conversational snippets (< 15 lines) remain inline in the chat.",
    "distractorAnalysis": {
      "B": "Short conversational code snippets stay inline to avoid cluttering the interface with trivial snippets.",
      "C": "Artifacts support all programming languages, Markdown, HTML, SVG, and React, not just browser-executable languages.",
      "D": "Artifacts display in the side-by-side interactive viewer; they do not force immediate file download prompts."
    },
    "references": [{"title": "About Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 202,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A front-end designer asks Claude to create an interactive customer dashboard prototype with filter buttons, dynamic bar charts, and a dark-mode toggle.",
    "question": "Which artifact format allows Claude to deliver an immediately clickable, live-rendered interactive component in the Artifact panel?",
    "options": [
      {"label": "A", "text": "A React component using Tailwind CSS and Lucide icons (or standalone HTML/JS with inline styles)."},
      {"label": "B", "text": "A Python Streamlit script executed in the browser sandbox."},
      {"label": "C", "text": "A Dockerfile specifying an Nginx container image."},
      {"label": "D", "text": "An Adobe Photoshop .PSD binary file."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Interactive React and HTML Artifact Rendering",
    "explanation": "The Claude Artifacts viewer has built-in sandboxed runtime support for rendering React components (with Tailwind CSS and Lucide-React icons) as well as standalone HTML/CSS/JavaScript, allowing users to interact directly with buttons, state, and visual controls.",
    "distractorAnalysis": {
      "B": "Claude Web Artifacts sandbox does not execute a server-side Python runtime or Streamlit daemon.",
      "C": "Dockerfiles are static text artifacts and cannot be interactively rendered as a visual UI component in the browser.",
      "D": "Binary Adobe PSD files cannot be rendered or compiled by Claude Artifacts."
    },
    "references": [{"title": "Rendering React Components in Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 203,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A technical writer has Claude generate a comprehensive 10-page API documentation guide in an Artifact. Over 5 subsequent chat turns, the writer asks Claude to update individual sections, add authentication headers, and fix code examples.",
    "question": "How does Claude manage the progression of changes to the document across these turns?",
    "options": [
      {"label": "A", "text": "Claude maintains a version history selector at the bottom or top of the Artifact panel, allowing the user to view or revert to previous versions while displaying the latest version."},
      {"label": "B", "text": "Claude generates 5 completely separate new chat windows, one for each document revision."},
      {"label": "C", "text": "Claude permanently overwrites the original document in browser memory, making historical revisions unrecoverable."},
      {"label": "D", "text": "Claude prints git patch diff files directly in the chat and requires the user to apply them manually via terminal."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Artifact Version History and Iterative Refinement",
    "explanation": "When an artifact is updated during a conversation, Claude increments the artifact's version. The UI provides a version picker (e.g. 'v1', 'v2', 'v3') allowing users to review previous states or track changes across conversational turns.",
    "distractorAnalysis": {
      "B": "Revisions occur within the same conversational thread and Artifact panel, not separate browser windows.",
      "C": "Version history is preserved across the conversation lifecycle and can be freely navigated.",
      "D": "Artifacts provide clean rendered updates and source code views, not mandatory manual git patch application."
    },
    "references": [{"title": "Navigating Artifact Versions", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 204,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A software engineer is viewing a generated React component in the Artifacts window. They want to inspect the underlying JSX markup and copy specific functions rather than just interacting with the rendered preview.",
    "question": "Which UI controls inside the Artifact panel enable this capability?",
    "options": [
      {"label": "A", "text": "The 'Code' and 'Preview' toggle buttons at the top of the Artifact panel."},
      {"label": "B", "text": "Opening Chrome DevTools and inspecting the iframe DOM tree."},
      {"label": "C", "text": "Sending a new prompt asking Claude to repeat the code in raw plaintext."},
      {"label": "D", "text": "Downloading the Claude Desktop source code repository."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Code and Preview Toggle Controls",
    "explanation": "Visual artifacts (React, HTML, SVG) provide intuitive 'Code' and 'Preview' toggles at the top of the panel, allowing users to instantly switch between the live interactive rendering and the editable source code.",
    "distractorAnalysis": {
      "B": "Inspecting through DevTools is unnecessary and complex when native Code view toggles exist.",
      "C": "Re-prompting consumes unnecessary context tokens and time.",
      "D": "Downloading Desktop source code has no relevance to viewing web artifact source."
    },
    "references": [{"title": "Using Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 205,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A business analyst asks Claude to generate an architecture flowchart comparing three payment gateways. The analyst specifies: 'I want a vector graphic diagram that scales cleanly without pixelation when inserted into executive slides.'",
    "question": "Which artifact format should Claude use to satisfy this scaling requirement directly inside the browser?",
    "options": [
      {"label": "A", "text": "An SVG (Scalable Vector Graphics) artifact."},
      {"label": "B", "text": "A low-resolution 72 DPI PNG raster image."},
      {"label": "C", "text": "A raw ASCII art block wrapped in triple backticks."},
      {"label": "D", "text": "An uncompressed BMP bitmap file."}
    ],
    "correctAnswer": "A",
    "keyConcept": "SVG Vector Graphics in Artifacts",
    "explanation": "SVG artifacts are rendered natively as vector graphics within the Artifacts panel. They scale infinitely without pixelation, can be previewed visually, and allow copying the raw XML/SVG markup for direct embedding in slides or design tools.",
    "distractorAnalysis": {
      "B": "Raster PNGs lose fidelity and pixelate when scaled up on high-resolution presentation displays.",
      "C": "ASCII art lacks professional aesthetics and cannot be scaled cleanly as vector graphics.",
      "D": "BMP is a legacy raster format with huge file sizes that lacks responsive vector scaling."
    },
    "references": [{"title": "Visual Artifacts Types", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/artifacts"}]
  },
  {
    "id": 206,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A developer wants to export a completed Node.js microservice script generated in an Artifact panel to their local workstation to commit it to GitHub.",
    "question": "What is the most direct native method to retrieve the file from the Artifact panel?",
    "options": [
      {"label": "A", "text": "Click the download icon located in the bottom-right or top-right header of the Artifact panel to save the file locally with its appropriate extension."},
      {"label": "B", "text": "Ask Claude to email the file as an attachment to their registered email address."},
      {"label": "C", "text": "Take a screenshot of the code and run local optical character recognition (OCR)."},
      {"label": "D", "text": "Configure an AWS S3 bucket sync integration inside the Claude Web settings menu."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Artifact Download and Export Capabilities",
    "explanation": "Artifacts have native 'Download' and 'Copy to clipboard' controls in their UI header/footer, allowing immediate one-click export of the raw source file directly to the user's local operating system.",
    "distractorAnalysis": {
      "B": "Claude Web does not have an automated outbound email dispatch service for artifacts.",
      "C": "Taking screenshots and running OCR is error-prone and unnecessary given native download buttons.",
      "D": "Claude Web does not provide direct S3 bucket synchronization settings for personal chats."
    },
    "references": [{"title": "Exporting Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 207,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A product manager wants to share an interactive prototype created in Claude Artifacts with an external client who does not have a Claude account, allowing them to view and interact with the widget.",
    "question": "How can the product manager share this Artifact externally?",
    "options": [
      {"label": "A", "text": "Click the 'Publish' or 'Share' button on the Artifact to generate a public standalone link that anyone can open in their browser without an account."},
      {"label": "B", "text": "The external client must purchase a Claude Enterprise license before any shared link can be rendered."},
      {"label": "C", "text": "The manager must invite the client to their personal Google Workspace account."},
      {"label": "D", "text": "Artifacts cannot be shared; they can only be viewed by the user who initiated the chat session."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Publishing and Sharing Standalone Artifacts",
    "explanation": "Claude allows users to publish artifacts to generate a standalone web link. Anyone with the link can view and interact with the published artifact without needing to log in or see the creator's full conversation history.",
    "distractorAnalysis": {
      "B": "Recipients do not need a paid Claude account or Enterprise license to interact with public shared artifacts.",
      "C": "Google Workspace permissions are independent of Anthropic artifact hosting.",
      "D": "Artifacts are explicitly designed with public sharing and remix capabilities."
    },
    "references": [{"title": "Sharing Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 208,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A data analyst receives an interactive revenue simulation Artifact published by a colleague. The analyst wants to use it as a starting point to test their own regional assumptions.",
    "question": "Which action allows the analyst to bring the colleague's published Artifact into their own Claude workspace to continue developing it?",
    "options": [
      {"label": "A", "text": "Click 'Remix' on the shared Artifact page to load the artifact and its code into a fresh conversation in their own Claude account."},
      {"label": "B", "text": "Fork the underlying GitHub repository using git clone via terminal."},
      {"label": "C", "text": "Contact Anthropic Support to transfer artifact domain ownership."},
      {"label": "D", "text": "Re-type the code manually into a prompt from scratch."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Remixing Shared Artifacts",
    "explanation": "Published Claude Artifacts include a 'Remix' feature. Clicking 'Remix' copies the artifact and opens a new chat in the user's Claude account, allowing them to prompt Claude to modify, extend, or refine the existing work.",
    "distractorAnalysis": {
      "B": "Remixing is a native web feature that requires no external git repository forks.",
      "C": "Support tickets are not involved in standard user artifact collaboration.",
      "D": "Manual re-typing is counterproductive when instant digital remixing is built into the UI."
    },
    "references": [{"title": "Remixing Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  },
  {
    "id": 209,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A user notices that Claude is generating an Artifact for every 3-line shell script and minor text response, disrupting the conversational flow of their chat.",
    "question": "How can the user regain control over when Artifacts are created?",
    "options": [
      {"label": "A", "text": "Explicitly instruct Claude in the prompt or Custom Instructions: 'Keep all short code snippets and explanations inline; only use Artifacts for complete multi-file modules or visual components.'"},
      {"label": "B", "text": "Artifact creation is governed by an unmodifiable hardcoded neural network weight and cannot be influenced by prompts."},
      {"label": "C", "text": "Reinstall the web browser to reset the default operating threshold."},
      {"label": "D", "text": "Switch to an incognito window with ad blockers disabled."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Guiding Artifact Creation Behavior",
    "explanation": "While Claude follows standard heuristics for generating artifacts, users can explicitly instruct Claude in their prompt or Custom Instructions to favor inline replies or restrict artifacts to substantial, multi-paragraph documents.",
    "distractorAnalysis": {
      "B": "Claude's decision to trigger an artifact is highly responsive to conversational instructions and context.",
      "C": "Browser reinstallation has no impact on model generation decisions.",
      "D": "Ad blockers do not dictate server-side artifact decision heuristics."
    },
    "references": [{"title": "Prompting for Artifacts", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/artifacts"}]
  },
  {
    "id": 210,
    "domain": 2,
    "domainName": "Artifacts Lifecycle & Component Visualizations",
    "scenario": "A student asks Claude to help visualize data structures: 'Show me an animated binary search tree insertion process.'",
    "question": "Which technology combination within Claude Artifacts is most suitable for rendering this interactive, visual computer science tutorial?",
    "options": [
      {"label": "A", "text": "A React component using state hooks (useState, useEffect) and SVG elements to animate tree node insertion step-by-step."},
      {"label": "B", "text": "A compiled C++ binary executable file packaged inside a tar archive."},
      {"label": "C", "text": "A raw CSV file containing node coordinates."},
      {"label": "D", "text": "A serialized Java applet requiring browser NPAPI plugins."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Interactive React and SVG Visualizations",
    "explanation": "React combined with SVG allows full stateful animations, dynamic DOM tree updates, and interactive controls (Play, Pause, Step Next) within the safe browser-rendered Artifact sandbox.",
    "distractorAnalysis": {
      "B": "Compiled C++ binaries cannot execute in the client-side JavaScript Artifact sandbox.",
      "C": "Raw CSV coordinates are static text data without interactive visual rendering.",
      "D": "Java NPAPI applets have been deprecated across all modern browsers for over a decade and are unsupported."
    },
    "references": [{"title": "Interactive Artifacts", "url": "https://support.anthropic.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them"}]
  }
]

questions_d3 = [
  {
    "id": 301,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "A logistics specialist uploads an image of a complex warehouse logistics dashboard containing 4 different scatter plots, two stacked bar charts, and a small data table in the lower-right corner. They ask: 'What was the exact delivery failure rate in Region 4 during Week 38?'",
    "question": "What prompting strategy yields the most accurate extraction from this visually dense multi-chart image?",
    "options": [
      {"label": "A", "text": "Direct Claude to first locate and describe the lower-right table header, transcribe the row coordinates for Region 4, and quote the exact cell value before formulating the final answer."},
      {"label": "B", "text": "Ask Claude to provide an immediate single-number answer with zero explanation to avoid distraction."},
      {"label": "C", "text": "Reduce the image resolution to 256x256 pixels to speed up OCR inference."},
      {"label": "D", "text": "Invert the image colors in Photoshop before uploading to Claude."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Guided Visual Grounding and Step-by-Step Spatial Inspection",
    "explanation": "Guiding Claude to locate the specific quadrant, describe the table headers, and transcribe relevant text coordinates forces visual chain-of-thought grounding, dramatically decreasing hallucination on dense or low-contrast charts.",
    "distractorAnalysis": {
      "B": "Demanding a single number without reasoning prevents the model from visually grounding its search, leading to higher error rates on complex charts.",
      "C": "Downscaling to 256x256 severely degrades fine text and renders small table numbers unreadable.",
      "D": "Color inversion can distort chart legends and color-coded data series without improving OCR."
    },
    "references": [{"title": "Vision Best Practices", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 302,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "An archivist uploads a scanned historical PDF document where the text is oriented sideways (rotated 90 degrees clockwise) and contains faint, handwritten annotations in the margins.",
    "question": "What is the best approach to ensure Claude accurately transcribes and interprets the document?",
    "options": [
      {"label": "A", "text": "Rotate the document pages to upright orientation (0 degrees) and ensure adequate contrast before uploading, noting in the prompt where annotations appear."},
      {"label": "B", "text": "Upload the document sideways because Claude 3.5 Sonnet's vision encoders are rotation-invariant and prefer landscape orientation."},
      {"label": "C", "text": "Rely entirely on Claude's audio modality to read the document aloud."},
      {"label": "D", "text": "Convert the PDF into an animated GIF that flashes each page for 500 milliseconds."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Image Orientation and Preprocessing for Vision",
    "explanation": "Vision models perform substantially better when documents are properly oriented right-side up. While Claude can sometimes decipher rotated text, orienting pages correctly and ensuring good contrast eliminates OCR degradation.",
    "distractorAnalysis": {
      "B": "Vision encoders are optimized for canonical upright text; sideways or upside-down text suffers significantly higher error rates.",
      "C": "Claude does not have a native real-time audio OCR reading modality.",
      "D": "Flashing animated GIFs are not an effective document ingestion format."
    },
    "references": [{"title": "Image Quality and Orientation", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 303,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "A quality assurance engineer uploads two UI screenshots: 'v1.2_homepage.png' and 'v1.3_homepage.png'. The engineer wants to identify subtle visual regressions, such as shifted button alignments, missing icons, and changed font weights.",
    "question": "How does Claude handle multi-image comparative queries within a single conversational turn?",
    "options": [
      {"label": "A", "text": "Claude can analyze multiple uploaded images in the same turn, compare visual elements across them, and produce a structured list of visual and textual differences."},
      {"label": "B", "text": "Claude can only view one image per turn; uploading a second image automatically deletes the first from memory."},
      {"label": "C", "text": "Claude compares images by computing MD5 file hashes and only reports whether the files are bitwise identical."},
      {"label": "D", "text": "Multi-image comparisons require launching an external MCP Python sub-agent."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Multi-Image Comparison and Reasoning",
    "explanation": "Claude supports multi-image inputs (up to 20 images per request) in a single turn. It can cross-reference, contrast layout elements, and pinpoint subtle differences between UI screenshots or diagrams.",
    "distractorAnalysis": {
      "B": "Claude natively supports multiple images simultaneously; subsequent images do not erase previous ones.",
      "C": "Claude uses deep multimodal vision transformers to inspect visual features, layout, and text, not cryptographic file hashes.",
      "D": "Direct multi-image reasoning is native to Claude 3.5 Sonnet and does not require external MCP tooling."
    },
    "references": [{"title": "Comparing Multiple Images", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 304,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "A hardware engineer uploads a high-resolution 12,000 x 9,000 pixel image of a motherboard PCB and asks Claude to count the exact number of miniature surface-mount ceramic capacitors (measuring 4x4 pixels each) across the board.",
    "question": "What is a recognized limitation of frontier vision LLMs regarding this task?",
    "options": [
      {"label": "A", "text": "Vision models downscale or tile massive images and struggle with exact spatial counting of hundreds of tiny, repetitive micro-objects without specialized bounding-box vision tools."},
      {"label": "B", "text": "Claude refuses to process motherboard images due to hardware intellectual property filters."},
      {"label": "C", "text": "Images over 1,000 pixels are permanently rejected by the Claude upload gateway."},
      {"label": "D", "text": "Claude can only detect green PCB boards, not blue or black circuit substrates."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Spatial Reasoning and Micro-Object Counting Caveats",
    "explanation": "General-purpose vision LLMs have inherent limitations with fine-grained spatial enumeration (counting dozens or hundreds of tiny, identical objects) and image downscaling. Specialized computer vision object-detection models are better suited for micro-component enumeration.",
    "distractorAnalysis": {
      "B": "There are no IP filters preventing PCB inspection.",
      "C": "Images up to standard megabyte limits are accepted and automatically resized or tiled to fit internal token budgets.",
      "D": "Substrate color does not prevent multimodal image ingestion."
    },
    "references": [{"title": "Vision Model Limitations", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 305,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "A financial auditor uploads a 40-page financial PDF report containing both native digital text layers and embedded scanned receipt images. They need to extract all balance sheet figures into a structured table.",
    "question": "How does Claude process PDF documents uploaded in Claude Web and the Messages API?",
    "options": [
      {"label": "A", "text": "Claude processes the document by extracting both the embedded digital text and rendering page images for visual analysis, combining text parsing with vision intelligence."},
      {"label": "B", "text": "Claude only reads pure ASCII plain text and completely ignores all scanned images and diagrams in PDFs."},
      {"label": "C", "text": "Claude automatically emails the PDF to an external human transcription pool."},
      {"label": "D", "text": "Claude converts all PDF numbers into hexadecimal floating-point numbers prior to ingestion."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Hybrid PDF Ingestion (Text and Visual Processing)",
    "explanation": "Anthropic's PDF processing pipeline extracts underlying digital text while also rendering pages visually. This hybrid architecture ensures that both textual data and visual elements (charts, tables, signatures) are captured accurately.",
    "distractorAnalysis": {
      "B": "Claude's document pipeline does not ignore scanned images; visual pages are processed via multimodal vision.",
      "C": "All document processing is automated via AI models under strict privacy controls without human review pools.",
      "D": "Claude does not convert PDF numbers to hexadecimal floats."
    },
    "references": [{"title": "PDF Support with Claude", "url": "https://docs.anthropic.com/en/docs/build-with-claude/pdf-support"}]
  },
  {
    "id": 306,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "A civil engineer takes a photo of a whiteboard with handwritten formulas and structural diagrams under dim lighting, causing heavy shadows and glare across the upper section.",
    "question": "Which action will most significantly improve Claude's transcription accuracy of the whiteboard?",
    "options": [
      {"label": "A", "text": "Retake the photo with direct, even lighting (eliminating glare and harsh shadows) or crop tightly to the key formula sections before uploading."},
      {"label": "B", "text": "Add 'Enhance image resolution by 400%' to the user prompt."},
      {"label": "C", "text": "Convert the image from PNG format to WebP format."},
      {"label": "D", "text": "Ask Claude to guess the missing formulas using unconstrained creative reasoning."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Image Preprocessing and Input Quality",
    "explanation": "Model accuracy is directly bounded by input signal quality. Providing clear, glare-free, well-lit photos or cropping out unnecessary background noise allows the vision transformer to resolve stroke details without ambiguity.",
    "distractorAnalysis": {
      "B": "Prompt instructions cannot magically reconstruct pixel information obscured by physical glare.",
      "C": "Changing between standard compressed formats (PNG to WebP) does not eliminate shadows or lighting glare.",
      "D": "Unconstrained guessing encourages hallucinations rather than rigorous mathematical transcription."
    },
    "references": [{"title": "Tips for High Quality Vision Prompts", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 307,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "An e-commerce business analyst wants to analyze a product catalog image showing 10 items arranged on a grid. They need to identify which item is in Row 2, Column 3 and extract its price tag.",
    "question": "Which spatial prompt instruction best assists Claude in isolating the correct item?",
    "options": [
      {"label": "A", "text": "Instruct Claude: 'First identify the 2x5 grid layout, count the rows from top to bottom and columns from left to right, describe the item at (Row 2, Column 3), and read its price tag.'"},
      {"label": "B", "text": "Instruct Claude: 'What is the price?' with no reference to grid position."},
      {"label": "C", "text": "Instruct Claude: 'Analyze all 10 items in reverse alphabetical order.'"},
      {"label": "D", "text": "Instruct Claude: 'Ignore image geometry and deduce the answer from global item statistics.'"}
    ],
    "correctAnswer": "A",
    "keyConcept": "Explicit Spatial Coordinate Grounding",
    "explanation": "Providing explicit spatial coordinate guidance (grid dimensions, direction of traversal, coordinate indices) establishes clear reference frames, enabling the vision model to accurately bind visual attributes to specific spatial locations.",
    "distractorAnalysis": {
      "B": "Ambiguous prompts with multiple price tags in view force the model to guess which item the user intended.",
      "C": "Alphabetical ordering is difficult to apply before item names have even been identified.",
      "D": "Ignoring image geometry directly counteracts spatial identification."
    },
    "references": [{"title": "Spatial Reasoning in Vision", "url": "https://docs.anthropic.com/en/docs/build-with-claude/vision"}]
  },
  {
    "id": 308,
    "domain": 3,
    "domainName": "Multimodal Document & Vision Intelligence",
    "scenario": "A medical researcher wants to use Claude Web to analyze a folder of 15 DICOM medical imaging scans (.dcm) for lung nodule detection.",
    "question": "What is the policy and capability boundary for analyzing specialized medical imaging in Claude?",
    "options": [
      {"label": "A", "text": "DICOM is not a natively supported image format in Claude Web, and Claude is not certified or intended as a diagnostic medical device for interpreting clinical radiology scans."},
      {"label": "B", "text": "Claude Web automatically converts DICOM files into 3D holograms and provides official FDA-cleared diagnostic sign-offs."},
      {"label": "C", "text": "Claude natively supports DICOM files, provided the user enables the 'Clinical Mode' toggle in settings."},
      {"label": "D", "text": "Claude can process DICOM scans if the files are renamed with a .jpg extension."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Medical Diagnostics Safety Boundary and Specialized Formats",
    "explanation": "Anthropic models are not certified medical diagnostic devices. Furthermore, raw clinical imaging formats like DICOM are not supported natively in Claude Web. Users must not rely on Claude for autonomous clinical diagnostic decisions.",
    "distractorAnalysis": {
      "B": "Claude does not generate 3D holograms and is strictly not an FDA-cleared diagnostic tool.",
      "C": "There is no 'Clinical Mode' toggle in Claude Web settings.",
      "D": "Renaming file extensions corrupts file headers and does not allow binary DICOM parsing."
    },
    "references": [{"title": "Anthropic Usage Policy - Health and Safety", "url": "https://www.anthropic.com/legal/aup"}]
  }
]

questions_d4 = [
  {
    "id": 401,
    "domain": 4,
    "domainName": "Everyday Prompting & Structuring for Knowledge Workers",
    "scenario": "A sales executive wants Claude to draft a personalized outreach email to a prospective enterprise customer based on recent press releases. The executive's first prompt, 'Write a sales email to Acme Corp,' produced generic marketing buzzwords.",
    "question": "Which prompt engineering technique will most reliably elevate the quality, tone, and relevance of the draft?",
    "options": [
      {"label": "A", "text": "Assign Claude a specific professional role ('Senior Enterprise Account Executive'), provide recent Acme news as source text inside XML tags, and define exact tone and length parameters."},
      {"label": "B", "text": "Add 'URGENT: Make this high quality and do not use buzzwords' in all capital letters."},
      {"label": "C", "text": "Increase the browser zoom level to 125% to allocate more screen space to the prompt input field."},
      {"label": "D", "text": "Repeat the word 'professional' twenty times throughout the prompt."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Role Priming, Context Injection, and Output Constraints",
    "explanation": "Role prompting sets the persona and perspective, enclosing source data in XML tags provides factual grounding, and specifying explicit tone and length boundaries gives Claude clear criteria for success.",
    "distractorAnalysis": {
      "B": "All-caps emotional appeals are less effective than structured context and concrete constraints.",
      "C": "Browser zoom has zero impact on model inference or token processing.",
      "D": "Keyword repetition adds noise and degrades prompt clarity without defining actionable criteria."
    },
    "references": [{"title": "Prompt Engineering Overview", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"}]
  },
  {
    "id": 402,
    "domain": 4,
    "domainName": "Everyday Prompting & Structuring for Knowledge Workers",
    "scenario": "A human resources manager wants Claude to evaluate job applicants against a scoring rubric. In the prompt, the manager includes the rubric, interview notes, and company hiring policies all as a single unbroken block of text, leading Claude to mix up applicant answers with policy rules.",
    "question": "Which structuring technique solves this ambiguity most effectively for Claude?",
    "options": [
      {"label": "A", "text": "Enclose each distinct information block within semantic XML tags, such as <rubric>, <policies>, and <candidate_notes>."},
      {"label": "B", "text": "Separate each section with long strings of random punctuation marks like '~~~~~~~~~' or '**********'."},
      {"label": "C", "text": "Use different colored fonts by pasting rich HTML into the chat box."},
      {"label": "D", "text": "Instruct Claude to use psychic intuition to guess where sections begin and end."}
    ],
    "correctAnswer": "A",
    "keyConcept": "XML Tag Structuring for Multi-Part Prompts",
    "explanation": "Claude is specifically fine-tuned to recognize and parse XML tags (e.g., <instructions>, <context>, <examples>). Tagging distinct components eliminates ambiguity and ensures clear separation between instructions and reference data.",
    "distractorAnalysis": {
      "B": "Arbitrary punctuation strings lack semantic meaning and do not structure inputs as cleanly as XML tags.",
      "C": "Claude receives sanitized plaintext tokens; font colors are stripped during tokenization.",
      "D": "Models operate on statistical and linguistic token representations, not psychic intuition."
    },
    "references": [{"title": "Use XML Tags", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags"}]
  },
  {
    "id": 403,
    "domain": 4,
    "domainName": "Everyday Prompting & Structuring for Knowledge Workers",
    "scenario": "A business analyst needs customer support feedback categorized into one of four rigid sentiment categories: [Bug, Feature Request, Billing Inquiry, Praise]. Zero deviation or conversational preamble is permitted.",
    "question": "What is the best way to ensure Claude formats the output with 100% adherence to this classification schema?",
    "options": [
      {"label": "A", "text": "Provide 3–5 diverse few-shot examples showing raw feedback and exact expected categorical output inside <examples> tags, and instruct Claude to output only the label."},
      {"label": "B", "text": "Tell Claude: 'Classify this, please do your best!'"},
      {"label": "C", "text": "Threaten Claude with negative consequences if it outputs conversational greetings."},
      {"label": "D", "text": "Ask Claude to write an essay explaining the history of sentiment classification before outputting the label."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Few-Shot Prompting and Format Enforcement",
    "explanation": "Few-shot examples provide concrete demonstrations of expected input/output mapping. Showing Claude exact target outputs eliminates conversational preamble and establishes exact stylistic and formatting boundaries.",
    "distractorAnalysis": {
      "B": "Vague instructions without examples frequently result in chatty preamble ('Sure, here is your classification...').",
      "C": "Adversarial or threatening phrasing is unprofessional and far less reliable than structural few-shot examples.",
      "D": "Requesting an essay directly violates the requirement for zero conversational deviation."
    },
    "references": [{"title": "Give Claude Examples", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/give-examples"}]
  },
  {
    "id": 404,
    "domain": 4,
    "domainName": "Everyday Prompting & Structuring for Knowledge Workers",
    "scenario": "A policy analyst is querying a 100-page government regulation uploaded to Claude. When asked about specific compliance penalties, the analyst wants to guarantee that Claude's answer does not hallucinate fictional statutory citations.",
    "question": "Which prompt instruction is most effective at preventing hallucinations when analyzing reference text?",
    "options": [
      {"label": "A", "text": "Instruct Claude: 'Quote exact excerpts from the text into <quotes> tags that support your answer before explaining your conclusion. If the document does not mention the answer, state that it is not found.'"},
      {"label": "B", "text": "Instruct Claude: 'Never make mistakes, and make sure your confidence is 100%.'"},
      {"label": "C", "text": "Instruct Claude: 'Search the public internet to verify the document's claims.'"},
      {"label": "D", "text": "Instruct Claude: 'Translate the document into Latin first, then translate it back to English.'"}
    ],
    "correctAnswer": "A",
    "keyConcept": "Quote-First Grounding and Fallback Permission",
    "explanation": "Forcing Claude to extract verbatim citations into <quotes> tags grounds its reasoning directly in the source text. Explicitly granting permission to say 'not found in text' prevents the model from confabulating answers when information is absent.",
    "distractorAnalysis": {
      "B": "Demanding 100% confidence causes overconfident hallucinations rather than verifiable grounding.",
      "C": "Standard Claude prompts without external tool configuration cannot arbitrarily browse the live web.",
      "D": "Double translation degrades semantic nuances and increases hallucination risks."
    },
    "references": [{"title": "Grounding and Avoiding Hallucinations", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/grounding"}]
  },
  {
    "id": 405,
    "domain": 4,
    "domainName": "Everyday Prompting & Structuring for Knowledge Workers",
    "scenario": "A management consultant asks Claude to analyze a complex acquisition scenario with multiple conflicting financial statements, tax liabilities, and regulatory hurdles. The first attempt yields a rushed, superficial recommendation.",
    "question": "Which prompting technique gives Claude the cognitive leeway to work through complex logic before arriving at the recommendation?",
    "options": [
      {"label": "A", "text": "Direct Claude to 'think step-by-step' inside <scratchpad> or <thinking> tags to evaluate each financial and tax dimension before writing the final recommendation."},
      {"label": "B", "text": "Ask Claude to answer in less than 10 words to force concise thinking."},
      {"label": "C", "text": "Set the model temperature to 1.0 to encourage maximum randomness."},
      {"label": "D", "text": "Submit the query five times simultaneously in separate tabs."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Chain-of-Thought Scratchpads (Giving Claude Room to Think)",
    "explanation": "Directing Claude to think step-by-step and write out intermediate evaluations in a scratchpad allows the autoregressive model to generate its own reasoning context, leading to significantly deeper and more sound analytical conclusions.",
    "distractorAnalysis": {
      "B": "Forcing extreme brevity deprives the model of tokens needed to reason through multi-variable trade-offs.",
      "C": "High temperature introduces stochastic variance and reduces analytical consistency.",
      "D": "Submitting parallel queries without altering the prompt repeats the same superficial reasoning."
    },
    "references": [{"title": "Give Claude Time to Think", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/give-claude-time-to-think"}]
  },
  {
    "id": 406,
    "domain": 4,
    "domainName": "Everyday Prompting & Structuring for Knowledge Workers",
    "scenario": "A user wants Claude to generate a clean, automated summary for an executive dashboard. In previous turns, Claude always began its output with polite conversational filler: 'Sure! I would be delighted to help you summarize this document. Here is your summary:'.",
    "question": "How can the user eliminate this conversational filler and obtain only the raw summary?",
    "options": [
      {"label": "A", "text": "Add a negative constraint: 'Do not include any conversational pleasantries, intros, or outros. Output only the raw summary text starting immediately with the header.'"},
      {"label": "B", "text": "Type 'STOP TALKING' at the end of the prompt."},
      {"label": "C", "text": "Clear the browser cache and change account language settings."},
      {"label": "D", "text": "Downgrade the account from Claude Pro to Claude Free."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Eliminating Conversational Filler and Direct Output Prompting",
    "explanation": "Explicit output formatting constraints ('Do not include pleasantries; start directly with...') instruct Claude to bypass default conversational niceties and emit only the requested payload.",
    "distractorAnalysis": {
      "B": "Aggressive, vague commands are less reliable than clear structural formatting instructions.",
      "C": "Browser cache and UI localization settings do not modify model preamble behavior.",
      "D": "Account tiers have no bearing on model conversational formatting style."
    },
    "references": [{"title": "Control Output Format", "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/control-output-format"}]
  }
]

questions_d5 = [
  {
    "id": 501,
    "domain": 5,
    "domainName": "Collaboration, Team Workspaces & Commercial Privacy",
    "scenario": "The Chief Information Security Officer (CISO) of a healthcare enterprise is evaluating whether staff can use Claude Team and Enterprise plans for drafting internal communications containing proprietary business strategies.",
    "question": "What is Anthropic's official policy regarding model training on commercial data submitted through Claude Team, Enterprise, and API accounts?",
    "options": [
      {"label": "A", "text": "Anthropic does not train foundation models on customer prompts, attachments, or completions submitted through commercial plans (Team, Enterprise, and API) by default."},
      {"label": "B", "text": "Anthropic automatically uses all commercial data to train future models unless the customer mails a physical opt-out letter."},
      {"label": "C", "text": "Commercial data is trained on only during weekend batch retraining cycles."},
      {"label": "D", "text": "All enterprise data is uploaded to public Hugging Face datasets after 30 days."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Commercial Data Privacy and Model Training Policies",
    "explanation": "Anthropic maintains a strict data privacy boundary for commercial offerings: data from Claude Team, Claude Enterprise, and the commercial Messages API is never used to train Anthropic foundation models by default.",
    "distractorAnalysis": {
      "B": "Commercial plans are opt-out by default; no manual physical letter or bureaucratic process is required.",
      "C": "No training occurs on commercial customer data regardless of the day or time.",
      "D": "Customer enterprise data is never published to public repositories."
    },
    "references": [{"title": "Anthropic Commercial Privacy & Trust Center", "url": "https://trust.anthropic.com"}]
  },
  {
    "id": 502,
    "domain": 5,
    "domainName": "Collaboration, Team Workspaces & Commercial Privacy",
    "scenario": "An IT department is comparing Claude account tiers for their 50-person product organization. They require centralized billing, a shared workspace for projects, and administrative user provisioning.",
    "question": "Which minimum Claude subscription tier provides shared team workspaces and centralized member management?",
    "options": [
      {"label": "A", "text": "Claude Team plan."},
      {"label": "B", "text": "Claude Free tier."},
      {"label": "C", "text": "Claude Pro individual plan."},
      {"label": "D", "text": "Anthropic Console API Pay-As-You-Go account."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Claude Subscription Tiers and Team Capabilities",
    "explanation": "The Claude Team plan is specifically designed for organizations, offering centralized billing, member role management, shared Projects, and increased usage limits over individual Claude Pro subscriptions.",
    "distractorAnalysis": {
      "B": "Claude Free is an individual tier with basic usage limits and no team collaboration features.",
      "C": "Claude Pro is an individual subscription without centralized team administration or shared project workspaces.",
      "D": "The API Console is for software developers integrating API keys into applications, not an end-user workplace collaboration interface."
    },
    "references": [{"title": "Claude Plans and Pricing", "url": "https://claude.ai/pricing"}]
  },
  {
    "id": 503,
    "domain": 5,
    "domainName": "Collaboration, Team Workspaces & Commercial Privacy",
    "scenario": "A financial company on Claude Enterprise requires that all employee sessions be strictly audited, with user access managed through their corporate Okta single sign-on (SSO) and role-based access control (RBAC).",
    "question": "Which Claude subscription tier includes native SAML/SSO integration, SCIM directory provisioning, and enterprise audit logs?",
    "options": [
      {"label": "A", "text": "Claude Enterprise."},
      {"label": "B", "text": "Claude Free."},
      {"label": "C", "text": "Claude Pro."},
      {"label": "D", "text": "Claude Community Edition."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Enterprise Governance, SSO, and Audit Capabilities",
    "explanation": "Claude Enterprise provides comprehensive corporate governance tools, including SAML 2.0 Single Sign-On (SSO), SCIM provisioning, detailed audit logs, expanded context capabilities, and dedicated customer success support.",
    "distractorAnalysis": {
      "B": "Free accounts have no corporate identity integrations.",
      "C": "Pro is an individual account tier lacking SSO, SCIM, and organizational audit logging.",
      "D": "There is no 'Claude Community Edition' tier."
    },
    "references": [{"title": "Claude Enterprise Overview", "url": "https://www.anthropic.com/enterprise"}]
  },
  {
    "id": 504,
    "domain": 5,
    "domainName": "Collaboration, Team Workspaces & Commercial Privacy",
    "scenario": "An employee on a Claude Team plan initiates a chat in a shared project containing proprietary product roadmaps. The employee clicks 'Share Link to Chat' to create a link.",
    "question": "What security control prevents this shared conversation from becoming publicly accessible to unauthorized third parties on the open internet?",
    "options": [
      {"label": "A", "text": "On Team and Enterprise plans, shared chat links are restricted to authenticated members within the organization's workspace domain."},
      {"label": "B", "text": "Shared links are protected by an automatic 4-digit SMS verification code sent to the employee's phone."},
      {"label": "C", "text": "The conversation is automatically converted into an encrypted torrent file."},
      {"label": "D", "text": "Shared links expire and self-destruct within 30 seconds of creation."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Domain-Restricted Shared Links in Workspaces",
    "explanation": "In Claude Team and Enterprise environments, shared conversation links are gated behind workspace authentication, ensuring that only verified team members within the corporate organization can view the shared content.",
    "distractorAnalysis": {
      "B": "Anthropic does not require SMS verification codes to access shared workspace links.",
      "C": "Shared conversations are served over HTTPS web endpoints, not peer-to-peer torrents.",
      "D": "Shared links remain accessible to team members until unshared or deleted, rather than expiring after 30 seconds."
    },
    "references": [{"title": "Sharing Chats within Your Team", "url": "https://support.anthropic.com/en/articles/9517075-what-is-a-project"}]
  },
  {
    "id": 505,
    "domain": 5,
    "domainName": "Collaboration, Team Workspaces & Commercial Privacy",
    "scenario": "A regulated bank is auditing data residency and retention settings for their Claude Enterprise workspace. Under their compliance guidelines, conversation logs must be purged after 90 days.",
    "question": "How do enterprise administrators configure and enforce data retention rules in Claude Enterprise?",
    "options": [
      {"label": "A", "text": "Administrators configure automated data retention policies in the Enterprise Admin Console to define custom retention windows or enable Zero Data Retention (ZDR)."},
      {"label": "B", "text": "Administrators must instruct every employee to manually click 'Delete Chat' on their individual accounts every Friday afternoon."},
      {"label": "C", "text": "Data retention is controlled exclusively by clearing web browser cookies on employee laptops."},
      {"label": "D", "text": "Claude Enterprise does not support data retention controls; all conversations are immutable for 50 years."}
    ],
    "correctAnswer": "A",
    "keyConcept": "Enterprise Data Retention Policies and ZDR",
    "explanation": "Claude Enterprise empowers administrators to set custom data retention timeframes centrally through the Admin Console, ensuring automated compliance with corporate data lifecycle and regulatory requirements.",
    "distractorAnalysis": {
      "B": "Manual deletion is neither auditable nor enforceable for enterprise compliance mandates.",
      "C": "Browser cookies only affect local sessions and do not control cloud-hosted data retention policies.",
      "D": "Anthropic explicitly provides configurable retention schedules and Zero Data Retention options."
    },
    "references": [{"title": "Enterprise Data Management", "url": "https://trust.anthropic.com"}]
  },
  {
    "id": 506,
    "domain": 5,
    "domainName": "Collaboration, Team Workspaces & Commercial Privacy",
    "scenario": "An organization's workspace Primary Owner notices that several employees who left the company last week still appear in the workspace directory.",
    "question": "What actions should the Primary Owner take in the Admin Console to maintain security and manage seat licensing?",
    "options": [
      {"label": "A", "text": "Deactivate or remove the departed employees from the workspace in the Admin Console, immediately revoking access and releasing their licenses for reassignment."},
      {"label": "B", "text": "Change the company's public domain name to force an account lock."},
      {"label": "C", "text": "Wait for the annual billing renewal date, as user licenses cannot be modified mid-cycle."},
      {"label": "D", "text": "Ask the departed employees to delete the Claude app from their mobile phones."}
    ],
    "correctAnswer": "A",
    "keyConcept": "User Deprovisioning and License Management",
    "explanation": "Workspace Administrators and Primary Owners can deprovision departing users instantly via the Admin Console (or automatically via SCIM), revoking account access and freeing paid seats for active staff.",
    "distractorAnalysis": {
      "B": "Changing company domains is disruptive and is not the proper procedure for deprovisioning personnel.",
      "C": "Administrators can deactivate members and reassign seats at any time without waiting for renewal.",
      "D": "Relying on ex-employees to delete client apps leaves active session tokens and corporate data exposed."
    },
    "references": [{"title": "Managing Team Members", "url": "https://support.anthropic.com/en/articles/9266767-manage-your-team"}]
  }
]

def format_ts(questions):
    output = "import type { Question } from '../../types';\n\nexport const questions: Question[] = [\n"
    for q in questions:
        output += "  {\n"
        output += f"    id: {q['id']},\n"
        output += f"    domain: {q['domain']},\n"
        output += f"    domainName: {repr(q['domainName'])},\n"
        output += f"    scenario: {repr(q['scenario'])},\n"
        output += f"    question: {repr(q['question'])},\n"
        output += "    options: [\n"
        for opt in q['options']:
            output += f"      {{ label: {repr(opt['label'])}, text: {repr(opt['text'])} }},\n"
        output += "    ],\n"
        output += f"    correctAnswer: {repr(q['correctAnswer'])},\n"
        output += f"    keyConcept: {repr(q['keyConcept'])},\n"
        output += f"    explanation: {repr(q['explanation'])},\n"
        output += "    distractorAnalysis: {\n"
        for k, v in q['distractorAnalysis'].items():
            output += f"      {k}: {repr(v)},\n"
        output += "    },\n"
        output += "    references: [\n"
        for ref in q['references']:
            output += f"      {{ title: {repr(ref['title'])}, url: {repr(ref['url'])} }}\n"
        output += "    ]\n"
        output += "  },\n"
    output += "];\n"
    return output

if __name__ == "__main__":
    repo_root = os.path.dirname(os.path.abspath(__file__))
    base_quiz = os.path.join(repo_root, "certs/ccar-foundations/quiz/src/data/ccao")
    base_cert = os.path.join(repo_root, "certs/ccao-foundations/quiz")
    
    os.makedirs(base_quiz, exist_ok=True)
    os.makedirs(base_cert, exist_ok=True)

    files = [
      ("questions-d1.ts", questions_d1),
      ("questions-d2.ts", questions_d2),
      ("questions-d3.ts", questions_d3),
      ("questions-d4.ts", questions_d4),
      ("questions-d5.ts", questions_d5),
    ]

    total = 0
    for filename, qlist in files:
        total += len(qlist)
        content = format_ts(qlist)
        with open(os.path.join(base_quiz, filename), "w") as f:
            f.write(content)
        with open(os.path.join(base_cert, filename), "w") as f:
            f.write(content.replace("../../types", "../types"))

    print(f"Successfully generated EXACTLY {total} questions for CCAO-F across all 5 domains.")
