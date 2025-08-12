import React from 'react';
import { Link } from 'react-scroll';
import { useTranslation } from '../hooks/useTranslation';
import TranslatableText from '../components/TranslatableText';
import styles from './Navbar.module.css';

const Navbar = ({ onLanguageClick, currentLanguage, onOpenAssistant }) => {
  const { getSupportedLanguages } = useTranslation();
  
  const navItems = [
    { to: 'home', label: 'Home' },
    { to: 'know-your-rights', label: 'Know Your Rights' },
    { to: 'legal-aid', label: 'Legal Aid' },
    { to: 'contact', label: 'Contact Us' }
  ];

  // Get the current language display name
  const languages = getSupportedLanguages();
  const currentLangObj = languages.find(lang => lang.code === currentLanguage);
  const currentLangDisplay = currentLangObj ? currentLangObj.native : currentLanguage.toUpperCase();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            <TranslatableText text="LegalAid India" />
          </h1>
        </div>

        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              activeClass={styles.active}
              className={styles.navLink}
            >
              <TranslatableText text={item.label} />
            </Link>
          ))}
          
          <button
            type="button"
            onClick={onOpenAssistant}
            className={styles.legalAssistantButton}
          >
            <TranslatableText text="Legal Assistant" />
          </button>
        </div>

        <div className={styles.rightSection}>
          <button 
            className={styles.languageButton}
            onClick={onLanguageClick}
          >
            <i className="fas fa-globe"></i>
            {currentLangDisplay}
            <i className="fas fa-chevron-down"></i>
          </button>
          
          <Link
            to="get-help"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className={styles.getHelpButton}
          >
            Get Help Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
