"use client";

import Modal from "./Modal";
import useProjectModal from "../hooks/useModal";
import Link from "next/link";

const ProjectModal = () => {
    const { isOpen, onClose, activeProject } = useProjectModal();

    // Safely handle the case when activeProject is null
    const content = activeProject ? (
        <div className="flex flex-col gap-6">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                <img 
                    src={activeProject.image} 
                    alt={activeProject.title}
                    className="object-cover w-full h-full"
                />
            </div>
            
            <div className="space-y-4">
                <div>
                    <h4 className="text-lg font-medium mb-2">Overview</h4>
                    <p className="text-gray-700 leading-relaxed">
                        {activeProject.description}
                    </p>
                </div>
                
                <div className="pt-2">
                    <h4 className="text-lg font-medium mb-2">Key Features</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        <li>Responsive design for all devices</li>
                        <li>Modern user interface with intuitive navigation</li>
                        <li>Performance optimized for fast loading times</li>
                    </ul>
                </div>
            </div>
            
            <div className="flex justify-center pt-4">
                <Link 
                    href={activeProject.link} 
                    className="inline-block px-8 py-3 border border-black rounded-full hover:bg-black hover:text-white transition-colors"
                    target="_blank"
                >
                    View Project
                </Link>
            </div>
        </div>
    ) : (
        <div className="py-8 text-center text-gray-500">No project selected</div>
    );

    return (
        <Modal 
            title={activeProject ? activeProject.title : "Project Details"}
            isOpen={isOpen} 
            description={activeProject ? `${activeProject.category} Project` : ""}
            onChange={onClose}
        >  
            {content}
        </Modal>
    );
}

export default ProjectModal;