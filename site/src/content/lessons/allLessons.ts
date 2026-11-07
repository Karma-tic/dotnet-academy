import { LessonContent } from '../../components/LessonView';
import { ModuleMeta } from '../../components/Sidebar';
import { SearchItem } from '../../components/SearchModal';
import { module00Lessons } from './module00';
import { module01Lessons } from './module01';
import { module02Lessons } from './module02';
import { module03Lessons } from './module03';
import { module04Lessons } from './module04';
import { module05Lessons } from './module05';
import { module06Lessons } from './module06';
import { module07Lessons } from './module07';
import { module08Lessons } from './module08';
import { module09Lessons } from './module09';
import { module10Lessons } from './module10';
import { module11Lessons } from './module11';
import { glossaryData } from '../glossary/glossaryData';
import { interviewQuestions } from '../career/interviewQuestions';
import { cheatSheetsData } from '../cheatsheets/cheatsheetsData';

export const allLessons: LessonContent[] = [
  ...module00Lessons,
  ...module01Lessons,
  ...module02Lessons,
  ...module03Lessons,
  ...module04Lessons,
  ...module05Lessons,
  ...module06Lessons,
  ...module07Lessons,
  ...module08Lessons,
  ...module09Lessons,
  ...module10Lessons,
  ...module11Lessons,
];

export const modulesData: ModuleMeta[] = [
  {
    id: 0,
    title: 'Start Here',
    description: '.NET architecture, CLR, BCL, SDK setup, and CLI essentials.',
    lessons: module00Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 1,
    title: 'C# Fundamentals',
    description: 'Variables, types, nullable reference types, pattern matching, and collections.',
    lessons: module01Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 2,
    title: 'Object-Oriented C#',
    description: 'Classes, encapsulation, interfaces, polymorphism, and SOLID principles.',
    lessons: module02Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 3,
    title: 'Intermediate C#',
    description: 'LINQ query mechanics, async/await concurrency, and memory management.',
    lessons: module03Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 4,
    title: 'Databases & Data Access',
    description: 'SQL fundamentals, ADO.NET internals, and Entity Framework Core 10.',
    lessons: module04Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 5,
    title: 'ASP.NET Core Web',
    description: 'Middleware pipeline, dependency injection, and Minimal APIs.',
    lessons: module05Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 6,
    title: 'Security',
    description: 'Authentication, authorization, and JWT bearer tokens.',
    lessons: module06Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 7,
    title: 'Architecture & Testing',
    description: 'Clean Architecture, automated testing with xUnit, and observability.',
    lessons: module07Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 8,
    title: 'DevOps & Cloud',
    description: 'Docker multi-stage builds, GitHub Actions CI/CD, and Azure deployment.',
    lessons: module08Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 9,
    title: 'Desktop & Mobile',
    description: '.NET MAUI, WPF, and WinForms enterprise trade-offs.',
    lessons: module09Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 10,
    title: 'Career Hub Strategy',
    description: 'Technical interview strategy, live coding, and portfolio development.',
    lessons: module10Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
  {
    id: 11,
    title: 'Capstone Projects',
    description: 'Real-world production applications with tested code.',
    lessons: module11Lessons.map((l) => ({
      slug: l.slug,
      title: l.title,
      module: l.module,
      duration: l.duration,
      reviewStatus: l.reviewStatus,
    })),
  },
];

// Unified global search items across lessons, glossary, interview Q&A, and cheat sheets
export const searchIndex: SearchItem[] = [
  ...allLessons.map((l) => ({
    id: `lesson-${l.slug}`,
    title: l.title,
    category: 'lesson' as const,
    snippet: `${l.summary} (Module ${l.module})`,
    url: `lesson:${l.slug}`,
  })),
  ...glossaryData.map((g) => ({
    id: `glossary-${g.term}`,
    title: g.term,
    category: 'glossary' as const,
    snippet: g.definition,
    url: 'glossary',
  })),
  ...interviewQuestions.map((q) => ({
    id: `qa-${q.id}`,
    title: q.question,
    category: 'interview' as const,
    snippet: `${q.category} (${q.level}) - ${q.keyTakeaway}`,
    url: 'career',
  })),
  ...cheatSheetsData.map((c) => ({
    id: `cs-${c.id}`,
    title: c.title,
    category: 'cheatsheet' as const,
    snippet: `${c.category} Quick Reference Cheat Sheet`,
    url: 'cheatsheets',
  })),
];

