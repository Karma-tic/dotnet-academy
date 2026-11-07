# Capstone 2: Student Management REST API

## Overview
A production-ready RESTful Web API built on ASP.NET Core (.NET 10 LTS) and Entity Framework Core with SQLite. Implements clean data transfer objects (DTOs), input validation, asynchronous query projections, and bulk deletions.

## Features
- Minimal API route mapping with route parameter constraints
- EF Core code-first SQLite persistence with \`AsNoTracking()\`
- RFC standard status codes (200, 201 Created, 204 NoContent, 404 NotFound, 409 Conflict)
- Automated database creation on startup

## Running Locally
```bash
dotnet run --project samples/Capstones/Capstone2_StudentApi
```

