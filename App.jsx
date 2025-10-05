import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Audience from './components/Audience';
import Platforms from './components/Platforms';
import Technical from './components/Technical';
import UIPreview from './components/UIPreview';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <div className="main-content">
        <Features />
        <Audience />
        <Platforms />
        <Technical />
        <UIPreview />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default App;
