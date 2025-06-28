"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

import ListSection from './ListSection';
import ListItemCard from './ListItemCard';
import ButtonLink from './ButtonLink';

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
    <section 
    id="projects"
    className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <h2 className="default-subheading font-bold text-left mb-8 md:mb-12">{title}</h2>
      <div className="flex flex-col gap-5">
        {loading
          ? [1, 2, 3].map((idx) => (
              <div key={idx} className="w-full py-4 px-3 border-b border-gray-200 rounded-lg mb-2">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4 mb-3"></div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-24"></div>
                    <div className="h-4 bg-gray-100 animate-pulse rounded w-24"></div>
                  </div>
                  <div className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
                </div>
              </div>
            ))
          : items.map(renderItem)}
      </div>
      {buttonLink && buttonText && (
        <ButtonLink link={buttonLink} text={buttonText} className="mt-12" />
      )}
    </section>
  );
}


const Projects = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  
  // Filter out Introship from projects
  const filteredProjects = projects.filter(project => project.slug !== "introship");

  useEffect(() => {
    const fetchProjectStats = async (projects: Project[]) => {
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    fetchProjectStats(projects);
  }, [projects]);

  const handleProjectClick = (slug: string) => {
    router.push(`/showcase?name=${slug}`);
  };

  return (
    <ListSection
      title="Featured Projects"
      items={filteredProjects}
      loading={loading}
      renderItem={(project) => (
        <ListItemCard
          key={project.slug}
          title={project.title}
          description={project.description}
          onViewClick={() => handleProjectClick(project.slug)}
          githubStats={projectStats[project.slug] || { commitsCount: 0, contributorsCount: 0 }}
          showGithubStats={true}
        />
      )}
      buttonLink="/projects"
      buttonText="View All Projects"
    />
  );
};

export default Projects;

