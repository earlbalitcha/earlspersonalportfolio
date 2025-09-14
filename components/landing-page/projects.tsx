"use client";

import {useState, useEffect, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import ProjectPopup from "../portfolio/project-popup";
import {fetchPortfolioData, type PortfolioItem} from "@/utils/csv-parser";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState<number | null>(0); // default expand first on desktop

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchPortfolioData();
        // show up to 6 items
        setProjects(data.slice(0, 6));
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProjects();
  }, []);

  const openProjectPopup = (project: PortfolioItem) =>
    setSelectedProject(project);
  const closeProjectPopup = () => setSelectedProject(null);

  const baseCardStyle = useMemo(
    () => ({
      transition: "flex-grow 500ms cubic-bezier(0.05, 0.61, 0.41, 0.95)",
      minWidth: 160, // wider collapsed
    }),
    []
  );

  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Featured
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">
          Projectshehe
        </span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        A showcase of my recent projects, highlighting creative solutions,
        technical expertise, and a passion for building impactful digital
        experiences.
      </p>

      {/* Mobile: stacked list */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {isLoading
          ? Array.from({length: 6}).map((_, index) => (
              <div
                key={`skeleton-m-${index}`}
                className="card overflow-hidden shadow-lg animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            ))
          : projects.map((project) => (
              <button
                key={project.slug}
                className="text-left card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => openProjectPopup(project)}>
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      project.mainImage ||
                      "/placeholder.svg?height=600&width=800&query=project"
                    }
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1 mb-4">
                    {project.shortDescription}
                  </p>
                  {/* Show tags on mobile under description */}
                  {Array.isArray(project.categories) &&
                    project.categories.length > 0 && (
                      <div className="mt-2 mb-3 flex flex-wrap gap-2">
                        {project.categories.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white/90">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  <span className="inline-flex items-center text-[#7A7FEE] text-sm font-medium group">
                    Visit site
                    <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            ))}
      </div>

      {/* Desktop: CLICK accordion (no hover expand) */}
      <div className="hidden md:flex md:h-[22rem] gap-4">
        {isLoading
          ? Array.from({length: 6}).map((_, i) => (
              <div
                key={`skeleton-d-${i}`}
                className="card overflow-hidden shadow-lg rounded-2xl animate-pulse"
                style={{...baseCardStyle, flexGrow: 1}}>
                <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))
          : projects.map((project, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={project.slug}
                  role="button"
                  tabIndex={0}
                  className="relative card overflow-hidden shadow-lg rounded-2xl cursor-pointer group"
                  style={{
                    ...baseCardStyle,
                    flexGrow: isActive ? 12 : 3, // wider inactive
                    maxWidth: isActive ? "100%" : 420,
                  }}
                  onClick={() => {
                    // first click expands, second click opens
                    if (isActive) {
                      openProjectPopup(project);
                    } else {
                      setActiveIdx(idx);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      if (isActive) openProjectPopup(project);
                      else setActiveIdx(idx);
                    }
                  }}>
                  <div className="relative h-full w-full">
                    <Image
                      src={
                        project.mainImage ||
                        "/placeholder.svg?height=600&width=800&query=project"
                      }
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className={[
                        "object-cover transition-[transform,opacity] duration-500",
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-110 opacity-90",
                      ].join(" ")}
                    />

                    {/* Content overlay: only visible when active to avoid squished text */}
                    <div
                      className={[
                        "absolute inset-x-0 bottom-0",
                        "bg-black/50 backdrop-blur-sm",
                        "p-4 md:p-6 text-white",
                        "transition-all duration-300",
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none",
                      ].join(" ")}>
                      <h3
                        className={[
                          "font-semibold",
                          isActive ? "text-2xl md:text-3xl" : "text-lg",
                          "transition-all",
                        ].join(" ")}>
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm md:text-base">
                        {project.shortDescription}
                      </p>

                      {/* TAGS: only when active */}
                      {isActive &&
                        Array.isArray(project.categories) &&
                        project.categories.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.categories.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800 shadow">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* CTA: goes to projectUrl; stop propagation so it doesn't collapse/expand */}
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-[#7A7FEE] text-sm font-medium underline-offset-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}>
                        Visit site <ArrowUpRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>

                    {/* Collapsed badge: clean title without squishing */}
                    {!isActive && (
                      <div className="absolute left-3 bottom-3">
                        <span className="inline-flex items-center max-w-[11rem] truncate rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/portfolio" className="btn-primary">
          View All Projects
        </Link>
      </div>

      {/* Project Popup */}
      <ProjectPopup project={selectedProject} onClose={closeProjectPopup} />
    </section>
  );
}
