/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Timeline from './components/Timeline';
import Team from './components/Team';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-white font-sans selection:bg-accent selection:text-white">
      <Navbar />
      <Hero />
      <main>
        <About />
        <Portfolio />
        <Timeline />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
