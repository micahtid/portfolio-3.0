"use client";

import { useEffect, useState } from "react";
import useProjectModal from '@/hooks/useProjectModal';
import { FaReact, FaNodeJs, FaAws, FaFigma } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb, SiTypescript } from 'react-icons/si';
import ProjectModal from '@/components/ProjectModal';
import { ReactNode } from "react";

interface Technology {
  name: string;
  icon: ReactNode;
}

interface PinnedRepo {
  title: string;
  description: string;
  techs: Technology[];
  videoUrl?: string;
  appUrl?: string;
  repositoryUrl?: string;
  imgShowcase?: string[];
}

interface Repo {
  name: string;
  url: string;
  commitsCount: number;
  contributorsCount: number;
  createdAt: string;
  description: string;
}

const pinnedRepos: PinnedRepo[] = [
  { 
    title: "mira", 
    description: "A social network platform for Influencers, agencies and brands to collaborate for business purposes.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    appUrl: "https://app.mira.example.com",
    repositoryUrl: "https://github.com/Not-Micah/mira",
    imgShowcase: [
      "/projects/mira-1.png",
      "/projects/mira-2.png",
      "/projects/mira-3.png"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Node.js", icon: <FaNodeJs size={20} /> },
      { name: "MongoDB", icon: <SiMongodb size={20} /> },
      { name: "AWS", icon: <FaAws size={20} /> }
    ]
  },
  { 
    title: "me2", 
    description: "Enterprise search for modern workplaces with AI-powered features.",
    videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    appUrl: "https://app.me2.example.com",
    repositoryUrl: "https://github.com/Not-Micah/me2",
    imgShowcase: [
      "/projects/me2-1.png",
      "/projects/me2-2.png",
      "/projects/me2-3.png"
    ],
    techs: [
      { name: "Next.js", icon: <SiNextdotjs size={20} /> },
      { name: "TypeScript", icon: <SiTypescript size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> }
    ]
  },
  { 
    title: "restoring-rainbows", 
    description: "Project management tool with AI-powered insights and team collaboration features.",
    videoUrl: "https://www.youtube.com/embed/C0DPdy98e4c",
    appUrl: "https://app.restoring-rainbows.example.com",
    repositoryUrl: "https://github.com/Not-Micah/restoring-rainbows",
    imgShowcase: [
      "/projects/restoring-rainbows-1.png",
      "/projects/restoring-rainbows-2.png",
      "/projects/restoring-rainbows-3.png"
    ],
    techs: [
      { name: "React", icon: <FaReact size={20} /> },
      { name: "Firebase", icon: <SiFirebase size={20} /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={20} /> },
      { name: "Figma", icon: <FaFigma size={20} /> }
    ]
  },
];

const Portfolio = () => {
  const [repos, setRepos] = useState<(Repo & { project: any })[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const projectModal = useProjectModal();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const enrichedRepos = await Promise.all(
          pinnedRepos.map(async (pinnedRepo, index) => {
            const [repoRes, commitsRes, contributorsRes] = await Promise.all([
              fetch(`https://api.github.com/repos/Not-Micah/${pinnedRepo.title}`),
              fetch(`https://api.github.com/repos/Not-Micah/${pinnedRepo.title}/commits?per_page=1`),
              fetch(`https://api.github.com/repos/Not-Micah/${pinnedRepo.title}/contributors`),
            ]);

            const repoData = (await repoRes.json()) as { name?: string; html_url?: string; created_at?: string };
            const contributors = contributorsRes.ok ? ((await contributorsRes.json()) as any[]) : [];

            let totalCommits = 1;
            const commitsLink = commitsRes.headers.get("Link");
            if (commitsLink) {
              const lastPageMatch = commitsLink.match(/&page=(\d+)>; rel="last"/);
              if (lastPageMatch) totalCommits = parseInt(lastPageMatch[1], 10);
            }

            // Project Object For Modal
            const project = {
              id: index + 1,
              title: repoData.name || pinnedRepo.title,
              description: pinnedRepo.description,
              image: pinnedRepo.imgShowcase && pinnedRepo.imgShowcase.length > 0 
                ? pinnedRepo.imgShowcase[0] 
                : "/placeholder.png",
              category: "GitHub Project",
              link: repoData.html_url || `https://github.com/Not-Micah/${pinnedRepo.title}`,
              videoUrl: pinnedRepo.videoUrl,
              appUrl: pinnedRepo.appUrl,
              repositoryUrl: pinnedRepo.repositoryUrl || repoData.html_url || `https://github.com/Not-Micah/${pinnedRepo.title}`,
              imgShowcase: pinnedRepo.imgShowcase,
              technologies: pinnedRepo.techs
            };

            // Component State
            return {
              name: repoData.name || pinnedRepo.title,
              url: repoData.html_url || `https://github.com/Not-Micah/${pinnedRepo.title}`,
              commitsCount: totalCommits,
              contributorsCount: contributors.length,
              createdAt: repoData.created_at ? new Date(repoData.created_at).toLocaleDateString() : "Unknown",
              description: pinnedRepo.description,
              project: project
            };
          })
        );

        setRepos(enrichedRepos);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, []);

  const handleOpenModal = (repo: any) => {
    projectModal.onOpen(repo.project);
  };

  return (
    <section className="max-w-[1200px] w-full mx-auto px-6 py-16 max-lg:py-8">
      <h2 className="default-subheading font-bold text-left mb-12">Featured Projects</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="p-4 bg-gray-50 border border-gray-300 rounded-md animate-pulse h-full">
              <div className="h-5 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
              <div className="flex flex-wrap gap-2 mt-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-16 bg-gray-300 rounded-full"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div 
              key={repo.name} 
              className="p-4 bg-gray-50 border border-gray-300 rounded-md flex flex-col space-y-2 cursor-pointer h-full transition-all hover:shadow-md"
              onClick={() => handleOpenModal(repo)}
            >
              <h2 className="text-lg font-semibold text-blue-600">{repo.name}</h2>
              {repo.description && <p className="text-gray-600 text-sm italic">{repo.description}</p>}
              
              <div className="flex flex-wrap gap-2 mt-2">
                {repo.project.technologies.map((tech: Technology, index: number) => (
                  <span key={index} className="inline-flex items-center justify-center bg-gray-100 p-2 rounded-full text-xs">
                    {tech.icon}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 text-sm text-gray-700 gap-2">
                <p className="text-xs">Commits: {repo.commitsCount} | Contributors: {repo.contributorsCount}</p>
                <p className="text-xs text-gray-500">Created: {repo.createdAt}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-2 border-t border-gray-200 mt-2">
                <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">{repo.project.category}</span>
                <a 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 hover:underline text-xs sm:text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Repository →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <ProjectModal />
    </section>
  );
};

export default Portfolio;