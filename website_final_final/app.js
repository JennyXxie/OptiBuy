// React Components
const { useState, useEffect } = React;

// Header Component
const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return React.createElement('header', { className: scrolled ? 'scrolled' : '' },
    React.createElement('nav', { className: 'container' },
      React.createElement('a', { href: '#', className: 'logo' }, 'SmartCart'),
      React.createElement('ul', { className: 'nav-links' },
        React.createElement('li', null, React.createElement('a', { href: '#features', onClick: (e) => { e.preventDefault(); scrollToSection('#features'); } }, 'Features')),
        React.createElement('li', null, React.createElement('a', { href: '#platforms', onClick: (e) => { e.preventDefault(); scrollToSection('#platforms'); } }, 'Platforms')),
        React.createElement('li', null, React.createElement('a', { href: '#technical', onClick: (e) => { e.preventDefault(); scrollToSection('#technical'); } }, 'Technical')),
        React.createElement('li', null, React.createElement('a', { href: '#ui', onClick: (e) => { e.preventDefault(); scrollToSection('#ui'); } }, 'UI Preview'))
      ),
      React.createElement('a', { href: '#contact', className: 'cta-button', onClick: (e) => { e.preventDefault(); scrollToSection('#contact'); } }, 'Get Early Access')
    )
  );
};

// Hero Component
const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return React.createElement('section', { className: 'hero' },
    React.createElement('div', { className: 'container' },
      React.createElement('h1', { className: 'fade-in-up' }, 'SmartCart'),
      React.createElement('p', { className: 'subtitle fade-in-up' }, 'The Ultimate E-commerce Price Tracking Extension'),
      React.createElement('p', { className: 'subtitle fade-in-up' }, 'Compare prices across Amazon, Temu, Shein and never overpay again'),
      React.createElement('div', { className: 'hero-buttons fade-in-up' },
        React.createElement('a', { href: '#features', className: 'btn-primary', onClick: (e) => { e.preventDefault(); scrollToSection('#features'); } },
          React.createElement('i', { className: 'fas fa-rocket' }),
          ' Learn More'
        ),
        React.createElement('a', { href: '#contact', className: 'btn-secondary', onClick: (e) => { e.preventDefault(); scrollToSection('#contact'); } },
          React.createElement('i', { className: 'fas fa-download' }),
          ' Download Extension'
        )
      )
    )
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      icon: 'fas fa-chart-line',
      title: 'Price Comparison',
      description: 'Compare prices across multiple platforms (Amazon, Temu, Shein) in real-time to find the best deals and save money on every purchase.'
    },
    {
      icon: 'fas fa-history',
      title: 'Price History Timeline',
      description: 'Track price history over 6 months with detailed charts and analytics to understand pricing patterns and trends.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Smart Recommendations',
      description: 'Get AI-powered recommendations for optimal purchase timing based on historical data and market trends.'
    },
    {
      icon: 'fas fa-ticket-alt',
      title: 'Coupon Integration',
      description: 'Automatically find and apply the best coupons and discount codes to maximize your savings on every purchase.'
    },
    {
      icon: 'fas fa-bell',
      title: 'Price Alerts',
      description: 'Set up smart price alerts and get notified when your favorite products drop to your target price.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Browser Extension',
      description: 'Seamlessly integrated browser extension that works across all major browsers with minimal setup required.'
    }
  ];

  return React.createElement('section', { id: 'features', className: 'features' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title scroll-reveal' }, 'Core Functionality'),
      React.createElement('div', { className: 'features-grid' },
        features.map((feature, index) =>
          React.createElement('div', { key: index, className: 'feature-card scroll-reveal' },
            React.createElement('div', { className: 'feature-icon' },
              React.createElement('i', { className: feature.icon })
            ),
            React.createElement('h3', null, feature.title),
            React.createElement('p', null, feature.description)
          )
        )
      )
    )
  );
};

