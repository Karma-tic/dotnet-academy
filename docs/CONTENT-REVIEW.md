# Content Review Checklist

Before marking any lesson `reviewStatus: "reviewed"` in its frontmatter, complete each step in this checklist:

- [ ] **Technical Accuracy**: All statements align with the official .NET 10 / C# 14 specifications.
- [ ] **Tested Code**: Every code snippet corresponds directly to a project under `/samples` that builds with `dotnet build -warnaserror` and passes all unit tests.
- [ ] **No Deprecated APIs**: No obsolete packages or superseded APIs (e.g., legacy `BinaryFormatter`, outdated `WebClient`, or unrecommended patterns).
- [ ] **Simple English & Tone**: Clear explanations, short paragraphs, relatable real-world analogies, and friendly tone suitable for beginners.
- [ ] **Pedagogical Structure**:
  1. Goal
  2. Simple Explanation
  3. Real-world Analogy
  4. Code Example (with copy button)
  5. Step-by-Step Walkthrough
  6. Common Mistakes & Fixes
  7. Practice Task
  8. Mini Quiz (with immediate feedback)
- [ ] **Enterprise & Interview Context**: Includes "Interview Alert" and "Enterprise Practice" callouts where relevant.
- [ ] **Accessibility & Design**: Code blocks have syntax highlighting; alt text on all figures; WCAG 2.1 AA compliant colors; mobile responsive.
- [ ] **Originality & Attribution**: 100% original prose. No plagiarized paragraphs. External links open with `rel="noopener noreferrer"`.
- [ ] **Frontmatter Complete**:
  - `title`
  - `module`
  - `order`
  - `duration` (in minutes)
  - `difficulty` (Beginner / Intermediate / Advanced)
  - `prerequisites`
  - `dotnetVersion` ("10.0")
  - `lastVerified` (YYYY-MM-DD)
  - `reviewStatus` ("reviewed" or "draft")
- [ ] **Reviewer Sign-off**: Signed off by a designated Karmatix technical reviewer.
