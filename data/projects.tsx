import { FaReact, FaNodeJs, FaAws, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb, SiTypescript } from 'react-icons/si';

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
    description: "A social network platform for Influencers, agencies and brands to collaborate for business purposes.",
    overview: "Mira is a comprehensive social networking platform designed specifically for influencers, agencies, and brands to facilitate business collaborations. The platform provides tools for profile management, campaign creation, analytics tracking, and secure communication between parties. Built with scalability in mind, Mira uses React for the frontend, Node.js for the backend, and MongoDB for data storage, all hosted on AWS infrastructure.",
    category: "Social Platform",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
      { name: "MongoDB", icon: <SiMongodb size={20} /> },
      { name: "AWS", icon: <FaAws size={20} /> }
    ]
  },
  { 
    title: "Me2",
    slug: "me2",
    description: "Enterprise search for modern workplaces with AI-powered features.",
    overview: "Me2 is an advanced enterprise search solution designed for modern workplaces. It leverages AI to deliver personalized search results based on user behavior and preferences. The platform includes features like document indexing, natural language processing, and integration with popular workplace tools. Built with Next.js and TypeScript for type safety, Me2 uses TailwindCSS for styling and Firebase for backend services.",
    category: "Enterprise Tool",
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
      { name: "Next.js", icon: <SiNextdotjs size={20} /> },
      { name: "TypeScript", icon: <SiTypescript size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> }
    ]
  },
  { 
    title: "Restoring Rainbows",
    slug: "restoring-rainbows",
    description: "Project management tool with AI-powered insights and team collaboration features.",
    overview: "Restoring Rainbows is a comprehensive project management tool that combines traditional task tracking with AI-powered insights to help teams work more efficiently. The platform includes features for task assignment, progress tracking, resource allocation, and automated reporting. The intuitive interface, designed in Figma, is built with React and styled with TailwindCSS, while Firebase provides real-time data synchronization and user authentication.",
    category: "Project Management",
    videoUrl: "https://www.youtube.com/embed/C0DPdy98e4c",
    appUrl: "https://app.restoring-rainbows.example.com",
    repositoryUrl: "https://github.com/Not-Micah/restoring-rainbows",
    images: [
      "/restoring-rainbows/1.jpg",
      "/restoring-rainbows/2.jpg",
      "/restoring-rainbows/3.jpg",
      "/restoring-rainbows/4.jpg"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={20} /> },
      { name: "Figma", icon: <FaFigma size={20} /> }
    ]
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};