// Audience Component
const Audience = () => {
  const audienceTypes = [
    {
      icon: 'fas fa-shopping-cart',
      title: 'Online Shoppers',
      description: 'Consumers who frequently shop online and want to ensure they\'re getting the best deals'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Price-Conscious Buyers',
      description: 'Budget-conscious individuals who actively seek discounts and compare prices before purchasing'
    },
    {
      icon: 'fas fa-users',
      title: 'Tech-Savvy Users',
      description: 'Early adopters who embrace browser extensions and digital tools to enhance their shopping experience'
    },
    {
      icon: 'fas fa-gift',
      title: 'Gift Buyers',
      description: 'People who purchase gifts regularly and want to find the best deals across multiple platforms'
    }
  ];

  return React.createElement('section', { className: 'audience' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title scroll-reveal' }, 'Target Audience'),
      React.createElement('div', { className: 'audience-grid' },
        audienceTypes.map((audience, index) =>
          React.createElement('div', { key: index, className: 'audience-card scroll-reveal' },
            React.createElement('div', { className: 'audience-icon' },
              React.createElement('i', { className: audience.icon })
            ),
            React.createElement('h3', null, audience.title),
            React.createElement('p', null, audience.description)
          )
        )
      )
    )
  );
};

// Platforms Component
const Platforms = () => {
  const platforms = [
    {
      icon: 'fab fa-amazon',
      title: 'Amazon',
      description: 'Complete price tracking and comparison for millions of Amazon products with historical data and trend analysis.'
    },
    {
      icon: 'fas fa-shopping-bag',
      title: 'Temu',
      description: 'Track prices on Temu\'s vast catalog of affordable products and discover hidden deals and discounts.'
    },
    {
      icon: 'fas fa-tshirt',
      title: 'Shein',
      description: 'Monitor fashion and lifestyle product prices on Shein with real-time updates and style trend analysis.'
    }
  ];

  return React.createElement('section', { id: 'platforms', className: 'platforms' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title scroll-reveal' }, 'Supported Platforms'),
      React.createElement('div', { className: 'platforms-grid' },
        platforms.map((platform, index) =>
          React.createElement('div', { key: index, className: 'platform-card scroll-reveal' },
            React.createElement('div', { className: 'platform-logo' },
              React.createElement('i', { className: platform.icon })
            ),
            React.createElement('h3', null, platform.title),
            React.createElement('p', null, platform.description)
          )
        )
      )
    )
  );
};

// Technical Component
const Technical = () => {
  const techSections = [
    {
      title: 'Browser Extension Architecture',
      items: [
        'Chrome, Firefox, Safari, Edge support',
        'Manifest V3 compliance',
        'Background service workers',
        'Content script injection',
        'Cross-origin request handling'
      ]
    },
    {
      title: 'Data Sources & APIs',
      items: [
        'Keepa API integration for Amazon data',
        'Web scraping for Temu and Shein',
        'Real-time price monitoring',
        'Historical data storage',
        'Coupon database integration'
      ]
    },
    {
      title: 'MVP Development',
      items: [
        'Start with 10-20 demo products',
        'Core price comparison features',
        'Basic price history tracking',
        'Simple coupon integration',
        'User-friendly interface'
      ]
    },
    {
      title: 'Technology Stack',
      items: [
        'JavaScript/TypeScript',
        'React for UI components',
        'Node.js backend services',
        'MongoDB for data storage',
        'Chart.js for visualizations'
      ]
    }
  ];

  return React.createElement('section', { id: 'technical', className: 'technical' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title scroll-reveal' }, 'Technical Approach'),
      React.createElement('div', { className: 'tech-grid' },
        techSections.map((section, index) =>
          React.createElement('div', { key: index, className: 'tech-card scroll-reveal' },
            React.createElement('h3', null, section.title),
            React.createElement('ul', null,
              section.items.map((item, itemIndex) =>
                React.createElement('li', { key: itemIndex }, item)
              )
            )
          )
        )
      )
    )
  );
};

