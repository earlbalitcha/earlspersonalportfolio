"use client";

import {useEffect, useRef, useState} from "react";
import {Code, Palette, Zap, Database, Globe, Smartphone} from "lucide-react";

const skills = [
  {name: "JavaScript", level: 95, category: "Frontend", icon: Code},
  {name: "TypeScript", level: 90, category: "Frontend", icon: Code},
  {name: "React.js", level: 95, category: "Frontend", icon: Code},
  {name: "Next.js", level: 90, category: "Frontend", icon: Globe},
  {name: "Node.js", level: 85, category: "Backend", icon: Zap},
  {name: "SQL Server", level: 80, category: "Backend", icon: Database},
  {name: "Vue.js", level: 80, category: "Frontend", icon: Code},
  {name: "Prisma ORM", level: 85, category: "Backend", icon: Database},
  {name: "Shopify", level: 85, category: "E-commerce", icon: Globe},
  {name: "Figma", level: 80, category: "Design", icon: Palette},
  {name: "GraphQL", level: 75, category: "Backend", icon: Zap},
  {name: "Mobile Dev", level: 70, category: "Mobile", icon: Smartphone},
];

export function AnimatedSkillsGrid() {
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !visibleIndexes.includes(index)) {
            setVisibleIndexes((prev) => [...prev, index]);
          }
        });
      },
      {threshold: 0.2}
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleIndexes]);

  return (
    <div className="my-12 space-y-12">
      <div className="text-start">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          My <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">Skills</span>
        </h2>
        <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
          A showcase of my technical and creative expertise. These are the tools
          and technologies I use to design, develop, and deliver high-quality
          digital experiences.
        </p>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const isVisible = visibleIndexes.includes(index);

          return (
            <div
              key={skill.name}
              data-index={index}
              ref={(el) => {
                skillRefs.current[index] = el;
              }}
              className={`group relative overflow-hidden rounded-xl card backdrop-blur-sm border border-border p-6 transition-all duration-700 hover:scale-105 hover:bg-card/80 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}>
              <div className="absolute inset-0 bg-[#343537s] backdrop-blur-md border border-white/20 shadow-xl group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-6 w-6 text-primary group-hover:text-[#7a7fee] transition-colors duration-300" />
                  <span className="text-xs text-black font-semibold dark:text-white bg-[#7a7fee] px-2 py-1 rounded-full">
                    {skill.category}
                  </span>
                </div>

                <h3 className="font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Proficiency</span>
                    <span className="text-primary font-medium">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#7780f0] to-[#e47c8f] rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
