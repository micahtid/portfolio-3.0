import { create } from 'zustand';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
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