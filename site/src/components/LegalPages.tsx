import React from 'react';
import { Shield, FileText, Mail, ExternalLink, AlertTriangle } from 'lucide-react';
import { Card } from './ui/Card';
import { siteConfig } from '../config/site';

export interface LegalProps {
  page: 'privacy' | 'terms' | 'cookies' | 'contact';
}

export const LegalPages: React.FC<LegalProps> = ({ page }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Legal Counsel Notice Callout */}
      <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <p>
          <strong>Notice:</strong> This document is drafted in plain English to reflect the privacy-first, zero-tracking design of Karmatix .NET Academy. Please review with formal legal counsel before enterprise commercial launch.
        </p>
      </div>

      {page === 'privacy' && (
        <article className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>India DPDP Act 2023 Compliant</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500">Last updated: November 6, 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Our Zero-Tracking Philosophy
            </h2>
            <p>
              Karmatix .NET Academy (<a href={siteConfig.publisherUrl} className="underline text-violet-600">{siteConfig.publisherUrl}</a>) believes your educational journey is private. <strong>We do not run third-party tracking scripts, advertising beacons, fingerprinting algorithms, or analytics trackers (such as Google Analytics or Meta Pixel).</strong>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Data Stored Exclusively on Your Device
            </h2>
            <p>
              All course progress—including completed lesson checkboxes, mini-quiz scores, timed mock exam scores, personal notes, bookmarks, and your name on completion certificates—is stored strictly within your browser's local storage (under the key prefix <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">karmatix-dotnet:v1:</code>).
            </p>
            <p>
              This data never touches our servers. You have complete sovereignty to export your progress as a JSON file or erase it entirely at any time using the "Reset All" button in your dashboard.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Compliance with India's Digital Personal Data Protection (DPDP) Act 2023
            </h2>
            <p>
              In strict adherence to the DPDP Act 2023 principles:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Notice & Transparency:</strong> No personal identification data (PII) is harvested.</li>
              <li><strong>Purpose Limitation:</strong> The website functions solely as an educational static portal.</li>
              <li><strong>Data Minimization:</strong> Zero cookies and zero server databases exist on the platform.</li>
              <li><strong>User Control:</strong> You may wipe your local storage at will via your browser settings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. External Outbound Links
            </h2>
            <p>
              Our lessons link to official resources (such as Microsoft Learn, GitHub, and NuGet). When you click an external link, you are subject to the privacy terms of that third-party platform. All outbound links open with <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">rel="noopener noreferrer"</code> to protect your browsing session.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Contacting the Data Protection Representative
            </h2>
            <p>
              For privacy queries or questions regarding data protection, email: <a href={`mailto:${siteConfig.contactEmail}`} className="underline text-violet-600">{siteConfig.contactEmail}</a> or submit a message at <a href={siteConfig.contactUrl} target="_blank" rel="noopener noreferrer" className="underline text-violet-600">{siteConfig.contactUrl}</a>.
            </p>
          </section>
        </article>
      )}

      {page === 'terms' && (
        <article className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Standard Terms</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Terms of Use
            </h1>
            <p className="text-xs text-slate-500">Effective: November 6, 2026</p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Karmatix .NET Academy ("the Service"), you agree to abide by these Terms of Use and all applicable laws and regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Intellectual Property & Licensing
            </h2>
            <p>
              <strong>Educational Content:</strong> All textual lessons, custom illustrations, curriculum structures, exam questions, and cheat sheets are proprietary property of Karmatix (© 2026 Karmatix. All rights reserved). You may not scrape, republish, or commercialize the course text without express written permission.
            </p>
            <p>
              <strong>Code Samples:</strong> All compilable project code in the <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">/samples</code> directory is distributed under the permissive <strong>MIT License</strong>. You are free to adapt, modify, and incorporate sample code into commercial enterprise applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Trademark Acknowledgement
            </h2>
            <p className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 font-medium">
              {siteConfig.trademarkDisclaimer}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Disclaimer of Warranties & Certification Notice
            </h2>
            <p>
              The materials on this site are provided for educational purposes "as is". While every code sample is verified against .NET 10 LTS with strict compiler warnings, Karmatix makes no warranties regarding uninterrupted execution or specific employment outcomes.
            </p>
            <p>
              Certificates of completion generated by this portal represent self-paced curriculum achievement and do not constitute accredited degrees or formal Microsoft certifications.
            </p>
          </section>
        </article>
      )}

      {page === 'contact' && (
        <article className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Contact & Educational Support
            </h1>
            <p className="text-xs text-slate-500">We welcome feedback, corrections, and enterprise partnerships.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
                <Mail className="w-5 h-5 text-violet-600" />
                <span>General & Technical Inquiries</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Reach out to our curriculum engineering team with questions, suggestions, or errata.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-mono text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline block"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </Card>

            <Card className="p-6 space-y-3">
              <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-white">
                <ExternalLink className="w-5 h-5 text-violet-600" />
                <span>Karmatix Headquarters</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Visit the official corporate portal of Karmatix:
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.publisherUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>https://karmatix.in</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          </div>

          <Card className="p-6 space-y-3 bg-slate-50 dark:bg-slate-900/60">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Found a bug or code defect?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Karmatix .NET Academy has a zero-defect policy. If you spot a typographical error, outdated NuGet version, or a failing code sample, please open an issue directly in our GitHub repository:
            </p>
            <div className="pt-1">
              <a
                href={`${siteConfig.repoUrl}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Open an Issue on GitHub &rarr;</span>
              </a>
            </div>
          </Card>
        </article>
      )}
    </div>
  );
};

