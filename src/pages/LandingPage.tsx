import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  useEffect(() => {
    console.log('LandingPage component mounted');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-warm-beige">
      {console.log('Rendering Header')}
      <Header />
      <main className="flex-grow">
        {console.log('Rendering Hero')}
        <Hero />
        {console.log('Rendering Features')}
        <Features />
        {console.log('Rendering HowItWorks')}
        <HowItWorks />
        {console.log('Rendering Testimonials')}
        <Testimonials />
        {console.log('Rendering CallToAction')}
        <CallToAction />
      </main>
      {console.log('Rendering Footer')}
      <Footer />
    </div>
  );
};

export default LandingPage;