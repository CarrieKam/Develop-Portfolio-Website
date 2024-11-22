// src/App.tsx
import { PortfolioProvider } from './context/PortfolioContext';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import About from './components/About';
import Loading from './components/Loading';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import { usePortfolio } from './context/PortfolioContext';

const AppContent = () => {
  const { isLoading, theme } = usePortfolio();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="fixed top-4 left-4 flex space-x-4">
        <ThemeToggle />
        <LanguageSelector />
      </div>
      <Navigation />
      <main className="max-w-4xl mx-auto">
        <Profile />
        <About />
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