"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProjectBySlug, Project } from '@/data/projects';
import { experiences, Experience } from '@/data/experience';
import { HiArrowLeft } from 'react-icons/hi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LinkButton = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link 
    href={href} 
    className={`underline text-gray-500 hover:text-gray-700 transition-colors ${className}`}
  >
    {children}
  </Link>
);

const TechBadge = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div className="
    inline-flex items-center gap-x-2 
    px-3 py-1.5 rounded-md
    bg-gray-50 hover:bg-gray-100
    text-gray-600 text-sm
    transition-colors
  ">
    <span className="text-gray-700">{icon}</span>
    <span className="font-medium">{name}</span>
  </div>
);

function ShowcasePage() {
  const searchParams = useSearchParams();
  const [item, setItem] = useState<Project | Experience | null>(null);
  const [isProject, setIsProject] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      // Try to find as project (by slug)
      const foundProject = getProjectBySlug(nameParam);
      if (foundProject) {
        setItem(foundProject);
        setIsProject(true);
      } else {
        // Try to find as experience (by title)
        const foundExperience = experiences.find(exp => encodeURIComponent(exp.title) === nameParam || exp.title === nameParam);
        if (foundExperience) {
          setItem(foundExperience);
          setIsProject(false);
        } else {
          setItem(null);
        }
      }
    } else {
      setItem(null);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
        <div className="w-full animate-pulse">
          <div className="h-8 bg-gray-100 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-100 rounded w-full mb-8"></div>
          <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6 mb-6"></div>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
        <div className="text-center py-16">
          <h1 className="default-subheading font-bold mb-4">Item Not Found</h1>
          <p className="default-text mb-8">The item you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <LinkButton href="/">Return Home</LinkButton>
        </div>
      </section>
    );
  }

  const backLinkText = isProject ? "Back to Projects" : "Back to Experiences";
  const backLinkHref = isProject ? "/#projects" : "/#experience";

  return (
    <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <Link 
        href={backLinkHref}
        className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8 group transition-colors"
      >
        <HiArrowLeft className="mr-2 text-sm" />
        {backLinkText}
      </Link>

      {/* Header and Description */}
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="default-subheading font-bold mb-5">{item.title}</h1>
        <p className="default-text text-gray-600">{item.description}</p>
      </div>

      {/* Image Showcase */}
      {item.images && item.images.length > 0 ? (
        <div className="w-full mb-8 rounded-lg overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              type: 'bullets',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            loop={true}
            className="rounded-lg"
          >
            {item.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative pb-[56.25%] h-0">
                  <img 
                    src={image} 
                    alt={`${item.title} screenshot ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation */}
            <div className="swiper-button-prev !text-white !bg-black/30 !w-10 !h-10 !rounded-full !left-4 after:!text-lg"></div>
            <div className="swiper-button-next !text-white !bg-black/30 !w-10 !h-10 !rounded-full !right-4 after:!text-lg"></div>
            
            {/* Standard Pagination */}
            <div className="swiper-pagination !bottom-4"></div>
          </Swiper>
        </div>
      ) : null}

      {/* Project Information */}
      <div className="mt-8 flex flex-col gap-8">
        {/* Overview */}
        <div>
          <h2 className="default-text font-semibold mb-3">Overview</h2>
          <p className="default-text text-gray-600 whitespace-pre-line">
            {item.overview}
          </p>
        </div>

        {/* Technologies  and External Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="default-text font-semibold mb-4">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {'techs' in item && Array.isArray(item.techs) && item.techs.map((tech: {name: string, icon: React.ReactNode}, index: number) => (
                <TechBadge key={index} name={tech.name} icon={tech.icon} />
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="default-text font-semibold mb-4">Links</h2>
            <div className="flex flex-col divide-y divide-gray-200">
              {'appUrl' in item && item.appUrl && (
                <a 
                  href={item.appUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="py-3 flex items-center justify-between group"
                >
                  <div>
                    <span className="block font-medium">Live Demo</span>
                    <span className="text-sm text-gray-500 truncate block max-w-xs">{item.appUrl}</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                </a>
              )}
              {/* Only show repo/video for projects */}
              {isProject && 'repositoryUrl' in item && item.repositoryUrl && (
                <a 
                  href={item.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="py-3 flex items-center justify-between group"
                >
                  <div>
                    <span className="block font-medium">Source Code</span>
                    <span className="text-sm text-gray-500 truncate block max-w-xs">{item.repositoryUrl}</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                </a>
              )}
              {isProject && 'videoUrl' in item && item.videoUrl && (
                <a 
                  href={item.videoUrl.replace('embed/', 'watch?v=')}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="py-3 flex items-center justify-between group"
                >
                  <div>
                    <span className="block font-medium">Video Demo</span>
                    <span className="text-sm text-gray-500 truncate block max-w-xs">{item.videoUrl}</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoadingFallback() {
  return (
    <section className="max-w-[1200px] w-full mx-auto px-3 py-16 max-lg:py-8">
      <div className="w-full animate-pulse">
        <div className="h-8 bg-gray-100 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-gray-100 rounded w-full mb-8"></div>
        <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-100 rounded w-5/6 mb-6"></div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ShowcasePage />
    </Suspense>
  );
}
