"use client";

import Modal from "./Modal";
import useProjectModal from "../hooks/useProjectModal";

const ProjectModal = () => {
    const { isOpen, onClose, activeProject } = useProjectModal();

    const content = activeProject ? (
        <div className="flex flex-col gap-6">
            {/* Showcase Image */}
            {activeProject.imgShowcase && activeProject.imgShowcase.length > 0 ? (
                <div className="w-full rounded-lg overflow-hidden shadow-md">
                    <img 
                        src={activeProject.imgShowcase[0]} 
                        alt={`${activeProject.title} showcase`} 
                        className="w-full object-cover h-64"
                    />
                </div>
            ) : (
                // Fallback to project image if no showcase images
                <div className="w-full rounded-lg overflow-hidden shadow-md">
                    <img 
                        src={activeProject.image} 
                        alt={activeProject.title} 
                        className="w-full object-cover h-64"
                    />
                </div>
            )}

            {/* Description - Full Width */}
            <div className="w-full bg-gray-50 p-5 rounded-lg">
                <h4 className="text-lg font-medium mb-3 text-gray-800">Description</h4>
                <p className="text-gray-700 leading-relaxed">
                    {activeProject.description}
                </p>
            </div>

            {/* Technologies and URLs in same row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Technologies */}
                <div className="bg-gray-50 p-5 rounded-lg">
                    <h4 className="text-lg font-medium mb-3 text-gray-800">Technologies</h4>
                    <div className="flex flex-wrap gap-3">
                        {activeProject.technologies.map((tech, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm"
                            >
                                <span className="text-gray-700">{tech.icon}</span>
                                <span className="text-sm font-medium">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Project Links */}
                <div className="bg-gray-50 p-5 rounded-lg">
                    <h4 className="text-lg font-medium mb-3 text-gray-800">Project Links</h4>
                    <div className="space-y-3">
                        {activeProject.appUrl && (
                            <div className="overflow-hidden">
                                <h5 className="text-sm font-semibold mb-1">App URL:</h5>
                                <a 
                                    href={activeProject.appUrl}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 hover:underline"
                                >
                                    {activeProject.appUrl}
                                </a>
                            </div>
                        )}
                        

                        
                        {activeProject.videoUrl && (
                            <div className="overflow-hidden">
                                <h5 className="text-sm font-semibold mb-1">Video Demo:</h5>
                                <a 
                                    href={activeProject.videoUrl.replace('embed/', 'watch?v=')}
                                    target="_blank"
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 hover:underline"
                                >
                                    {activeProject.videoUrl}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="py-8 text-center text-gray-500">No project selected!</div>
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