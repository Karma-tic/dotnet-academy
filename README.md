# Karmatix .NET Academy

> **"Learn .NET the clear way."**  
> A commercial-grade educational platform engineered by [Karmatix](https://karmatix.in) for aspiring developers and enterprise e
> ngineers.

[![CI Quality Gate](https://github.com/Karma-tic/dotnet-academy/actions/workflows/ci.yml/badge.svg)](https://github.com/Karma-tic/dotnet-academy/actions/workflows/ci.yml)
[![Verified on .NET 10 LTS](https://img.shields.io/badge/.NET-10.0%20LTS-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![C# 14](https://img.shields.io/badge/C%23-14.0-239120?logo=csharp)](https://learn.microsoft.com/dotnet/csharp/)
[![License: MIT](https://img.shields.io/badge/License-MIT%20(Code)-blue.svg)](LICENSE)
[![Zero Trackers](https://img.shields.io/badge/Privacy-Zero%20Trackers%20(DPDP%20Act)-success)](https://learn.karmatix.in/#/privacy)

---

## 🎯 Educational Mission & Quality Standards
Karmatix .NET Academy was engineered with a strict **zero-defect standard**:
- **Compilable Samples First**: Every code snippet in every lesson corresponds directly to a compilable project under `/samples` built with `dotnet build -warnaserror`.
- **Zero Hallucination / Verified Only**: Verified against official Microsoft .NET 10 LTS specifications.
- **Client-Side Sovereignty**: 100% static architecture. Zero third-party trackers. All progress, quiz scores, bookmarks, notes, and certificates live exclusively in the learner's browser storage (DPDP Act compliant).

---

## 🏗️ Architecture & Tech Stack

| Component | Technology | Rationale |
| --- | --- | --- |
| **Curriculum Target** | .NET 10 (Active LTS) & C# 14 | 3-year enterprise support window (Nov 2025 – Nov 2028). |
| **Sample Projects** | .NET 10 Solution (`/samples`) | 16 projects compiling with `TreatWarningsAsErrors=true`. |
| **Web Platform** | React 19 + TypeScript + Tailwind CSS | Rich client-side interactivity (quizzes, timed mock exams, browser PDF certificates) with 100% static hosting on GitHub Pages. |
| **Search Engine** | In-Memory Client-side Index | Instant Ctrl+K search across lessons, glossary, interview Q&A, and cheat sheets. |
| **CI/CD** | GitHub Actions (`ci.yml`, `deploy.yml`) | Multi-job quality pipeline gating deployment on build, test, and type-check passes. |

---

## 🚀 Local Development Quickstart

### 1. Prerequisites
- **.NET 10 SDK** (v10.0.400 or newer): [Download official SDK](https://dotnet.microsoft.com/download)
- **Node.js 24+** & npm: [Download Node.js](https://nodejs.org/)

### 2. Building & Testing Sample C# Code
```bash
# Clone the repository
git clone https://github.com/Karma-tic/dotnet-academy.git
cd dotnet-academy

# Restore and build all sample projects with strict warnings as errors
cd samples
dotnet restore
dotnet build -warnaserror

# Run all unit tests
dotnet test
```

### 3. Running the Web Platform
```bash
cd ../site
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Curriculum Structure (Modules 0 to 11)

- **Module 0: Start Here**: .NET architecture, CLR, BCL, SDK setup, CLI commands, debugging, and Git.
- **Module 1: C# Fundamentals**: Variables, types, nullable reference types, switch expressions, collections, and exceptions.
- **Module 2: Object-Oriented C#**: Encapsulation, inheritance, polymorphism, interfaces, SOLID, and design patterns.
- **Module 3: Intermediate C#**: LINQ deferred execution, System.Text.Json, async/await state machines, and Span<T>.
- **Module 4: Databases & Data Access**: SQL fundamentals, ADO.NET internals, EF Core DbContext, migrations, and Dapper.
- **Module 5: ASP.NET Core Web**: Request pipeline, middleware, DI lifetimes, Minimal APIs, DTOs, and validation.
- **Module 6: Security**: Authentication vs authorization, PBKDF2 password hashing, JWT bearer tokens, and OWASP Top 10.
- **Module 7: Architecture & Quality**: Clean Architecture, testing with xUnit and WebApplicationFactory, and Serilog.
- **Module 8: DevOps & Cloud**: Docker multi-stage builds, non-root user execution, GitHub Actions, and Azure deployment.
- **Module 9: Desktop & Mobile**: .NET MAUI, WPF, and WinForms objective trade-offs.
- **Module 10: Career Hub**: 200+ interview Q&A, 50+ coding problems, 6 timed mock exams, resume & salary negotiation guides.
- **Module 11: Capstone Projects**:
  1. *Bank & Inventory Console Application*
  2. *Student Management REST API with EF Core & SQLite*
  3. *Task Manager Web App with Identity*
  4. *E-Commerce REST API (Catalog, Cart, Orders, Pagination)*
  5. *Real-time Chat with SignalR*
  6. *Background-job & Reporting Worker with Channels*
  7. *Dockerized Observable Production API on Azure*

---

## 🔄 How to Add a New Lesson
1. Create a compilable sample under `/samples` proving the lesson code works.
2. Ensure `dotnet build -warnaserror` passes in `/samples`.
3. Add the lesson definition to the corresponding module file in `/site/src/content/lessons/moduleXX.ts`.
4. Follow the Content Review Checklist in `/docs/CONTENT-REVIEW.md` before marking `reviewStatus: "reviewed"`.

---

## ⚙️ How to Update Versions
All target versions are managed in a single canonical configuration file:
- File: `/content/versions.json` (mirrored to `/site/src/content/versions.json`)
- Update `sdkVersion`, `targetLts`, `csharpLanguageVersion`, and package version mappings.
- Re-run `dotnet build -warnaserror` and `npm run build` to verify.

---


---

## 📄 License & Legal Notice
- **Educational Text & Documentation**: Copyright &copy; 2026 Karmatix. All rights reserved.
- **Code Samples (`/samples`)**: Permissive [MIT License](LICENSE).
- **Trademark Notice**: *.NET, C#, ASP.NET, Azure, Visual Studio and related names are trademarks of Microsoft Corporation. Karmatix .NET Academy is an independent educational resource and is not affiliated with or endorsed by Microsoft.*
