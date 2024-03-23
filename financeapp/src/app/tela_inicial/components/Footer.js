import React from 'react';
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import styles from '../styles/styles.module.css'; // Importando o CSS Module

const Footer = () => {
 return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerText}>
          <h2>Ajuda</h2>
          <p>Fale Conosco</p>
        </div>
        <div className={styles.footerIcons}>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={24} />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={24} />
          </a>
        </div>
      </div>
    </footer>
 );
};

export default Footer;
