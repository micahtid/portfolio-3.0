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
    overview: "Mira is a two-sided platform. (2) It enables youth-led organizations to post onsite and remote internship and volunteer opportunities, review applicants, and select candidates. (1) Likewise, it allows high school students to easily apply for these positions. As lead developer, I managed both the frontend and backend, directing a team of three developers and a social media manager. This was my first project experimenting with email notifications and Stripe subscriptions. Unfortunately, it was eventually halted due to limited reach in this niche market.",
    category: "Application Platform",
    mainIcon: <HiOutlineUsers size={24} />,
    appUrl: "https://mira-volunteer.vercel.app/",
    repositoryUrl: "https://github.com/Not-Micah/mira",
    images: [
      "/mira/1.jpg",
      "/mira/2.jpg",
      "/mira/3.jpg",
      "/mira/4.jpg",
      "/mira/5.jpg",
      "/mira/6.jpg"
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
    overview: "Me2 is a chat platform designed specifically for students. Using a compatibility algorithm, it calculates scores based on stored profile data, enabling students to connect with those most similar to them. Me2 allows students to send chat requests and join study rooms together. As lead developer, working alongside one co-developer, I focused primarily on backend development—designing the database architecture for chat data and integrating APIs such as Zoom. Despite building a waitlist of over 1,000 users, Me2 was ultimately halted due to limited development resources.",
    category: "Social Platform",
    mainIcon: <HiOutlineSearch size={24} />,
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    appUrl: "https://me2-beta.vercel.app/",
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
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};
