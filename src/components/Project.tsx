import React, { useEffect, useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FaGithub } from "react-icons/fa";
import projectIcon from '../assets/logos/project.svg';
import { BackgroundGradient } from './ui/background-gradient';

const WorkTimeline = () => {
  const { data } = usePortfolio();
  const [projectsByCategory, setProjectsByCategory] = useState<{
    [key: string]: Array<{
      imagePath: string;
      title: string;
      date: string;
      description: string[];
      url: string;
      githubURL?: string;
      tags: string[];
      category: string;
    }>;
  }>({});

  useEffect(() => {
    // Import all images from the projects directory
    const images = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,svg}', { eager: true });

    // Map over projects and replace image paths with actual imports
    const projectsWithImages = data.projects.project.map(project => {
      const imageName = project.imagePath.split('/').pop();
      const imagePath = imageName ? Object.entries(images).find(([path]) => path.includes(imageName)) : undefined;

      return {
        ...project,
        imagePath: imagePath ? (imagePath[1] as { default: string }).default : project.imagePath
      };
    });

    // Group projects by category and sort by date within each category
    const groupedProjects = projectsWithImages.reduce((acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = [];
      }
      acc[project.category].push(project);
      return acc;
    }, {} as { [key: string]: typeof projectsWithImages }); // Initialize as an empty object

    // Sort projects within each category by date (newest first)
    Object.keys(groupedProjects).forEach(category => {
      groupedProjects[category].sort((a, b) => {
        const dateA = parseInt(a.date);
        const dateB = parseInt(b.date);
        return dateB - dateA;
      });
    });

    setProjectsByCategory(groupedProjects);
  }, [data]); // Re-run effect when data changes

                    // sub-component that renders individual project cards
                    // Takes a project object as a prop and renders the project details
  const ProjectCard = ({ project }: { project: typeof projectsByCategory[keyof typeof projectsByCategory][0] }) => (
    <div className="flex items-center justify-center lg:min-h-[32.5rem] h-max sm:w-96 w-[80vw] md:mb-4">
      <BackgroundGradient className="p-4 mx-auto rounded-[22px] bg-white dark:bg-zinc-900">
        <div className="flex justify-center">
          <img src={project.imagePath} alt={project.title} className="w-64 h-40 object-cover rounded-lg" />
        </div>
        <h3 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-2 sm:py-2">{project.title} ({project.date})</h3>
        <p className="text-lg">{project.description}</p>
        <br></br>
        <button className="px-8 py-1 border-x-slate-200 border-2 bg-white dark:bg-black relative group transition duration-200 text-black dark:text-white hover:bg-transparent hover:bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-lg">
            View project
          </a>
        </button>
        <div className="flex flex-wrap gap-2 mt-4 justify-between items-center">
          {project.githubURL && (
            <a href={project.githubURL} target="_blank" rel="noopener noreferrer" className="text-lg underline">
              <FaGithub className="w-8 h-8" />
            </a>
          )}
          <div className={`flex gap-2 ${project.githubURL ? '' : 'ml-auto'}`}>
            {project.tags.map((tag, index) => (
              <img key={index} src={`/logo/${tag}.png`} alt={tag} className="w-8 h-8" />
            ))}
          </div>
        </div>
      </BackgroundGradient>
    </div>
  );

  return (
    <section id="projects" className="mb-20">
      <div className="flex items-center space-x-4 mb-8 mx-8">
        <img src={projectIcon} alt="Project icon" className="w-16 h-16" />
        <h2 className="text-4xl font-bold">Projects</h2>
      </div>

      {/* Map over the grouped projects and render each category with its projects */}
      {Object.entries(projectsByCategory).map(([category, projects]) => (
        <div key={category} className="md:mb-16 md:px-4 ">
          <h3 className="text-3xl font-semibold mx-8 mb-8 md:mt-6">{category}</h3>
          <div className="flex flex-wrap items-start justify-start p-4 md:mt-4 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default WorkTimeline;