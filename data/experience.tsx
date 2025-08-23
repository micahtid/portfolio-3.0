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
    description: "Developed a full-featured website and administrative panel for a NPO during a three-month internship.",
    overview: "I worked directly with the co-founders of Restoring Rainbows to build their organizational website from the ground up. The site features pages highlighting the nonprofit’s branches, board members, blog content, and more. It also includes a robust administrative backend panel, allowing staff to easily manage dynamic content. Throughout the project, I integrated several APIs, including Google Maps and Instagram.",
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
    timeframe: "Aug 2024 - Dec 2024"
  }
];

