using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Karmatix.Academy.Module06;

public static class PasswordHasher
{
    private const int SaltSize = 16; // 128-bit
    private const int KeySize = 32;  // 256-bit
    private const int Iterations = 100_000;
    private static readonly HashAlgorithmName Algorithm = HashAlgorithmName.SHA256;

    public static string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, KeySize);
        return $"{Convert.ToBase64String(salt)}:{Convert.ToBase64String(hash)}";
    }

    public static bool VerifyPassword(string password, string storedHash)
    {
        var parts = storedHash.Split(':');
        if (parts.Length != 2) return false;

        byte[] salt = Convert.FromBase64String(parts[0]);
        byte[] expectedHash = Convert.FromBase64String(parts[1]);

        byte[] actualHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, Algorithm, KeySize);
        return CryptographicOperations.FixedTimeEquals(actualHash, expectedHash);
    }
}

public static class JwtTokenGenerator
{
    public static string GenerateToken(string userId, string email, string role, string secretKey, string issuer, string audience)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, userId),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(15), // Short-lived access token
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public static class Program
{
    public static void Main()
    {
        Console.WriteLine("--- Module 6: Security & JWT Bearer Lab ---");

        // 1. Password Hashing with Salt & PBKDF2
        string rawPassword = "SuperSecurePassword123!";
        string passwordHash = PasswordHasher.HashPassword(rawPassword);
        bool isValid = PasswordHasher.VerifyPassword(rawPassword, passwordHash);
        bool isInvalid = PasswordHasher.VerifyPassword("WrongPassword", passwordHash);

        Console.WriteLine($"Password Hashed: {passwordHash.Substring(0, 24)}... (Salt + PBKDF2 SHA256)");
        Console.WriteLine($"Valid Password Match: {isValid}");
        Console.WriteLine($"Invalid Password Match: {isInvalid}");

        // 2. JWT Generation
        string secretKey = "A_VERY_SECRET_LONG_KEY_FOR_KARMATIX_ACADEMY_32BYTES";
        string token = JwtTokenGenerator.GenerateToken(
            userId: "usr_42",
            email: "student@karmatix.in",
            role: "Student",
            secretKey: secretKey,
            issuer: "https://learn.karmatix.in",
            audience: "https://learn.karmatix.in/api"
        );

        Console.WriteLine($"Generated JWT Bearer Token: {token.Substring(0, 35)}...");
        Console.WriteLine("Security mechanisms tested cleanly.");
    }
}
