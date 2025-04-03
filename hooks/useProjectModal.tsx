import { create } from 'zustand';
import { ReactNode } from 'react';

interface Technology {
  name: string;
  icon: ReactNode;
}

interface Project {
  id: number;
  title: string;
  description: string;
  overview: string;
  image: string;
  category: string;
  link: string;
  videoUrl?: string;              // Optional YouTube video URL
  appUrl?: string;                // Optional application URL
  repositoryUrl?: string;         // Optional repository URL
  imgShowcase?: string[];         // Optional array of showcase images
  commitsCount?: number;          // GitHub stats
  contributorsCount?: number;     // GitHub stats
  createdAt?: string;             // Project creation date
  technologies: Technology[];
}

interface ProjectModalStore {
  isOpen: boolean;
  activeProject: Project | null;
  onOpen: (project: Project) => void;
  onClose: () => void;
}

const useProjectModal = create<ProjectModalStore>((set) => ({
  isOpen: false,
  activeProject: null,
  onOpen: (project) => set({ isOpen: true, activeProject: project }),
  onClose: () => set({ isOpen: false }),
}));

export default useProjectModal;