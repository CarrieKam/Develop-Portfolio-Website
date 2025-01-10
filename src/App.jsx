import { PortfolioProvider } from './context/PortfolioContext';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import About from './components/About';
import Loading from './components/Loading';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { usePortfolio } from './context/PortfolioContext';
import WorkTimeline from './components/WorkTimeline';

const AppContent = () => {
  const { isLoading } = usePortfolio();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen bg-white text-gray-900 dark:text-white dark:bg-[#090B10]`}>
      <div className="bg-white dark:bg-[#090B10] w-full">
        <div className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-[#090B10] z-20">
          <div className="fixed top-4 left-4 flex space-x-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>
          <Navigation />
        </div>
      </div>
      <main className="relative max-w-4xl mx-auto">
          <Profile />
        <div className="min-h-full">
          <About />
        </div>
        <div className="min-h-full">
          <WorkTimeline />
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
};

export default App;