"use client";

import {useMobile} from "@/hooks/use-mobile-timeline";
import {motion} from "framer-motion";

const experiences = [
  {
    title: "Full Stack Web Developer",
    company: "Falcon Global Services",
    period: "Sep 2025 – Present",
    description:
      "Owning end-to-end features across React/Next.js, Node.js, and SQL/Prisma. Integrations, testing, and deployments for internal tools and client sites.",
  },
  {
    title: "Mid-Level Full Stack Web Developer",
    company: "Falcon Global Services",
    period: "Mar 2025 – Aug 2025",
    description:
      "Promoted to mid-level full stack developer, taking on greater ownership of backend architecture, API design, and database schema work while still leading major React/Next.js feature development.",
  },
  {
    title: "Shopify Frontend → Junior Web Developer",
    company: "Falcon Global Services",
    period: "Apr 2024 – Feb 2025",
    description:
      "Started as Shopify Frontend (intern/probation). Regularized Oct 2024 and grew into a broader junior web dev role. Shipped themes/sections, UX improvements, and API consumption.",
  },
  {
    title: "B.S. Information Technology",
    company: "Central Luzon State University",
    period: "2019 – 2024",
    description:
      "Graduated 2024 with foundations in web development, databases, and software engineering.",
  },
];

export function Timeline() {
  const isMobile = useMobile();

  return (
    <div className="space-y-12 relative my-20 overflow-hidden">
      {/* Title + Description */}
      <div className="text-start">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          My Professional
          <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">Journey</span>
        </h2>
        <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
          A steady progression from Shopify Frontend in 2024 to Mid-Level Full
          Stack in 2025. I focus on building reliable, scalable features across
          the stack and continuously growing my impact on products and teams.
        </p>
      </div>

      {/* Timeline */}
      <div
        className={`space-y-12 relative ${
          !isMobile
            ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
            : ""
        }`}>
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`relative z-10 flex items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}>
            <motion.div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:pl-10" : "md:pr-10"
              }`}
              initial={{opacity: 0, x: index % 2 === 0 ? 50 : -50}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.5}}
              viewport={{once: true}}>
              <div className="relative overflow-hidden rounded-xl card shadow-md p-5 md:p-6 transition-all duration-300 hover:border-purple-500/50">
                <div className="absolute card rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

                <div className="relative">
                  <h3 className="text-lg md:text-xl text-gray-700 dark:text-white font-bold">
                    {experience.title}
                  </h3>
                  <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
                    {experience.company} | {experience.period}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {experience.description}
                  </p>
                </div>
              </div>
            </motion.div>

            {!isMobile && (
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <motion.div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center"
                  initial={{scale: 0}}
                  whileInView={{scale: 1}}
                  transition={{duration: 0.3}}
                  viewport={{once: true}}>
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
