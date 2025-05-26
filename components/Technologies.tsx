"use client";

import React, { useEffect, useState } from 'react';
import { 
  FaPython, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaReact, 
  FaJava, 
  FaStripe 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiExpress, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiCplusplus, 
  SiArduino, 
  SiFirebase, 
  SiSupabase, 
  SiMongodb 
} from 'react-icons/si';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface TechnologyIconProps {
  icon: React.ReactNode;
  size?: number;
}

const TechnologyIcon = ({ icon, size = 48 }: TechnologyIconProps) => {
  return (
    <div className="flex items-center justify-center mx-4 md:mx-8 opacity-40 hover:opacity-80 transition-opacity duration-300">
      <div style={{ fontSize: size, color: '#333333' }}>{icon}</div>
    </div>
  );
};

const Technologies = () => {
  const [iconSize, setIconSize] = useState(48);

  useEffect(() => {
    // Handle responsive icon sizing
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setIconSize(32);
        } else if (window.innerWidth < 1024) {
          setIconSize(40);
        } else {
          setIconSize(48);
        }
      }
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener for window resize
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const technologies = [
    { icon: <FaPython /> },
    { icon: <FaHtml5 /> },
    { icon: <FaCss3Alt /> },
    { icon: <FaJs /> },
    { icon: <SiTypescript /> },
    { icon: <FaReact /> },
    { icon: <SiExpress /> },
    { icon: <SiNextdotjs /> },
    { icon: <SiTailwindcss /> },
    { icon: <FaJava /> },
    { icon: <SiCplusplus /> },
    { icon: <SiArduino /> },
    { icon: <SiFirebase /> },
    { icon: <SiSupabase /> },
    { icon: <SiMongodb /> },
    { icon: <FaStripe /> },
  ];

  // Configure slider settings - non-interactive
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false, // Prevent Pausing on Hover
    pauseOnFocus: false, // Prevent Pausing on Focus
    swipe: false, // Disable Swipe Functionality
    draggable: false, // Disable Dragging
    arrows: false, // No Navigation Arrows
    touchMove: false, // Disable Touch Movement
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <section className="
      max-w-[1200px] w-full mx-auto mb-16
      default-padding py-10 overflow-hidden
    ">      
      <div className="relative overflow-hidden">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none" 
             style={{ 
               background: 'linear-gradient(to right, white 20%, rgba(255, 255, 255, 0))' 
             }}>
        </div>
        
        {/* Right gradient overlay */}
        <div className="absolute right-0 top-0 h-full w-16 md:w-24 z-10 pointer-events-none" 
             style={{ 
               background: 'linear-gradient(to left, white 20%, rgba(255, 255, 255, 0))' 
             }}>
        </div>
        
        <Slider {...sliderSettings} className="py-4">
          {technologies.map((tech, index) => (
            <TechnologyIcon 
              key={`tech-${index}`} 
              icon={tech.icon} 
              size={iconSize} 
            />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Technologies;
