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

// Project Stats From GitHub API...
const projectStats: Record<string, ProjectStats> = {};


interface MinimalListSectionProps<T> {
  title: string;
  items: T[];
  loading?: boolean;
  renderItem: (item: T, idx: number) => React.ReactNode;
  buttonLink?: string;
  buttonText?: string;
}

function MinimalListSection<T>({ title, items, loading, renderItem, buttonLink, buttonText }: MinimalListSectionProps<T>) {
  return (
    <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <h2 className="default-subheading font-bold text-left mb-8 md:mb-12">{title}</h2>
      <div className="flex flex-col gap-5">
        {loading
          ? [1, 2, 3].map((idx) => (
              <div key={idx} className="h-[56px] bg-gray-100 animate-pulse rounded" />
            ))
          : items.map(renderItem)}
      </div>
      {buttonLink && buttonText && (
        <ButtonLink link={buttonLink} text={buttonText} className="mt-12" />
      )}
    </section>
  );
}

function MinimalProjectRow({ project, stats, onViewClick }: { project: Project; stats: ProjectStats; onViewClick: (slug: string) => void }) {
  const hasGitHubData = project.slug && stats && (stats.commitsCount > 0 || stats.contributorsCount > 0);
  
  return (
    <div className="
      w-full py-4 max-md:py-3 px-3 border-b border-gray-200
      flex flex-col rounded-lg
      mb-2
    ">
      <div className="flex-1 min-w-0">
        <h3 className="default-text font-semibold mb-1">{project.title}</h3>
        <p className="default-text text-gray-600 mb-2 max-w-3xl">{project.description}</p>
        
        <div className="flex flex-wrap items-center justify-between gap-x-4 max-md:gap-x-3 gap-y-2 mt-3">
          {hasGitHubData && (
            <div className="flex items-center gap-x-4 max-md:gap-x-3 default-label text-gray-500">
              <span className="flex items-center gap-x-1.5">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                {stats.commitsCount} commits
              </span>
              <span className="flex items-center gap-x-1.5">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 110-8 4 4 0 010 8z"/></svg>
                {stats.contributorsCount} contributors
              </span>
            </div>
          )}
          
          {project.slug && (
            <button 
              onClick={() => onViewClick(project.slug)}
              className="
                px-4 py-1 rounded
                border border-gray-300
                hover:bg-gray-100 
                text-sm font-medium text-gray-700
                transition-colors
                ml-auto max-md:ml-0
              "
            >
              View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        await Promise.all(
          projects.filter(project => project.slug).map(async (project) => {
            if (!project.slug) return; // Skip projects without a slug
            
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
    <MinimalListSection
      title="Featured Experience"
      items={projects}
      loading={loading}
      renderItem={(project, idx) => (
        <MinimalProjectRow
          key={project.slug}
          project={project}
          stats={projectStats[project.slug] || { commitsCount: 0, contributorsCount: 0, createdAt: "Unknown" }}
          onViewClick={handleProjectClick}
        />
      )}
      buttonLink="/projects"
      buttonText="View All Projects"
    />
  );
};

export default Projects;