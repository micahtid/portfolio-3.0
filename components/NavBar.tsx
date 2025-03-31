'use client';

import { navLinks } from '@/data';
import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavLink {
  href: string;
  label: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`
        fixed inset-0 bg-white z-50 flex flex-col
        transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
      `}
    >
      <div className="flex justify-end p-6 z-10">
        <button 
          onClick={onClose}
          aria-label="Close menu"
          className="text-black"
        >
          <RiCloseLine size={24} />
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center flex-1 gap-8
      transform -translate-y-[75px]">
        {navLinks.map((link: NavLink, index) => (
          <div key={index} className="text-center">
            <a
              href={link.href}
              className="text-xl font-accent"
              onClick={onClose}
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full py-6">
      <nav className="max-w-[1200px] mx-auto px-6 flex justify-end items-center">

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link: NavLink, index) => (
            <a
              key={index}
              href={link.href}
              className="relative group font-medium"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <RiMenu3Line size={24} />
        </button>
      </nav>
      
      {/* Mobile Menu Modal */}
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </header>
  );
};

export default NavBar;