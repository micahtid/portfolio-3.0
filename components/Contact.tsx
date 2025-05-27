"use client";

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a MAILTO URL with Field Data
      const subject = `Portfolio Contact: ${formData.name}`;
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      
      // Open The User's Email Client with Field Data
      window.location.href = `mailto:micahtid@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Reset Form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error opening email client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8"
    >
      <h2 className="default-subheading font-bold text-left mb-8 max-lg:mb-6">Get In Touch</h2>
      
      <div className="flex max-lg:flex-col flex-row gap-10 max-lg:gap-8">
        {/* Left Column - CTA Text */}
        <div className="flex-1 flex flex-col justify-start">
          <p className="default-text">
            Interested in collaborating on a project or looking to get a custom website? 
            I'm available for freelance work and new opportunities.
          </p>
        </div>
        
        {/* Right Column - Contact Form */}
        <div className="flex-1 flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-lg:gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="default-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-2 rounded
                  border border-gray-300 focus:border-gray-400
                  outline-none transition-colors
                "
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="default-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full px-4 py-2 rounded
                  border border-gray-300 focus:border-gray-400
                  outline-none transition-colors
                "
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="default-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="
                  w-full px-4 py-2 rounded
                  border border-gray-300 focus:border-gray-400
                  outline-none transition-colors resize-none
                "
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                mt-4 px-4 py-2 rounded
                border border-gray-300
                hover:bg-gray-100 
                text-sm font-medium text-gray-700
                disabled:opacity-50
                transition-colors
              "
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;