import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonLinkProps {
  text: string;
  link: string;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ text, link, className }) => {
  return (
    <div
      className={twMerge("flex items-center gap-x-2", className)}
    >
      <a 
        href={link} 
        className="text-black default-text"
      >
        {text}
      </a>

      <svg 
        className="w-6 h-6 animate-[arrow-move_2s_ease-in-out_infinite]"
        width="24" height="24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" fill="currentColor"></path>
      </svg>

      <style>
        {`
          @keyframes arrow-move {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ButtonLink;
