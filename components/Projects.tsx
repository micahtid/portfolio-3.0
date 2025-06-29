"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { projects } from '@/data/projects';
import type { Project } from '@/data/projects';

import ListSection from './ListSection';
import ListItemCard from './ListItemCard';

interface ProjectStats {
  commitsCount: number;
  contributorsCount: number;
  createdAt: string;
}

// Project Stats From GitHub API...
const projectStats: Record<string, ProjectStats> = {};



const Projects = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  
  // Filter out Introship from projects
  const filteredProjects = projects.filter(project => project.slug !== "introship");

  useEffect(() => {
    const fetchProjectStats = async (projectsToFetch: Project[]) => {
      try {
        await Promise.all(
          projectsToFetch.filter(project => project.slug).map(async (project) => {
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
  }, []);

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

