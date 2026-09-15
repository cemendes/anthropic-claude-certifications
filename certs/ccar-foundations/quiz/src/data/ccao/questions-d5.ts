import type { Question } from '../../types';

export const questions: Question[] = [
  {
    id: 501,
    domain: 5,
    domainName: 'Collaboration, Team Workspaces & Commercial Privacy',
    scenario: 'The Chief Information Security Officer (CISO) of a healthcare enterprise is evaluating whether staff can use Claude Team and Enterprise plans for drafting internal communications containing proprietary business strategies.',
    question: "What is Anthropic's official policy regarding model training on commercial data submitted through Claude Team, Enterprise, and API accounts?",
    options: [
      { label: 'A', text: 'Anthropic does not train foundation models on customer prompts, attachments, or completions submitted through commercial plans (Team, Enterprise, and API) by default.' },
      { label: 'B', text: 'Anthropic automatically uses all commercial data to train future models unless the customer mails a physical opt-out letter.' },
      { label: 'C', text: 'Commercial data is trained on only during weekend batch retraining cycles.' },
      { label: 'D', text: 'All enterprise data is uploaded to public Hugging Face datasets after 30 days.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Commercial Data Privacy and Model Training Policies',
    explanation: 'Anthropic maintains a strict data privacy boundary for commercial offerings: data from Claude Team, Claude Enterprise, and the commercial Messages API is never used to train Anthropic foundation models by default.',
    distractorAnalysis: {
      B: 'Commercial plans are opt-out by default; no manual physical letter or bureaucratic process is required.',
      C: 'No training occurs on commercial customer data regardless of the day or time.',
      D: 'Customer enterprise data is never published to public repositories.',
    },
    references: [
      { title: 'Anthropic Commercial Privacy & Trust Center', url: 'https://trust.anthropic.com' }
    ]
  },
  {
    id: 502,
    domain: 5,
    domainName: 'Collaboration, Team Workspaces & Commercial Privacy',
    scenario: 'An IT department is comparing Claude account tiers for their 50-person product organization. They require centralized billing, a shared workspace for projects, and administrative user provisioning.',
    question: 'Which minimum Claude subscription tier provides shared team workspaces and centralized member management?',
    options: [
      { label: 'A', text: 'Claude Team plan.' },
      { label: 'B', text: 'Claude Free tier.' },
      { label: 'C', text: 'Claude Pro individual plan.' },
      { label: 'D', text: 'Anthropic Console API Pay-As-You-Go account.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Claude Subscription Tiers and Team Capabilities',
    explanation: 'The Claude Team plan is specifically designed for organizations, offering centralized billing, member role management, shared Projects, and increased usage limits over individual Claude Pro subscriptions.',
    distractorAnalysis: {
      B: 'Claude Free is an individual tier with basic usage limits and no team collaboration features.',
      C: 'Claude Pro is an individual subscription without centralized team administration or shared project workspaces.',
      D: 'The API Console is for software developers integrating API keys into applications, not an end-user workplace collaboration interface.',
    },
    references: [
      { title: 'Claude Plans and Pricing', url: 'https://claude.ai/pricing' }
    ]
  },
  {
    id: 503,
    domain: 5,
    domainName: 'Collaboration, Team Workspaces & Commercial Privacy',
    scenario: 'A financial company on Claude Enterprise requires that all employee sessions be strictly audited, with user access managed through their corporate Okta single sign-on (SSO) and role-based access control (RBAC).',
    question: 'Which Claude subscription tier includes native SAML/SSO integration, SCIM directory provisioning, and enterprise audit logs?',
    options: [
      { label: 'A', text: 'Claude Enterprise.' },
      { label: 'B', text: 'Claude Free.' },
      { label: 'C', text: 'Claude Pro.' },
      { label: 'D', text: 'Claude Community Edition.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Enterprise Governance, SSO, and Audit Capabilities',
    explanation: 'Claude Enterprise provides comprehensive corporate governance tools, including SAML 2.0 Single Sign-On (SSO), SCIM provisioning, detailed audit logs, expanded context capabilities, and dedicated customer success support.',
    distractorAnalysis: {
      B: 'Free accounts have no corporate identity integrations.',
      C: 'Pro is an individual account tier lacking SSO, SCIM, and organizational audit logging.',
      D: "There is no 'Claude Community Edition' tier.",
    },
    references: [
      { title: 'Claude Enterprise Overview', url: 'https://www.anthropic.com/enterprise' }
    ]
  },
  {
    id: 504,
    domain: 5,
    domainName: 'Collaboration, Team Workspaces & Commercial Privacy',
    scenario: "An employee on a Claude Team plan initiates a chat in a shared project containing proprietary product roadmaps. The employee clicks 'Share Link to Chat' to create a link.",
    question: 'What security control prevents this shared conversation from becoming publicly accessible to unauthorized third parties on the open internet?',
    options: [
      { label: 'A', text: "On Team and Enterprise plans, shared chat links are restricted to authenticated members within the organization's workspace domain." },
      { label: 'B', text: "Shared links are protected by an automatic 4-digit SMS verification code sent to the employee's phone." },
      { label: 'C', text: 'The conversation is automatically converted into an encrypted torrent file.' },
      { label: 'D', text: 'Shared links expire and self-destruct within 30 seconds of creation.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Domain-Restricted Shared Links in Workspaces',
    explanation: 'In Claude Team and Enterprise environments, shared conversation links are gated behind workspace authentication, ensuring that only verified team members within the corporate organization can view the shared content.',
    distractorAnalysis: {
      B: 'Anthropic does not require SMS verification codes to access shared workspace links.',
      C: 'Shared conversations are served over HTTPS web endpoints, not peer-to-peer torrents.',
      D: 'Shared links remain accessible to team members until unshared or deleted, rather than expiring after 30 seconds.',
    },
    references: [
      { title: 'Sharing Chats within Your Team', url: 'https://support.anthropic.com/en/articles/9517075-what-is-a-project' }
    ]
  },
  {
    id: 505,
    domain: 5,
    domainName: 'Collaboration, Team Workspaces & Commercial Privacy',
    scenario: 'A regulated bank is auditing data residency and retention settings for their Claude Enterprise workspace. Under their compliance guidelines, conversation logs must be purged after 90 days.',
    question: 'How do enterprise administrators configure and enforce data retention rules in Claude Enterprise?',
    options: [
      { label: 'A', text: 'Administrators configure automated data retention policies in the Enterprise Admin Console to define custom retention windows or enable Zero Data Retention (ZDR).' },
      { label: 'B', text: "Administrators must instruct every employee to manually click 'Delete Chat' on their individual accounts every Friday afternoon." },
      { label: 'C', text: 'Data retention is controlled exclusively by clearing web browser cookies on employee laptops.' },
      { label: 'D', text: 'Claude Enterprise does not support data retention controls; all conversations are immutable for 50 years.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'Enterprise Data Retention Policies and ZDR',
    explanation: 'Claude Enterprise empowers administrators to set custom data retention timeframes centrally through the Admin Console, ensuring automated compliance with corporate data lifecycle and regulatory requirements.',
    distractorAnalysis: {
      B: 'Manual deletion is neither auditable nor enforceable for enterprise compliance mandates.',
      C: 'Browser cookies only affect local sessions and do not control cloud-hosted data retention policies.',
      D: 'Anthropic explicitly provides configurable retention schedules and Zero Data Retention options.',
    },
    references: [
      { title: 'Enterprise Data Management', url: 'https://trust.anthropic.com' }
    ]
  },
  {
    id: 506,
    domain: 5,
    domainName: 'Collaboration, Team Workspaces & Commercial Privacy',
    scenario: "An organization's workspace Primary Owner notices that several employees who left the company last week still appear in the workspace directory.",
    question: 'What actions should the Primary Owner take in the Admin Console to maintain security and manage seat licensing?',
    options: [
      { label: 'A', text: 'Deactivate or remove the departed employees from the workspace in the Admin Console, immediately revoking access and releasing their licenses for reassignment.' },
      { label: 'B', text: "Change the company's public domain name to force an account lock." },
      { label: 'C', text: 'Wait for the annual billing renewal date, as user licenses cannot be modified mid-cycle.' },
      { label: 'D', text: 'Ask the departed employees to delete the Claude app from their mobile phones.' },
    ],
    correctAnswer: 'A',
    keyConcept: 'User Deprovisioning and License Management',
    explanation: 'Workspace Administrators and Primary Owners can deprovision departing users instantly via the Admin Console (or automatically via SCIM), revoking account access and freeing paid seats for active staff.',
    distractorAnalysis: {
      B: 'Changing company domains is disruptive and is not the proper procedure for deprovisioning personnel.',
      C: 'Administrators can deactivate members and reassign seats at any time without waiting for renewal.',
      D: 'Relying on ex-employees to delete client apps leaves active session tokens and corporate data exposed.',
    },
    references: [
      { title: 'Managing Team Members', url: 'https://support.anthropic.com/en/articles/9266767-manage-your-team' }
    ]
  },
];
