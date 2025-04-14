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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[1, 2, 3].map((index) => (
            <div key={index} className="animate-pulse bg-white p-6 rounded-xl border border-gray-100">
              <div className="aspect-[16/9] bg-gray-200 rounded-xl mb-6 border-2 border-gray-100"></div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-7 bg-gray-200 rounded-lg w-1/3"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-20"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded-lg w-full mb-2"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-5/6 mb-5"></div>
              <div className="flex flex-wrap gap-2 mb-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-6 bg-gray-200 rounded-lg w-full mt-4"></div>
            </div>
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
              <div 
                key={project.slug} 
                className="group cursor-pointer transition-all duration-300 bg-white p-4 md:p-6 rounded-xl border border-gray-200"
                onClick={() => handleProjectClick(project.slug)}
              >

                {/* Image */}
                <div className="relative overflow-hidden rounded-xl mb-4 md:mb-6">
                  <div className="aspect-[16/9] bg-gray-100 border border-gray-200">
                    {project.images && project.images.length > 0 ? (
                      <img 
                        src={project.images[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <span className="text-white text-sm font-medium">View Project</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">{project.title}</h3>
                    <span className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">{project.category}</span>
                  </div>
                  
                  <p className="default-text text-gray-600 mb-4 md:mb-5 line-clamp-2">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
                    {project.techs.map((tech, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-2 rounded-lg text-xs"
                      >
                        {tech.icon}
                        <span className="default-label">{tech.name}</span>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 border-t border-gray-100 pt-4 mt-auto">
                    <span className="px-2 py-1 bg-gray-50 rounded-md">Commits: {stats.commitsCount}</span>
                    <span className="px-2 py-1 bg-gray-50 rounded-md">Contributors: {stats.contributorsCount}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    
      <ButtonLink link="/projects" text="View All Projects" className="mt-12" />
    </section>
  );
};

export default Portfolio;