
import { ProductData } from '@/types/product';

export const generateHTML = (product: ProductData): string => {
  const { 
    name, 
    description, 
    price, 
    images, 
    category, 
    features, 
    callToAction, 
    testimonials, 
    primaryColor, 
    secondaryColor,
    fontFamily,
    layout
  } = product;
  
  // Sanitize inputs for HTML
  const sanitize = (str: string) => {
    if (!str) return '';
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  // Generate font import
  let fontImport = '';
  if (fontFamily === 'Inter') {
    fontImport = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap">';
  } else if (fontFamily === 'Playfair Display') {
    fontImport = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap">';
  } else if (fontFamily === 'Roboto') {
    fontImport = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap">';
  } else if (fontFamily === 'Montserrat') {
    fontImport = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap">';
  } else if (fontFamily === 'Poppins') {
    fontImport = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">';
  }

  // Generate CSS
  const css = `
    :root {
      --primary-color: ${primaryColor};
      --secondary-color: ${secondaryColor};
      --text-color: #333;
      --background-color: #fff;
      --muted-color: #f5f5f7;
      --font-family: ${fontFamily}, system-ui, sans-serif;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--font-family);
      background-color: var(--background-color);
      color: var(--text-color);
      line-height: 1.5;
    }
    
    header {
      padding: 1.5rem;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 1000;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo {
      font-weight: 600;
      font-size: 1.25rem;
      color: var(--primary-color);
    }
    
    .nav-links a {
      margin-left: 1.5rem;
      text-decoration: none;
      color: var(--text-color);
      font-size: 0.9rem;
      transition: color 0.2s;
    }
    
    .nav-links a:hover {
      color: var(--primary-color);
    }
    
    section {
      padding: 5rem 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    
    .hero {
      display: flex;
      flex-direction: ${layout === 'centered' ? 'column' : 'row'};
      align-items: center;
      justify-content: ${layout === 'centered' ? 'center' : 'space-between'};
      text-align: ${layout === 'centered' ? 'center' : 'left'};
      min-height: 80vh;
      gap: 3rem;
    }
    
    .hero-content {
      flex: 1;
      ${layout === 'centered' ? 'max-width: 700px; margin: 0 auto;' : ''}
    }
    
    .hero-image {
      flex: 1;
      ${layout === 'centered' ? 'max-width: 500px; margin: 0 auto;' : ''}
    }
    
    .hero-image img {
      width: 100%;
      height: auto;
      border-radius: 1rem;
      object-fit: cover;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-out;
    }
    
    .hero-image img:hover {
      transform: translateY(-5px);
    }
    
    .price {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin: 1.5rem 0;
    }
    
    .badge {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.05);
      color: var(--text-color);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      font-size: 0.8rem;
      margin-bottom: 1rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    
    .cta-button {
      display: inline-block;
      background-color: var(--primary-color);
      color: white;
      padding: 1rem 2rem;
      border-radius: 2rem;
      font-weight: 600;
      text-decoration: none;
      transition: transform 0.3s, box-shadow 0.3s;
      border: none;
      cursor: pointer;
      font-size: 1rem;
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      padding: 5rem 1.5rem;
      background-color: var(--muted-color);
    }
    
    .feature {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;
    }
    
    .feature:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      width: 50px;
      height: 50px;
      background-color: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    
    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    
    .testimonials {
      text-align: center;
      padding: 5rem 1.5rem;
    }
    
    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .testimonial {
      background: white;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
      text-align: left;
    }
    
    .testimonial-content {
      font-style: italic;
      margin-bottom: 1.5rem;
    }
    
    .testimonial-author {
      font-weight: 600;
    }
    
    .trust-badges {
      display: flex;
      justify-content: center;
      gap: 2rem;
      flex-wrap: wrap;
      margin-top: 4rem;
    }
    
    .trust-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #666;
      font-size: 0.9rem;
    }
    
    footer {
      background-color: var(--primary-color);
      color: white;
      padding: 3rem 1.5rem;
      text-align: center;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .footer-links a {
      color: white;
      text-decoration: none;
      font-size: 0.9rem;
      transition: opacity 0.2s;
    }
    
    .footer-links a:hover {
      opacity: 0.8;
    }
    
    .copyright {
      font-size: 0.85rem;
      opacity: 0.8;
    }
    
    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
        text-align: center;
      }
      
      h1 {
        font-size: 2.5rem;
      }
      
      .nav-links {
        display: none;
      }
    }
  `;

  // Generate layout based on selected layout type
  let heroSection = '';
  let featuresSection = '';
  let testimonialsSection = '';
  
  // Hero section based on layout type
  if (layout === 'centered') {
    heroSection = `
      <section class="hero">
        <div class="hero-content">
          <div class="badge">${sanitize(category)}</div>
          <h1>${sanitize(name)}</h1>
          <p>${sanitize(description)}</p>
          <div class="price">${sanitize(price)}</div>
          <button class="cta-button">${sanitize(callToAction)}</button>
        </div>
        ${images.length > 0 ? `
          <div class="hero-image">
            <img src="${images[0]}" alt="${sanitize(name)}" />
          </div>
        ` : ''}
      </section>
    `;
  } else if (layout === 'split') {
    heroSection = `
      <section class="hero">
        ${images.length > 0 ? `
          <div class="hero-image">
            <img src="${images[0]}" alt="${sanitize(name)}" />
          </div>
        ` : ''}
        <div class="hero-content">
          <div class="badge">${sanitize(category)}</div>
          <h1>${sanitize(name)}</h1>
          <p>${sanitize(description)}</p>
          <div class="price">${sanitize(price)}</div>
          <button class="cta-button">${sanitize(callToAction)}</button>
        </div>
      </section>
    `;
  } else if (layout === 'zigzag') {
    heroSection = `
      <section class="hero">
        <div class="hero-content">
          <div class="badge">${sanitize(category)}</div>
          <h1>${sanitize(name)}</h1>
          <p>${sanitize(description)}</p>
          <div class="price">${sanitize(price)}</div>
          <button class="cta-button">${sanitize(callToAction)}</button>
        </div>
        ${images.length > 0 ? `
          <div class="hero-image">
            <img src="${images[0]}" alt="${sanitize(name)}" />
          </div>
        ` : ''}
      </section>
    `;
  }
  
  // Features section
  if (features.length > 0) {
    const featureItems = features.map((feature, index) => `
      <div class="feature">
        <div class="feature-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="feature-title">Feature ${index + 1}</div>
        <p>${sanitize(feature)}</p>
      </div>
    `).join('');
    
    featuresSection = `
      <section>
        <h2>Key Features</h2>
        <div class="features">
          ${featureItems}
        </div>
      </section>
    `;
  }
  
  // Testimonials section
  if (testimonials.length > 0 && testimonials[0].content) {
    const testimonialItems = testimonials
      .filter(t => t.content && t.author)
      .map(testimonial => `
        <div class="testimonial">
          <div class="testimonial-content">"${sanitize(testimonial.content)}"</div>
          <div class="testimonial-author">— ${sanitize(testimonial.author)}</div>
        </div>
      `).join('');
    
    if (testimonialItems) {
      testimonialsSection = `
        <section class="testimonials">
          <h2>What Our Customers Say</h2>
          <div class="testimonial-grid">
            ${testimonialItems}
          </div>
          <div class="trust-badges">
            <div class="trust-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Secure Checkout</span>
            </div>
            <div class="trust-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Free Shipping</span>
            </div>
            <div class="trust-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>30-Day Return</span>
            </div>
          </div>
        </section>
      `;
    }
  }
  
  // Generate complete HTML
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${sanitize(name)} - Product Landing Page</title>
      ${fontImport}
      <style>${css}</style>
    </head>
    <body>
      <header>
        <nav>
          <div class="logo">Brand</div>
          <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">Testimonials</a>
            <a href="#">Contact</a>
          </div>
        </nav>
      </header>
      
      <main>
        ${heroSection}
        ${featuresSection}
        ${testimonialsSection}
      </main>
      
      <footer>
        <div class="footer-content">
          <div class="logo">Brand</div>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact Us</a>
          </div>
          <div class="copyright">© ${new Date().getFullYear()} All Rights Reserved</div>
        </div>
      </footer>
    </body>
    </html>
  `;
};

export const generateReactCode = (product: ProductData): string => {
  // This would generate React components based on the product data
  // For simplicity, we're just returning a placeholder string
  return `
import React from 'react';

const ProductLandingPage = () => {
  return (
    <div>
      <h1>${product.name}</h1>
      <p>React component code would be generated here</p>
    </div>
  );
};

export default ProductLandingPage;
  `;
};

export const downloadCode = (code: string, format: 'html' | 'react'): void => {
  const fileName = format === 'html' 
    ? 'landing-page.html' 
    : 'ProductLandingPage.jsx';
  
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};