// UI Preview Component
const UIPreview = () => {
  const products = [
    {
      name: 'Wireless Bluetooth Headphones',
      prices: [
        { platform: 'Amazon', price: '$29.99', isBest: true },
        { platform: 'Temu', price: '$34.99', isBest: false },
        { platform: 'Shein', price: '$39.99', isBest: false }
      ]
    },
    {
      name: 'Smart Fitness Watch',
      prices: [
        { platform: 'Amazon', price: '$89.99', isBest: false },
        { platform: 'Temu', price: '$79.99', isBest: true },
        { platform: 'Shein', price: '$95.99', isBest: false }
      ]
    },
    {
      name: 'LED Desk Lamp',
      prices: [
        { platform: 'Amazon', price: '$24.99', isBest: false },
        { platform: 'Temu', price: '$22.99', isBest: false },
        { platform: 'Shein', price: '$19.99', isBest: true }
      ]
    }
  ];

  return React.createElement('section', { id: 'ui', className: 'ui-preview' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title scroll-reveal' }, 'User Interface Preview'),
      React.createElement('div', { className: 'ui-mockup scroll-reveal' },
        React.createElement('div', { className: 'mockup-header' },
          React.createElement('i', { className: 'fas fa-shopping-cart' }),
          React.createElement('span', null, 'SmartCart Extension - Price Comparison')
        ),
        React.createElement('div', { className: 'mockup-content' },
          products.map((product, index) =>
            React.createElement('div', { key: index, className: 'product-card' },
              React.createElement('div', { className: 'product-info' },
                React.createElement('h4', null, product.name),
                React.createElement('div', { className: 'price-comparison' },
                  product.prices.map((price, priceIndex) =>
                    React.createElement('div', { key: priceIndex, className: `price-item ${price.isBest ? 'best' : ''}` },
                      `${price.platform}: ${price.price}`
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

// Contact Component
const Contact = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return React.createElement('section', { id: 'contact', className: 'features' },
    React.createElement('div', { className: 'container' },
      React.createElement('h2', { className: 'section-title scroll-reveal' }, 'Get Early Access'),
      React.createElement('div', { style: { textAlign: 'center', maxWidth: '600px', margin: '0 auto' } },
        React.createElement('p', { className: 'scroll-reveal', style: { fontSize: '1.2rem', color: '#666', marginBottom: '2rem' } },
          'Be among the first to experience SmartCart and help us shape the future of price tracking.'
        ),
        React.createElement('div', { className: 'hero-buttons scroll-reveal' },
          React.createElement('a', { href: 'mailto:contact@smartcart.com', className: 'btn-primary' },
            React.createElement('i', { className: 'fas fa-envelope' }),
            ' Contact Us'
          ),
          React.createElement('a', { href: '#', className: 'btn-secondary', onClick: (e) => { e.preventDefault(); } },
            React.createElement('i', { className: 'fas fa-bell' }),
            ' Join Waitlist'
          )
        )
      )
    )
  );
};

// Footer Component
const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return React.createElement('footer', null,
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'footer-content' },
        React.createElement('div', { className: 'footer-section' },
          React.createElement('h3', null, 'Product'),
          React.createElement('a', { href: '#features', onClick: (e) => { e.preventDefault(); scrollToSection('#features'); } }, 'Features'),
          React.createElement('a', { href: '#platforms', onClick: (e) => { e.preventDefault(); scrollToSection('#platforms'); } }, 'Platforms'),
          React.createElement('a', { href: '#technical', onClick: (e) => { e.preventDefault(); scrollToSection('#technical'); } }, 'Technical'),
          React.createElement('a', { href: '#ui', onClick: (e) => { e.preventDefault(); scrollToSection('#ui'); } }, 'UI Preview')
        ),
        React.createElement('div', { className: 'footer-section' },
          React.createElement('h3', null, 'Support'),
          React.createElement('a', { href: '#' }, 'Documentation'),
          React.createElement('a', { href: '#' }, 'Help Center'),
          React.createElement('a', { href: '#' }, 'Community'),
          React.createElement('a', { href: '#' }, 'Contact')
        ),
        React.createElement('div', { className: 'footer-section' },
          React.createElement('h3', null, 'Company'),
          React.createElement('a', { href: '#' }, 'About Us'),
          React.createElement('a', { href: '#' }, 'Privacy Policy'),
          React.createElement('a', { href: '#' }, 'Terms of Service'),
          React.createElement('a', { href: '#' }, 'Careers')
        )
      ),
      React.createElement('div', { style: { borderTop: '1px solid #555', paddingTop: '2rem', marginTop: '2rem' } },
        React.createElement('p', null, '© 2024 SmartCart. All rights reserved. Built with ❤️ for smart shoppers.')
      )
    )
  );
};

// Main App Component
const App = () => {
  return React.createElement('div', { className: 'App' },
    React.createElement(Header, null),
    React.createElement(Hero, null),
    React.createElement('div', { className: 'main-content' },
      React.createElement(Features, null),
      React.createElement(Audience, null),
      React.createElement(Platforms, null),
      React.createElement(Technical, null),
      React.createElement(UIPreview, null),
      React.createElement(Contact, null)
    ),
    React.createElement(Footer, null)
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
