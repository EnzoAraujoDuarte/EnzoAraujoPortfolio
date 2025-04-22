import Layout from '../components/layout/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../locales/translations';
import Head from 'next/head';

/**
 * Homepage component displaying introduction and profile image
 * @returns {JSX.Element} Homepage with hero section
 */
export default function Home() {
  const { language } = useLanguage();
  
  // Determine which CV file to download based on current language
  const cvFile = language === 'en-US' 
    ? '/Images/Curriculo EN-US.pdf'
    : '/Images/Curriculo PT-BR.pdf';

  // Animation settings for content elements
  const fadeInAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  // Animation settings for image with slight delay
  const imageAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, delay: 0.2 }
  };

  return (
    <Layout>
      <Head>
        <title>Enzo Araujo Duarte | {t('nav.home', language)}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      
      {/* Hero Section - Main landing area */}
      <section className="container py-16 md:py-24 min-h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 tablet:grid-cols-12 gap-8 items-center">
          {/* Left column - Text content */}
          <motion.div
            {...fadeInAnimation}
            className="tablet:col-span-6 flex flex-col"
          >
            <div className="mb-2 text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              {t('home.greeting', language)}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-primary" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {t('home.title', language)}
            </h1>
            <p className="mt-6 text-xl text-gray-700 dark:text-gray-300">
              {t('home.subtitle', language)}
            </p>
            
            {/* Call to action buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/about" className="btn btn-primary flex items-center !rounded-2xl overflow-hidden">
                {t('home.cta.about', language)} <FiArrowRight className="ml-2" />
              </Link>
              <a 
                href={cvFile} 
                className="btn bg-white dark:bg-dark-secondary text-gray-900 dark:text-white border border-gray-200 dark:border-dark-lighter hover:bg-gray-50 dark:hover:bg-dark-lighter flex items-center shadow-md hover:shadow-lg !rounded-2xl overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <FiDownload className="mr-2" /> {t('home.cta.cv', language)}
              </a>
            </div>
          </motion.div>
          
          {/* Right column - Illustration */}
          <motion.div
            {...imageAnimation}
            className="hidden tablet:flex tablet:col-span-6 justify-center items-center"
          >
            <img
              src="/Images/CodeTyping.svg"
              alt="Developer coding illustration"
              className="w-full max-w-md h-auto"
            />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
} 