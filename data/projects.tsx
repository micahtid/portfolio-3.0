import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiFirebase, SiTypescript, SiStripe, SiZoom, SiGooglemaps, SiInstagram } from 'react-icons/si';
import { HiOutlineUsers, HiOutlineSearch, HiOutlineClipboardCheck, HiOutlineLightBulb } from 'react-icons/hi';
import { TbBrandOpenai } from 'react-icons/tb';

export interface Technology {
  name: string;
  icon: React.ReactNode;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  overview: string;
  category: string;
  mainIcon: React.ReactNode;
  techs: Technology[];
  videoUrl?: string;
  appUrl?: string;
  repositoryUrl?: string;
  images: string[];
}

export const projects: Project[] = [
  { 
    title: "Mira",
    slug: "mira",
    description: "[Halted] An application platform connecting youth-led organizations with potential interns and volunteers.",
    overview: "Mira is a comprehensive application platform designed for youth-led organizations to post internship and volunteer positions, both onsite and remote. As lead developer, I directed the development of both frontend and backend systems, while managing a team of three developers and a social media manager. The platform features customizable application questions, applicant resume viewing, and premium features for organizations. Despite strong technical implementation, development was halted due to challenges in reaching critical mass in this niche market.",
    category: "Application Platform",
    mainIcon: <HiOutlineUsers size={24} />,
    appUrl: "https://app.mira.example.com",
    repositoryUrl: "https://github.com/Not-Micah/mira",
    images: [
      "/mira/1.jpg",
      "/mira/2.jpg",
      "/mira/3.jpg",
      "/mira/4.jpg",
      "/mira/5.jpg"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> },
      { name: "Stripe", icon: <SiStripe size={20} /> }
    ]
  },
  { 
    title: "Me2",
    slug: "me2",
    description: "[Halted] A compatibility-based chat application connecting students with similar profiles.",
    overview: "Me2 is an innovative chat application designed for students, featuring a sophisticated compatibility algorithm that matches users based on stored profile criteria. As lead developer, I oversaw the entire project while collaborating with one co-developer who focused on frontend implementation. The platform offers features including send/accept/decline chat requests, 48-hour chat rooms, Zoom-integrated study rooms, and global chat rooms. Despite reaching a waitlist of 1,000 users, development was ultimately halted.",
    category: "Social Platform",
    mainIcon: <HiOutlineSearch size={24} />,
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    appUrl: "https://app.me2.example.com",
    repositoryUrl: "https://github.com/Not-Micah/me2",
    images: [
      "/me2/1.jpg",
      "/me2/2.jpg",
      "/me2/3.jpg",
      "/me2/4.jpg"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> },
      { name: "Zoom API", icon: <SiZoom size={20} /> }
    ]
  },
  { 
    title: "Intern @ Restoring Rainbows",
    slug: "restoring-rainbows",
    description: "Developed a comprehensive website and admin panel for a non-profit organization during a 3-month internship.",
    overview: "During a three-month internship from August to November, I worked directly with the co-founders of Restoring Rainbows to develop their organizational website from scratch. As the sole developer, I created a comprehensive platform showcasing the non-profit's branches, board members, blog content, and more. The project includes a robust administrator backend panel allowing staff to manage dynamic content without technical knowledge.",
    category: "Non-Profit Website",
    mainIcon: <HiOutlineClipboardCheck size={24} />,
    appUrl: "https://restoringrainbows.org",
    repositoryUrl: "https://github.com/Not-Micah/restoring-rainbows",
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
    ]
  },
  { 
    title: "Introship",
    slug: "introship", // Updated from empty
    description: "A personalized AI agent with a clean interface helping students land their first internship.",
    overview: "Coming Soon...",
    category: "Career Development",
    mainIcon: <HiOutlineLightBulb size={24} />,
    appUrl: "https://introship.app",
    // No repositoryUrl
    images: [
      "/introship/1.jpg",
      "/introship/2.jpg",
      "/introship/3.jpg"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> },
      { name: "OpenAI", icon: <TbBrandOpenai size={20} /> }
    ]
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};
