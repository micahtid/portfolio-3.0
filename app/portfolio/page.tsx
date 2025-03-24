import React from 'react'
import Link from 'next/link'

// Mock project data
const projects = [
  {
    id: 1,
    title: "Amplifidor",
    description: "A social network platform for Influencers, agencies and brands to collaborate for business purposes.",
    image: "/placeholder.png",
    category: "Web Development",
    link: "#"
  },
  {
    id: 2,
    title: "Qatalog",
    description: "One search bar for businesses. Enterprise Search Software, AI powered workplace for large scale companies.",
    image: "/placeholder.png",
    category: "UI/UX Design",
    link: "#"
  },
  {
    id: 3,
    title: "Streamline",
    description: "Project management tool with AI-powered insights and team collaboration features.",
    image: "/placeholder.png",
    category: "Full Stack",
    link: "#"
  }
];

const Portfolio = () => {
  return (
    <section className="max-w-[1200px] w-full mx-auto px-6 max-lg:px-4 py-16 max-lg:py-8 space-y-16">
      <h2 className="default-subheading font-bold">Selected Projects</h2>
      
      <div className="space-y-12">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`w-full overflow-hidden bg-gray-200/60 p-8 pb-0 rounded-xl flex gap-x-12 max-lg:flex-col max-lg:gap-y-8 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:pr-0'}`}>
            
            <div className="flex flex-col flex-1 gap-y-2">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{project.category}</span>
              <h3 className="text-2xl font-bold text-gray-900 tracking-wide font-accent">{project.title}</h3>
              <p className="text-base text-gray-700 leading-relaxed">{project.description}</p>

              <Link 
                href={project.link}
                className="inline-block w-min text-nowrap 
                mt-2 px-6 py-2 
                border border-black rounded-full 
                hover:bg-black hover:text-white transition-colors"
              >
                View more
              </Link>
            </div>

            <img 
              className="h-full object-contain max-h-[250px] rounded-lg shadow-lg max-lg:self-end max-sm:self-center" 
              src={project.image} 
              alt={project.title} 
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio