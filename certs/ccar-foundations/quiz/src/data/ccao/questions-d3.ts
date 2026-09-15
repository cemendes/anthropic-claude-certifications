import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 301,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: "A logistics specialist uploads an image of a complex warehouse logistics dashboard containing 4 different scatter plots, two stacked bar charts, and a small data table in the lower-right corner. They ask: 'What was the exact delivery failure rate in Region 4 during Week 38?'",
    question: 'What prompting strategy yields the most accurate extraction from this visually dense multi-chart image?',
    options: [
      { label: 'A', text: 'Direct Claude to first locate and describe the lower-right table header, transcribe the row coordinates for Region 4, and quote the exact cell value before formulating the final answer.' },
      { label: 'B', text: 'Ask Claude to provide an immediate single-number answer with zero explanation to avoid distraction.' },
      { label: 'C', text: 'Reduce the image resolution to 256x256 pixels to speed up OCR inference.' },
      { label: 'D', text: 'Invert the image colors in Photoshop before uploading to Claude.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Guided Visual Grounding and Step-by-Step Spatial Inspection',
    explanation: 'Guiding Claude to locate the specific quadrant, describe the table headers, and transcribe relevant text coordinates forces visual chain-of-thought grounding, dramatically decreasing hallucination on dense or low-contrast charts.',
    distractorAnalysis: {
      B: 'Demanding a single number without reasoning prevents the model from visually grounding its search, leading to higher error rates on complex charts.',
      C: 'Downscaling to 256x256 severely degrades fine text and renders small table numbers unreadable.',
      D: 'Color inversion can distort chart legends and color-coded data series without improving OCR.',
    },
    references: [
      { title: 'Vision Best Practices', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
    ]
  },
  {
    id: 302,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: 'An archivist uploads a scanned historical PDF document where the text is oriented sideways (rotated 90 degrees clockwise) and contains faint, handwritten annotations in the margins.',
    question: 'What is the best approach to ensure Claude accurately transcribes and interprets the document?',
    options: [
      { label: 'A', text: 'Rotate the document pages to upright orientation (0 degrees) and ensure adequate contrast before uploading, noting in the prompt where annotations appear.' },
      { label: 'B', text: "Upload the document sideways because Claude 3.5 Sonnet's vision encoders are rotation-invariant and prefer landscape orientation." },
      { label: 'C', text: "Rely entirely on Claude's audio modality to read the document aloud." },
      { label: 'D', text: 'Convert the PDF into an animated GIF that flashes each page for 500 milliseconds.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Image Orientation and Preprocessing for Vision',
    explanation: 'Vision models perform substantially better when documents are properly oriented right-side up. While Claude can sometimes decipher rotated text, orienting pages correctly and ensuring good contrast eliminates OCR degradation.',
    distractorAnalysis: {
      B: 'Vision encoders are optimized for canonical upright text; sideways or upside-down text suffers significantly higher error rates.',
      C: 'Claude does not have a native real-time audio OCR reading modality.',
      D: 'Flashing animated GIFs are not an effective document ingestion format.',
    },
    references: [
      { title: 'Image Quality and Orientation', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
    ]
  },
  {
    id: 303,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: "A quality assurance engineer uploads two UI screenshots: 'v1.2_homepage.png' and 'v1.3_homepage.png'. The engineer wants to identify subtle visual regressions, such as shifted button alignments, missing icons, and changed font weights.",
    question: 'How does Claude handle multi-image comparative queries within a single conversational turn?',
    options: [
      { label: 'A', text: 'Claude can analyze multiple uploaded images in the same turn, compare visual elements across them, and produce a structured list of visual and textual differences.' },
      { label: 'B', text: 'Claude can only view one image per turn; uploading a second image automatically deletes the first from memory.' },
      { label: 'C', text: 'Claude compares images by computing MD5 file hashes and only reports whether the files are bitwise identical.' },
      { label: 'D', text: 'Multi-image comparisons require launching an external MCP Python sub-agent.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Multi-Image Comparison and Reasoning',
    explanation: 'Claude supports multi-image inputs (up to 20 images per request) in a single turn. It can cross-reference, contrast layout elements, and pinpoint subtle differences between UI screenshots or diagrams.',
    distractorAnalysis: {
      B: 'Claude natively supports multiple images simultaneously; subsequent images do not erase previous ones.',
      C: 'Claude uses deep multimodal vision transformers to inspect visual features, layout, and text, not cryptographic file hashes.',
      D: 'Direct multi-image reasoning is native to Claude 3.5 Sonnet and does not require external MCP tooling.',
    },
    references: [
      { title: 'Comparing Multiple Images', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
    ]
  },
  {
    id: 304,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: 'A hardware engineer uploads a high-resolution 12,000 x 9,000 pixel image of a motherboard PCB and asks Claude to count the exact number of miniature surface-mount ceramic capacitors (measuring 4x4 pixels each) across the board.',
    question: 'What is a recognized limitation of frontier vision LLMs regarding this task?',
    options: [
      { label: 'A', text: 'Vision models downscale or tile massive images and struggle with exact spatial counting of hundreds of tiny, repetitive micro-objects without specialized bounding-box vision tools.' },
      { label: 'B', text: 'Claude refuses to process motherboard images due to hardware intellectual property filters.' },
      { label: 'C', text: 'Images over 1,000 pixels are permanently rejected by the Claude upload gateway.' },
      { label: 'D', text: 'Claude can only detect green PCB boards, not blue or black circuit substrates.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Spatial Reasoning and Micro-Object Counting Caveats',
    explanation: 'General-purpose vision LLMs have inherent limitations with fine-grained spatial enumeration (counting dozens or hundreds of tiny, identical objects) and image downscaling. Specialized computer vision object-detection models are better suited for micro-component enumeration.',
    distractorAnalysis: {
      B: 'There are no IP filters preventing PCB inspection.',
      C: 'Images up to standard megabyte limits are accepted and automatically resized or tiled to fit internal token budgets.',
      D: 'Substrate color does not prevent multimodal image ingestion.',
    },
    references: [
      { title: 'Vision Model Limitations', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
    ]
  },
  {
    id: 305,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: 'A financial auditor uploads a 40-page financial PDF report containing both native digital text layers and embedded scanned receipt images. They need to extract all balance sheet figures into a structured table.',
    question: 'How does Claude process PDF documents uploaded in Claude Web and the Messages API?',
    options: [
      { label: 'A', text: 'Claude processes the document by extracting both the embedded digital text and rendering page images for visual analysis, combining text parsing with vision intelligence.' },
      { label: 'B', text: 'Claude only reads pure ASCII plain text and completely ignores all scanned images and diagrams in PDFs.' },
      { label: 'C', text: 'Claude automatically emails the PDF to an external human transcription pool.' },
      { label: 'D', text: 'Claude converts all PDF numbers into hexadecimal floating-point numbers prior to ingestion.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Hybrid PDF Ingestion (Text and Visual Processing)',
    explanation: "Anthropic's PDF processing pipeline extracts underlying digital text while also rendering pages visually. This hybrid architecture ensures that both textual data and visual elements (charts, tables, signatures) are captured accurately.",
    distractorAnalysis: {
      B: "Claude's document pipeline does not ignore scanned images; visual pages are processed via multimodal vision.",
      C: 'All document processing is automated via AI models under strict privacy controls without human review pools.',
      D: 'Claude does not convert PDF numbers to hexadecimal floats.',
    },
    references: [
      { title: 'PDF Support with Claude', url: 'https://docs.anthropic.com/en/docs/build-with-claude/pdf-support' }
    ]
  },
  {
    id: 306,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: 'A civil engineer takes a photo of a whiteboard with handwritten formulas and structural diagrams under dim lighting, causing heavy shadows and glare across the upper section.',
    question: "Which action will most significantly improve Claude's transcription accuracy of the whiteboard?",
    options: [
      { label: 'A', text: 'Retake the photo with direct, even lighting (eliminating glare and harsh shadows) or crop tightly to the key formula sections before uploading.' },
      { label: 'B', text: "Add 'Enhance image resolution by 400%' to the user prompt." },
      { label: 'C', text: 'Convert the image from PNG format to WebP format.' },
      { label: 'D', text: 'Ask Claude to guess the missing formulas using unconstrained creative reasoning.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Image Preprocessing and Input Quality',
    explanation: 'Model accuracy is directly bounded by input signal quality. Providing clear, glare-free, well-lit photos or cropping out unnecessary background noise allows the vision transformer to resolve stroke details without ambiguity.',
    distractorAnalysis: {
      B: 'Prompt instructions cannot magically reconstruct pixel information obscured by physical glare.',
      C: 'Changing between standard compressed formats (PNG to WebP) does not eliminate shadows or lighting glare.',
      D: 'Unconstrained guessing encourages hallucinations rather than rigorous mathematical transcription.',
    },
    references: [
      { title: 'Tips for High Quality Vision Prompts', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
    ]
  },
  {
    id: 307,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: 'An e-commerce business analyst wants to analyze a product catalog image showing 10 items arranged on a grid. They need to identify which item is in Row 2, Column 3 and extract its price tag.',
    question: 'Which spatial prompt instruction best assists Claude in isolating the correct item?',
    options: [
      { label: 'A', text: "Instruct Claude: 'First identify the 2x5 grid layout, count the rows from top to bottom and columns from left to right, describe the item at (Row 2, Column 3), and read its price tag.'" },
      { label: 'B', text: "Instruct Claude: 'What is the price?' with no reference to grid position." },
      { label: 'C', text: "Instruct Claude: 'Analyze all 10 items in reverse alphabetical order.'" },
      { label: 'D', text: "Instruct Claude: 'Ignore image geometry and deduce the answer from global item statistics.'" },
    ],
    correctAnswer: 'A',
    keyConcept: 'Explicit Spatial Coordinate Grounding',
    explanation: 'Providing explicit spatial coordinate guidance (grid dimensions, direction of traversal, coordinate indices) establishes clear reference frames, enabling the vision model to accurately bind visual attributes to specific spatial locations.',
    distractorAnalysis: {
      B: 'Ambiguous prompts with multiple price tags in view force the model to guess which item the user intended.',
      C: 'Alphabetical ordering is difficult to apply before item names have even been identified.',
      D: 'Ignoring image geometry directly counteracts spatial identification.',
    },
    references: [
      { title: 'Spatial Reasoning in Vision', url: 'https://docs.anthropic.com/en/docs/build-with-claude/vision' }
    ]
  },
  {
    id: 308,
    domain: 3,
    domainName: 'Multimodal Document & Vision Intelligence',
    scenario: 'A medical researcher wants to use Claude Web to analyze a folder of 15 DICOM medical imaging scans (.dcm) for lung nodule detection.',
    question: 'What is the policy and capability boundary for analyzing specialized medical imaging in Claude?',
    options: [
      { label: 'A', text: 'DICOM is not a natively supported image format in Claude Web, and Claude is not certified or intended as a diagnostic medical device for interpreting clinical radiology scans.' },
      { label: 'B', text: 'Claude Web automatically converts DICOM files into 3D holograms and provides official FDA-cleared diagnostic sign-offs.' },
      { label: 'C', text: "Claude natively supports DICOM files, provided the user enables the 'Clinical Mode' toggle in settings." },
      { label: 'D', text: 'Claude can process DICOM scans if the files are renamed with a .jpg extension.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Medical Diagnostics Safety Boundary and Specialized Formats',
    explanation: 'Anthropic models are not certified medical diagnostic devices. Furthermore, raw clinical imaging formats like DICOM are not supported natively in Claude Web. Users must not rely on Claude for autonomous clinical diagnostic decisions.',
    distractorAnalysis: {
      B: 'Claude does not generate 3D holograms and is strictly not an FDA-cleared diagnostic tool.',
      C: "There is no 'Clinical Mode' toggle in Claude Web settings.",
      D: 'Renaming file extensions corrupts file headers and does not allow binary DICOM parsing.',
    },
    references: [
      { title: 'Anthropic Usage Policy - Health and Safety', url: 'https://www.anthropic.com/legal/aup' }
    ]
  },
];
