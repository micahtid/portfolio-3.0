"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { projects, Project } from '@/data/projects';
import ButtonLink from "./ButtonLink";

interface ProjectStats {
  commitsCount: number;
  contributorsCount: number;
  createdAt: string;
}

// Project stats will be populated from GitHub API...
const projectStats: Record<string, ProjectStats> = {};

// Skeleton card component for loading state
const SkeletonCard = () => (
  <div className="animate-pulse bg-white p-6 rounded-xl border border-gray-200 space-y-4">
    <div className="text-gray-500 bg-gray-200 p-2 rounded-lg w-10 h-10"></div>
    <div className="h-7 bg-gray-200 rounded w-2/3 mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
      <div className="flex items-center gap-4">
        <div className="h-5 bg-gray-200 rounded w-20"></div>
        <div className="h-5 bg-gray-200 rounded w-24"></div>
      </div>
      <div className="h-8 w-20 bg-gray-200 rounded-md"></div>
    </div>
  </div>
);

// Project card component
interface ProjectCardProps {
  project: Project;
  stats: ProjectStats;
  onViewClick: (slug: string) => void;
}

const ProjectCard = ({ project, stats, onViewClick }: ProjectCardProps) => (
  <div className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors space-y-4">
    {/* Main Icon */}
    <div className="text-gray-500 bg-gray-200 p-2 rounded-lg w-min">
      {project.mainIcon}
    </div>
    
    {/* Title and Description */}
    <h3 className="default-text text-xl font-semibold">{project.title}</h3>
    <p className="default-text text-gray-600">{project.description}</p>
    
    {/* Footer with Stats and View Button */}
    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
      <div className="flex items-center gap-4 default-label text-gray-500">
        <span>Commits: {stats.commitsCount}</span>
        <span>Contributors: {stats.contributorsCount}</span>
      </div>
      <button 
        onClick={() => onViewClick(project.slug)}
        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md border border-gray-200 default-label font-medium transition-colors"
      >
        View
      </button>
    </div>
  </div>
);

// Main Portfolio component
const Portfolio = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        await Promise.all(
          projects.map(async (project) => {
            try {
              const [repoRes, commitsRes, contributorsRes] = await Promise.all([
                fetch(`https://api.github.com/repos/Not-Micah/${project.slug}`),
                fetch(`https://api.github.com/repos/Not-Micah/${project.slug}/commits?per_page=1`),
                fetch(`https://api.github.com/repos/Not-Micah/${project.slug}/contributors`),
              ]);

              const repoData = (await repoRes.json()) as { created_at?: string };
              const contributors = contributorsRes.ok ? ((await contributorsRes.json()) as any[]) : [];

              let totalCommits = 1;
              const commitsLink = commitsRes.headers.get("Link");
              if (commitsLink) {
                const lastPageMatch = commitsLink.match(/&page=(\d+)>; rel="last"/);
                if (lastPageMatch && lastPageMatch[1]) {
                  totalCommits = parseInt(lastPageMatch[1], 10);
                }
              }

              projectStats[project.slug] = {
                commitsCount: totalCommits,
                contributorsCount: contributors.length,
                createdAt: repoData.created_at ? new Date(repoData.created_at).toLocaleDateString() : "Unknown",
              };
            } catch (error) {
              console.error(`Error fetching data for ${project.slug}:`, error);
              projectStats[project.slug] = {
                commitsCount: 0,
                contributorsCount: 0,
                createdAt: "Unknown"
              };
            }
          })
        );
      } catch (error) {
        console.error("Error fetching repository data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, []);

  const handleProjectClick = (slug: string) => {
    router.push(`/project?name=${slug}`);
  };

  return (
    <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <h2 className="default-subheading font-bold text-left mb-8 md:mb-12">Featured Projects</h2>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3].map((index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            const stats = projectStats[project.slug] || {
              commitsCount: 0,
              contributorsCount: 0,
              createdAt: "Unknown"
            };
            
            return (
              <ProjectCard 
                key={project.slug}
                project={project}
                stats={stats}
                onViewClick={handleProjectClick}
              />
            );
          })}
        </div>
      )}
    
      <ButtonLink link="/projects" text="View All Projects" className="mt-12" />
    </section>
  );
};

export default Portfolio;