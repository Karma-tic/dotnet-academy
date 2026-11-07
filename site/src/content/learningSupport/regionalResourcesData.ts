export interface RegionalResource {
  id: string;
  name: string;
  creatorOrOrg: string;
  language: 'Hindi' | 'Tamil' | 'Telugu' | 'Hindi / Bilingual' | 'Pan-Indian';
  cost: 'Free' | 'Free to Audit';
  platform: 'YouTube' | 'Web Documentation' | 'Community Group';
  url: string;
  description: string;
  topicsCovered: string[];
  lastVerified: string;
  recommendedAudience: string;
}

export const regionalResourcesData: RegionalResource[] = [
  {
    id: 'reg-01',
    name: 'C# Programming in Hindi (Complete Playlist)',
    creatorOrOrg: 'CodeWithHarry',
    language: 'Hindi',
    cost: 'Free',
    platform: 'YouTube',
    url: 'https://www.youtube.com/playlist?list=PLu0W_9lII9agC1O26F6v2cO8O4bYqZ8T1',
    description: 'Practical, high-energy introduction to C# language fundamentals taught in conversational Hindi. Covers variables, data types, conditional branching, methods, arrays, and core object-oriented programming concepts with Visual Studio setup.',
    topicsCovered: ['C# Fundamentals', 'OOP Basics', 'Visual Studio IDE', 'Data Types & Methods'],
    lastVerified: '2026-11-07',
    recommendedAudience: 'Absolute beginners and college students preferring clear Hindi analogies.'
  },
  {
    id: 'reg-02',
    name: 'C# and ASP.NET Core Master Series',
    creatorOrOrg: 'Kudvenkat (Pragim Technologies)',
    language: 'Hindi / Bilingual',
    cost: 'Free',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@kudvenkat',
    description: 'The legendary technical educator revered across India. Unmatched depth on C# language internals, interfaces, delegates, events, multithreading, dependency injection, and ASP.NET Core architectural foundations with zero fluff.',
    topicsCovered: ['C# Deep Dive', 'Delegates & Events', 'ASP.NET Core', 'Dependency Injection', 'Threading'],
    lastVerified: '2026-11-07',
    recommendedAudience: 'Engineers preparing for company placement interviews and enterprise roles.'
  },
  {
    id: 'reg-03',
    name: 'C# Full Course in Hindi',
    creatorOrOrg: 'Thapa Technical',
    language: 'Hindi',
    cost: 'Free',
    platform: 'YouTube',
    url: 'https://www.youtube.com/playlist?list=PLwGdqUZWnOp2Z3b6v4b2f4f8y1c9f4f4f',
    description: 'Comprehensive step-by-step Hindi course explaining modern C# programming from ground zero. Demonstrates writing clean syntax, methods, collections, and simple console applications.',
    topicsCovered: ['C# Syntax', 'Classes & Objects', 'Collections', 'Exception Handling'],
    lastVerified: '2026-11-07',
    recommendedAudience: 'Beginners looking for slow, deliberate pacing with keyboard demonstrations.'
  },
  {
    id: 'reg-04',
    name: 'C# and .NET Framework Tutorials in Hindi',
    creatorOrOrg: 'Geeky Shows',
    language: 'Hindi',
    cost: 'Free',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@GeekyShows1',
    description: 'Crisp, structured Hindi lectures breaking down programming concepts into digestible 10-minute videos: access modifiers, static vs instance members, inheritance, polymorphism, and arrays.',
    topicsCovered: ['Object-Oriented Programming', 'Access Modifiers', 'Constructors', 'Inheritance'],
    lastVerified: '2026-11-07',
    recommendedAudience: 'Polytechnic and BCA/MCA students seeking conceptual clarity for exams.'
  },
  {
    id: 'reg-05',
    name: 'Microsoft Learn Localized Documentation (Hindi)',
    creatorOrOrg: 'Microsoft Learn (India)',
    language: 'Hindi',
    cost: 'Free',
    platform: 'Web Documentation',
    url: 'https://learn.microsoft.com/hi-in/dotnet/',
    description: 'Official Microsoft Learn documentation for .NET, C#, and ASP.NET Core translated into Hindi, complete with localized code walkthroughs and architectural overviews.',
    topicsCovered: ['Official .NET Docs', 'Language Specification', 'API Reference in Hindi'],
    lastVerified: '2026-11-07',
    recommendedAudience: 'Engineers wanting official reference material with native language explanations.'
  },
  {
    id: 'reg-06',
    name: '.NET Community User Groups across India',
    creatorOrOrg: '.NET Foundation & Microsoft User Groups',
    language: 'Pan-Indian',
    cost: 'Free',
    platform: 'Community Group',
    url: 'https://dotnet.microsoft.com/en-us/platform/community',
    description: 'Active meetup chapters in Bengaluru, Pune, Hyderabad, Chennai, Mumbai, and Delhi-NCR holding free hybrid and in-person developer meetups, hackathons, and architecture webinars.',
    topicsCovered: ['Community Meetups', 'Enterprise Best Practices', 'Networking', 'Open Source'],
    lastVerified: '2026-11-07',
    recommendedAudience: 'Job seekers wanting to connect with local senior engineers and hiring managers.'
  }
];

