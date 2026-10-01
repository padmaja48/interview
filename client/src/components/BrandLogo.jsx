import React from 'react';
import logoSrc from '../assets/progrow-logo.jpeg';
import '../styles/BrandLogo.css';

/**
 * ProGrow brand mark — replaces legacy FluentAI text logo.
 * @param {{ variant?: 'sidebar' | 'auth' | 'admin', collapsed?: boolean, className?: string }} props
 */
export const BrandLogo = ({ variant = 'auth', collapsed = false, className = '' }) => (
  <img
    src={logoSrc}
    alt="ProGrow — Passion for Progress and Growth"
    className={[
      'brand-logo',
      `brand-logo--${variant}`,
      collapsed ? 'brand-logo--collapsed' : '',
      className,
    ].filter(Boolean).join(' ')}
  />
);

export default BrandLogo;
