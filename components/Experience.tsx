"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { experiences } from '@/data/experience';
import type { Experience } from '@/data/experience';
import ListSection from './ListSection';
import ListItemCard from './ListItemCard';



const Experience = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const handleExperienceClick = (exp: Experience) => {
    router.push(`/showcase?name=${encodeURIComponent(exp.title)}`);
  };

  return (
    <ListSection
      title="Featured Experience"
      items={experiences}
      loading={loading}
      renderItem={(experience) => (
        <ListItemCard
          key={experience.title}
          title={experience.title}
          description={experience.description}
          onViewClick={() => handleExperienceClick(experience)}
          showGithubStats={false}
          timeframe={experience.timeframe}
        />
      )}
    />
  );
};

export default Experience;