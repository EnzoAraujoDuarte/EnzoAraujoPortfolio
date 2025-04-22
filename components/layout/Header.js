import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';
import ThemeToggle from '../common/ThemeToggle';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../locales/translations';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Language text based on current language
  const languageText = language === 'pt-BR' ? 'EN-US' : 'PT-BR';
  
  // Memoize navigation items to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: t('nav.home', language), href: '/' },
    { name: t('nav.about', language), href: '/about' },
    { name: t('nav.contact', language), href: '/contact' },
  ], [language]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 dark:bg-dark dark:bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-primary">
          Enzo<span className="text-gray-900 dark:text-white">.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden tablet:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
            >
              {item.name}
            </Link>
          ))}
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
            aria-label={`Switch to ${languageText}`}
          >
            <FiGlobe className="mr-1" />
            <span>{languageText}</span>
          </button>
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Controls */}
        <div className="flex items-center space-x-3 tablet:hidden">
          <ThemeToggle />
          <button
            className="text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tablet:hidden bg-white dark:bg-dark-secondary shadow-lg"
          >
            <div className="container py-4 space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Toggle */}
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="flex items-center py-2 text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary-light"
                aria-label={`Switch to ${languageText}`}
              >
                <FiGlobe className="mr-1" />
                <span>{languageText}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 