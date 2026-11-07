import { LessonContent } from '../../components/LessonView';

export const module06Lessons: LessonContent[] = [
  {
    slug: 'authentication-authorization-and-jwt',
    title: 'Authentication, Authorization, and JWT Bearer Tokens',
    module: 6,
    moduleTitle: 'Security',
    order: 1,
    duration: 20,
    difficulty: 'Intermediate',
    prerequisites: ['minimal-apis-validation-and-errors'],
    dotnetVersion: '10.0',
    csharpVersion: '14.0',
    lastVerified: '2026-11-06',
    reviewStatus: 'reviewed',
    summary: 'Master enterprise security in ASP.NET Core: Authentication vs Authorization, password hashing with PBKDF2/Argon2, issuing cryptographically signed JWT tokens, and claims-based policy checks.',
    goal: 'Implement end-to-end token-based security and protect endpoints using RequireAuthorization policies.',
    explanation: `
### Authentication vs Authorization
- **Authentication (AuthN)**: Answers **"Who are you?"**. Validates user credentials (passwords, JWT tokens, cookies) and constructs a \`ClaimsPrincipal\`.
- **Authorization (AuthZ)**: Answers **"What are you allowed to do?"**. Evaluates claims, roles, or policies to permit or deny access to specific endpoints (\`[Authorize(Roles = "Admin")]\`).

### Safe Password Hashing
Never hash passwords with plain MD5 or SHA-256! Fast hashes can be cracked in seconds using modern GPUs and precomputed rainbow tables.
- **Rule**: Always use an adaptive, salted algorithm like **PBKDF2**, **Argon2**, or **BCrypt** with at least 100,000 iterations and a unique cryptographic salt per user.

### JSON Web Tokens (JWT)
A JWT consists of 3 parts separated by dots:
1. **Header**: Token type and cryptographic signing algorithm (HMAC-SHA256).
2. **Payload (Claims)**: Claims asserting user identity (Subject Id, Email, Role, Expiration).
3. **Signature**: Cryptographic signature calculated using the server's private secret key.
    `,
    analogy: {
      realWorldScenario: 'Airport identification and boarding gates.',
      techMapping: 'Showing your government passport at security is Authentication (proves who you are). Showing your boarding pass at the gate is Authorization (proves you are allowed to board Flight KX-101 into Seat 4B).'
    },
    codeSnippet: {
      code: `using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public static class TokenService
{
    public static string CreateAccessToken(string userId, string role, string secretKey)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: "https://learn.karmatix.in",
            audience: "https://learn.karmatix.in/api",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15), // Short 15-minute lifetime
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// In Program.cs:
app.MapGet("/api/admin/dashboard", () => Results.Ok("Secret Admin Data"))
   .RequireAuthorization(policy => policy.RequireRole("Admin"));
`,
      language: 'csharp',
      filename: 'JwtSecurityDemo.cs',
      samplePath: 'Module06_Security/SecurityAndJwtDemo'
    },
    walkthrough: [
      { step: 'Claims Construction', detail: 'Claims hold identity attributes (Sub, Role, Jti) encoded in the JWT payload.' },
      { step: 'Cryptographic Signature', detail: 'HmacSha256 signs the token with a 256-bit symmetric server key.' },
      { step: 'Short Expiration', detail: 'Tokens expire in 15 minutes to reduce theft exposure.' },
      { step: 'RequireAuthorization', detail: 'Applies authorization policy metadata, blocking requests that lack valid Admin claims.' }
    ],
    commonMistakes: [
      {
        mistake: 'Storing application secret keys or passwords inside appsettings.json committed to Git.',
        whyItFails: 'If the repository is public or cloned, credentials are leaked to anyone with repo access.',
        fix: 'Use .NET Secret Manager for local development and Azure Key Vault or Environment Variables in production.'
      }
    ],
    practiceTask: {
      title: 'Secure an Endpoint by Policy',
      task: 'Define an authorization policy "VerifiedStudent" that requires the claim "IsVerified" = "true", and protect an endpoint with this policy.',
      hints: ['Use builder.Services.AddAuthorizationBuilder()', 'Call .RequireAuthorization("VerifiedStudent")'],
      solutionCode: `builder.Services.AddAuthorizationBuilder()
    .AddPolicy("VerifiedStudent", p => p.RequireClaim("IsVerified", "true"));

app.MapGet("/api/certified-content", () => "Welcome verified student!")
   .RequireAuthorization("VerifiedStudent");`
    },
    quiz: [
      {
        question: 'Why should JWT access tokens have a short expiration duration (e.g. 15 minutes)?',
        options: ['Because browsers delete tokens every 15 minutes', 'Because JWTs are stateless; once issued, they cannot be revoked on the server until they expire', 'To reduce database disk space', 'To force frequent logins'],
        correctIndex: 1,
        explanation: 'Stateless tokens cannot be revoked instantly without distributed blacklists; short lifespans limit the window of risk if a token is intercepted.'
      }
    ]
  }
];

