# Karmatix Branding & Logo Guide

## Brand Assets Location
- **Text Wordmark Placeholder**: `/site/public/brand/wordmark.svg`
- **Icon / Logo Placeholder**: `/site/public/brand/logo.svg`
- **Favicon**: `/site/public/favicon.svg`

## How to Swap in the Real Karmatix Logo
1. Replace `/site/public/brand/logo.svg` with your vector SVG or high-resolution PNG file.
2. If using PNG, update the image paths in:
   - `/site/src/components/Header.tsx`
   - `/site/src/components/Footer.tsx`
   - `/site/index.html` (for `<link rel="icon">` and Open Graph `og:image`)
3. Recommended SVG dimensions:
   - Square icon / favicon: `64x64` or `128x128` viewBox.
   - Horizontal wordmark: `200x48` viewBox.

## Design Tokens & Palette
- **Primary / Brand Accent**: `#6366F1` (Indigo-500) / `#4F46E5` (Indigo-600)
- **Neutral Light Background**: `#F8FAFC` (Slate-50)
- **Neutral Light Surface**: `#FFFFFF` (White)
- **Neutral Light Text**: `#0F172A` (Slate-900)
- **Neutral Dark Background**: `#090D16` (Near-black)
- **Neutral Dark Surface**: `#111827` (Slate-900)
- **Neutral Dark Text**: `#F8FAFC` (Slate-50)
- **Borders**: 1px `#E2E8F0` (light) / `#1E293B` (dark)

## Mandatory Trademark Notice
In compliance with Microsoft brand guidelines:
> ".NET, C#, ASP.NET, Azure, Visual Studio and related names are trademarks of Microsoft Corporation. Karmatix .NET Academy is an independent educational resource and is not affiliated with or endorsed by Microsoft."

