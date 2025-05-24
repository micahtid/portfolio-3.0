import { socialLinks } from "@/data";
import React from "react";

const Hero = () => {
  const linkClass = "underline text-gray-500 hover:text-gray-700 transition-colors";

  return (
    <section className="
      max-w-[1200px] w-full mx-auto 
      min-h-[calc(100vh-200px)]
      default-padding py-[120px] max-lg:py-20 max-md:py-12
      flex flex-col justify-center gap-y-8
      max-lg:justify-start
    ">

      <h1 className="default-subheading font-bold z-10">
        I'm Micah, I build <br className="max-sm:hidden" />
        <span className="font-accent font-medium">full-stack</span> applications.
      </h1>

      <p className="default-text">
        Previously scoring 'Highest Mark in Country for AS Level Computer Science', I'm an incoming Software Engineering major at
        <a href="https://raikes.unl.edu/" className={linkClass} target="_blank">Jeffrey S. Raikes.</a>{" "}

        My tech stack includes React, Next.js, TailwindCSS, and Firebase.
        Currently I&apos;m leading the development of <a href="/projects" className={linkClass}>Mira</a>!
      </p>
      
      {/* <ButtonLink text="Visit Portfolio" link="/portfolio" /> */}

      <div className="flex items-center gap-x-4 mt-4">
        {socialLinks.map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            className="default-text hover:opacity-70 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Social link ${index + 1}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>  
  );
};

export default Hero;