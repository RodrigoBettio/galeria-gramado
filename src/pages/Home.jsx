import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import StatsSection from "@/components/landing/StatsSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F3E5C2]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&family=Dancing+Script:wght@400;500;600;700&display=swap');
          
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-cursive { font-family: 'Great Vibes', cursive; }
          .font-dancing { font-family: 'Dancing Script', cursive; }
          .font-montserrat { font-family: 'Montserrat', sans-serif; }
          
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>
      
      <Header scrolled={scrolled} />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}