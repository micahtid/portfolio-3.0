import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiFirebase, SiGooglemaps, SiInstagram } from 'react-icons/si';
import { HiOutlineClipboardCheck } from 'react-icons/hi';

export interface Experience {
  title: string;
  description: string;
  overview: string;
  category: string;
  mainIcon: React.ReactNode;
  techs: { name: string; icon: React.ReactNode }[];
  appUrl?: string;
  images: string[];
  timeframe?: string;
}

export const experiences: Experience[] = [
  {
    title: "Intern @ Restoring Rainbows",
    description: "Developed a comprehensive website and admin panel for a non-profit organization during a 3-month internship.",
    overview: "During a three-month internship from August to November, I worked directly with the co-founders of Restoring Rainbows to develop their organizational website from scratch. As the sole developer, I created a comprehensive platform showcasing the non-profit's branches, board members, blog content, and more. The project includes a robust administrator backend panel allowing staff to manage dynamic content without technical knowledge.",
    category: "Non-Profit Website",
    mainIcon: <HiOutlineClipboardCheck size={24} />,
    appUrl: "https://restoringrainbows.org",
    images: [
      "/restoring-rainbows/1.jpg",
      "/restoring-rainbows/2.jpg",
      "/restoring-rainbows/3.jpg",
      "/restoring-rainbows/4.jpg"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> },
      { name: "Google Maps API", icon: <SiGooglemaps size={20} /> },
      { name: "Instagram API", icon: <SiInstagram size={20} /> }
    ],
    timeframe: "Aug 2025 - Nov 2025"
  }
];

