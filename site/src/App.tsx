import { useState, useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { CurriculumOverview } from './components/CurriculumOverview';
import { useProgress } from './hooks/useProgress';
import { allLessons, modulesData, searchIndex } from './content/lessons/allLessons';
import confetti from 'canvas-confetti';



// Lazy loaded views for instant initial paint & top Lighthouse scores
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));
const StudyPlanner = lazy(() => import('./components/StudyPlanner').then(m => ({ default: m.StudyPlanner })));
const CareerHub = lazy(() => import('./components/CareerHub').then(m => ({ default: m.CareerHub })));
const CertificationsGuide = lazy(() => import('./components/CertificationsGuide').then(m => ({ default: m.CertificationsGuide })));
const ResourceLibrary = lazy(() => import('./components/ResourceLibrary').then(m => ({ default: m.ResourceLibrary })));
const CheatSheets = lazy(() => import('./components/CheatSheets').then(m => ({ default: m.CheatSheets })));
const GlossaryView = lazy(() => import('./components/GlossaryView').then(m => ({ default: m.GlossaryView })));
const LegalPages = lazy(() => import('./components/LegalPages').then(m => ({ default: m.LegalPages })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const CertificateModal = lazy(() => import('./components/CertificateModal').then(m => ({ default: m.CertificateModal })));

// Learning Support Addendum Views
const HowToLearnView = lazy(() => import('./components/HowToLearnView').then(m => ({ default: m.HowToLearnView })));
const LearningPathsView = lazy(() => import('./components/LearningPathsView').then(m => ({ default: m.LearningPathsView })));
const StuckHelpView = lazy(() => import('./components/StuckHelpView').then(m => ({ default: m.StuckHelpView })));
const RegionalResourcesView = lazy(() => import('./components/RegionalResourcesView').then(m => ({ default: m.RegionalResourcesView })));
const FreeTiersView = lazy(() => import('./components/FreeTiersView').then(m => ({ default: m.FreeTiersView })));
const DailyPracticeView = lazy(() => import('./components/DailyPracticeView').then(m => ({ default: m.DailyPracticeView })));

export function App() {
  const {
    state,
    isCompleted,
    toggleComplete,
    recordQuizScore,
    toggleBookmark,
    isBookmarked,
    saveNote,
    setLastVisited,
    setLearnerName,
    saveMockTestScore,
    updatePlanner,
    recordProblemSolved,
    exportProgress,
    importProgress,
    resetProgress,
  } = useProgress();

  // Navigation State: default to curriculum unless hash specifies otherwise
  const getInitialView = () => {
    if (typeof window === 'undefined') return 'curriculum';
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('lesson/')) return 'lesson';
    if (hash === '' || hash === 'curriculum' || hash === 'home' || hash === 'portal') return 'curriculum';
    return hash;
  };

  const [activeView, setActiveView] = useState<string>(getInitialView);
  const [currentLessonSlug, setCurrentLessonSlug] = useState<string>(allLessons[0]?.slug || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 1024 : true));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('lesson/')) {
        const slug = hash.replace('lesson/', '');
        const exists = allLessons.find((l) => l.slug === slug);
        if (exists) {
          setCurrentLessonSlug(slug);
          setActiveView('lesson');
          setLastVisited(slug);
        }
      } else if (hash === '' || hash === 'curriculum' || hash === 'home' || hash === 'portal') {
        setActiveView('curriculum');
      } else if (hash) {
        setActiveView(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setLastVisited]);

  // Global Keyboard Shortcuts (Ctrl+K / Cmd+K for Search, Ctrl+B / Cmd+B for Sidebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (view: string) => {
    setActiveView(view);
    if (view === 'portal') {
      window.location.hash = '#/portal';
    } else {
      window.location.hash = `#/${view}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (slug: string) => {
    setCurrentLessonSlug(slug);
    setActiveView('lesson');
    setLastVisited(slug);
    window.location.hash = `#/lesson/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSelect = (url: string) => {
    if (url.startsWith('lesson:')) {
      handleSelectLesson(url.replace('lesson:', ''));
    } else {
      navigateTo(url);
    }
  };

  const handleQuizCompletion = (score: number) => {
    recordQuizScore(currentLessonSlug, score);
    if (score >= 70) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const currentLesson = allLessons.find((l) => l.slug === currentLessonSlug) || allLessons[0];
  const currentIndex = allLessons.findIndex((l) => l.slug === currentLesson.slug);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : undefined;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : undefined;

  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((state.completedLessons.length / totalLessons) * 100) : 0;



  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
        activeTab={activeView}
        onNavigate={navigateTo}
        progressPercent={progressPercent}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Collapsible Left Sidebar (shown only when in lesson view) */}
        {activeView === 'lesson' && (
          <Sidebar
            modules={modulesData}
            currentSlug={currentLesson.slug}
            onSelectLesson={handleSelectLesson}
            onNavigate={navigateTo}
            completedLessons={state.completedLessons}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}

        {/* View Router Body & Responsive Footer Container */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
            activeView === 'lesson' && isSidebarOpen ? 'lg:pl-80' : 'pl-0'
          }`}
        >
          <main className="flex-1 min-w-0">
            <Suspense fallback={<div className="p-16 text-center text-sm text-slate-400">Loading learning module...</div>}>
              {activeView === 'home' || activeView === 'curriculum' || activeView === 'dotnet' ? (
                <CurriculumOverview
                  modules={modulesData}
                  completedLessons={state.completedLessons}
                  onSelectLesson={handleSelectLesson}
                  onNavigate={navigateTo}
                />
              ) : activeView === 'lesson' ? (
                <LessonView
                  lesson={currentLesson}
                  isCompleted={isCompleted(currentLesson.slug)}
                  isBookmarked={isBookmarked(currentLesson.slug)}
                  savedNote={state.notes[currentLesson.slug] || ''}
                  onToggleComplete={() => toggleComplete(currentLesson.slug)}
                  onToggleBookmark={() => toggleBookmark(currentLesson.slug)}
                  onSaveNote={(note) => saveNote(currentLesson.slug, note)}
                  onQuizComplete={handleQuizCompletion}
                  prevLesson={prevLesson ? { slug: prevLesson.slug, title: prevLesson.title } : undefined}
                  nextLesson={nextLesson ? { slug: nextLesson.slug, title: nextLesson.title } : undefined}
                  onNavigate={(dest) => {
                    if (dest === 'curriculum') navigateTo('curriculum');
                    else handleSelectLesson(dest);
                  }}
                />
              ) : activeView === 'dashboard' ? (
                <Dashboard
                  modules={modulesData}
                  completedLessons={state.completedLessons}
                  lastVisitedSlug={state.lastVisitedLesson}
                  bookmarks={state.bookmarks}
                  notes={state.notes}
                  quizScores={state.quizScores}
                  onSelectLesson={handleSelectLesson}
                  onOpenCertificate={() => setIsCertModalOpen(true)}
                  onExport={() => {
                    const data = exportProgress();
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `karmatix-dotnet-progress-${new Date().toISOString().slice(0, 10)}.json`;
                    a.click();
                  }}
                  onImport={importProgress}
                  onReset={resetProgress}
                />
              ) : activeView === 'planner' ? (
                <StudyPlanner
                  completedCount={state.completedLessons.length}
                  totalLessons={totalLessons}
                  plannerState={state.planner}
                  onUpdatePlanner={updatePlanner}
                  onNavigateToLesson={handleSelectLesson}
                />
              ) : activeView === 'career' ? (
                <CareerHub
                  onSaveMockScore={saveMockTestScore}
                  mockScores={state.mockTestScores}
                />
              ) : activeView === 'certifications' ? (
                <CertificationsGuide />
              ) : activeView === 'resources' ? (
                <ResourceLibrary />
              ) : activeView === 'cheatsheets' ? (
                <CheatSheets />
              ) : activeView === 'how-to-learn' ? (
                <HowToLearnView onNavigateToCurriculum={() => navigateTo('curriculum')} />
              ) : activeView === 'learning-paths' ? (
                <LearningPathsView
                  modules={modulesData}
                  completedLessons={state.completedLessons}
                  onSelectLesson={handleSelectLesson}
                  onNavigateToCurriculum={() => navigateTo('curriculum')}
                />
              ) : activeView === 'get-help' ? (
                <StuckHelpView />
              ) : activeView === 'regional-resources' ? (
                <RegionalResourcesView />
              ) : activeView === 'free-tiers' ? (
                <FreeTiersView />
              ) : activeView === 'daily-practice' ? (
                <DailyPracticeView
                  streakData={state.dailyPractice}
                  onRecordProblemSolved={recordProblemSolved}
                />
              ) : activeView === 'glossary' ? (
                <GlossaryView />
              ) : activeView === 'privacy' || activeView === 'terms' || activeView === 'contact' ? (
                <LegalPages page={activeView as any} />
              ) : (
                /* 404 Not Found fallback */
                <div className="py-20 text-center space-y-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h2>
                  <p className="text-slate-500">The requested page or lesson could not be located.</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => navigateTo('portal')}
                      className="px-4 py-2 bg-[#f59e0b] hover:bg-[#fbbf24] text-black rounded-lg text-sm font-semibold transition-colors shadow-sm"
                    >
                      Return to Learning Portal
                    </button>
                    <button
                      onClick={() => navigateTo('curriculum')}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
                    >
                      Return to Curriculum
                    </button>
                  </div>
                </div>
              )}
            </Suspense>
          </main>

          {/* Footer - seamlessly positioned alongside or full-width without sidebar clipping */}
          <Footer onNavigate={navigateTo} />
        </div>
      </div>

      {/* Global Search Modal - Lazy rendered */}
      {isSearchOpen && (
        <Suspense fallback={null}>
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            items={searchIndex}
            onSelect={handleSearchSelect}
          />
        </Suspense>
      )}

      {/* Course Completion Certificate Modal - Lazy rendered */}
      {isCertModalOpen && (
        <Suspense fallback={null}>
          <CertificateModal
            isOpen={isCertModalOpen}
            onClose={() => setIsCertModalOpen(false)}
            defaultLearnerName={state.learnerName}
            onSaveName={setLearnerName}
          />
        </Suspense>
      )}
    </div>
  );
}
