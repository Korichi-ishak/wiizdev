import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Wiiz Dev - Développement Web & Mobile | Solutions Digitales Innovantes",
  description = "Wiiz Dev crée des solutions web et mobile sur mesure. Développement d'applications, sites e-commerce, et plateformes digitales. Expertise React, Node.js, MongoDB. Contact gratuit.",
  keywords = "développement web, application mobile, React, Node.js, MongoDB, e-commerce, site web, développeur, France, solutions digitales",
  image = "https://storage.googleapis.com/wiiz/Logo.svg",
  url = "https://wiizdev.com",
  type = "website",
  noIndex = false
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Wiiz Dev" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <meta name="theme-color" content="#42306F" />
    </Helmet>
  );
};

export default SEO;