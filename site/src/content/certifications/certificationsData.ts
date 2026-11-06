export interface CertificationItem {
  id: string;
  name: string;
  code?: string;
  issuer: string;
  cost: string;
  isFree: boolean;
  timeNeeded: string;
  recognition: 'High (Industry Standard)' | 'High (Academic Credit in India)' | 'Medium (Skill Verification)' | 'Foundational / Beginner';
  officialUrl: string;
  lastVerified: string;
  description: string;
  keyTopics: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: 'cert-az204',
    name: 'Microsoft Certified: Azure Developer Associate',
    code: 'AZ-204',
    issuer: 'Microsoft',
    cost: '$165 USD (~₹4,800 INR standard Indian student/commercial pricing)',
    isFree: false,
    timeNeeded: '2–3 months study',
    recognition: 'High (Industry Standard)',
    officialUrl: 'https://learn.microsoft.com/credentials/certifications/azure-developer/',
    lastVerified: '2026-11-06',
    description: 'The premier enterprise cloud credential for .NET developers. Validates building, deploying, securing, and troubleshooting cloud applications with Azure App Service, Azure Functions, Blob Storage, Cosmos DB, and Azure Key Vault.',
    keyTopics: ['Azure App Service & Container Apps', 'Azure Functions & Event Grid', 'Azure Storage & Cosmos DB', 'Entra ID & Key Vault Authentication', 'Application Insights Telemetry']
  },
  {
    id: 'cert-az900',
    name: 'Microsoft Certified: Azure Fundamentals',
    code: 'AZ-900',
    issuer: 'Microsoft',
    cost: '$99 USD (~₹3,696 INR)',
    isFree: false,
    timeNeeded: '2–3 weeks study',
    recognition: 'Foundational / Beginner',
    officialUrl: 'https://learn.microsoft.com/credentials/certifications/azure-fundamentals/',
    lastVerified: '2026-11-06',
    description: 'Foundational understanding of cloud computing models (IaaS, PaaS, SaaS), cloud governance, security, and global pricing structures.',
    keyTopics: ['Cloud Concepts & SLA', 'Azure Architecture & Services', 'Security, Identity & Privacy', 'Cost Management & Governance']
  },
  {
    id: 'cert-fcc-csharp',
    name: 'Foundational C# with Microsoft Certification',
    issuer: 'freeCodeCamp in partnership with Microsoft',
    cost: 'Free ($0 / ₹0)',
    isFree: true,
    timeNeeded: '35 hours self-paced',
    recognition: 'Medium (Skill Verification)',
    officialUrl: 'https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft/',
    lastVerified: '2026-11-06',
    description: '100% free certified program co-created by Microsoft and freeCodeCamp. Includes interactive sandbox lessons and an 80-question comprehensive exam with a verifiable public digital credential.',
    keyTopics: ['C# Syntax & Basic Types', 'Branching & Loops', 'Variable Scope & Methods', 'Debugging & Exceptions', 'String Formatting']
  },
  {
    id: 'cert-ms-applied-skills',
    name: 'Microsoft Applied Skills (Scenario-Based Lab Credentials)',
    issuer: 'Microsoft Learn',
    cost: 'Free ($0 / ₹0)',
    isFree: true,
    timeNeeded: '2 hours per interactive lab',
    recognition: 'Medium (Skill Verification)',
    officialUrl: 'https://learn.microsoft.com/credentials/applied-skills/',
    lastVerified: '2026-11-06',
    description: 'Free scenario-based interactive lab evaluations inside real Azure environments. Focuses on tasks such as building serverless functions, configuring API Management, or deploying containerized apps.',
    keyTopics: ['Develop Azure Functions', 'Deploy Cloud Native Containers', 'Secure Storage Access with Managed Identities']
  },
  {
    id: 'cert-swayam-nptel',
    name: 'NPTEL / SWAYAM (India Ministry of Education)',
    issuer: 'IIT / NPTEL (India)',
    cost: 'Free to learn (₹1,000 INR optional proctored exam fee)',
    isFree: true,
    timeNeeded: '8–12 weeks semester course',
    recognition: 'High (Academic Credit in India)',
    officialUrl: 'https://swayam.gov.in/',
    lastVerified: '2026-11-06',
    description: 'Government-accredited computing and software engineering semester courses delivered by top Indian Institute of Technology (IIT) professors with optional university-transferable credits.',
    keyTopics: ['Data Structures & Algorithms', 'Database Systems', 'Software Engineering Principles', 'Object-Oriented Design']
  },
  {
    id: 'cert-coursera-edx',
    name: 'Coursera & edX Computer Science Specializations',
    issuer: 'University Partners / Tech Leaders',
    cost: 'Free to Audit ($0 / ₹0)',
    isFree: true,
    timeNeeded: '1–3 months',
    recognition: 'Foundational / Beginner',
    officialUrl: 'https://www.coursera.org/',
    lastVerified: '2026-11-06',
    description: 'Access complete video lectures, quizzes, and course materials for free using the "Audit" option. Verified certificates require paid subscription.',
    keyTopics: ['Algorithms & Data Structures', 'Software Design Patterns', 'Distributed Systems']
  }
];

export const roadmaps = [
  {
    name: 'ASP.NET Core Developer Roadmap',
    url: 'https://roadmap.sh/aspnet-core',
    description: 'The community standard visual roadmap outlining essential frameworks, ORMs, security tools, and deployment pipelines for modern ASP.NET Core.'
  },
  {
    name: 'C# Language Roadmap',
    url: 'https://roadmap.sh/r/csharp-beginner',
    description: 'Structured step-by-step path detailing language features from syntax to advanced memory constructs like Span and Channels.'
  }
];
