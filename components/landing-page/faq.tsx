"use client";

import {useState} from "react";
import {ChevronDown} from "lucide-react";

const aboutItems = [
  {
    id: 1,
    question: "Overview",
    answer: (
      <p>
        I’m <strong>Earl Balitcha</strong>, a passionate full-stack web
        developer based in <strong>Tarlac City, Philippines</strong>. I build
        modern, responsive websites and applications with a focus on clean UX,
        accessibility, and performance.
      </p>
    ),
  },
  {
    id: 2,
    question: "Tech stack I use",
    answer: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Frontend: React.js, Next.js</li>
        <li>Backend: Node.js</li>
        <li>Data: SQL Server</li>
        <li>Commerce & UI: Shopify (and custom React integrations)</li>
        <li>
          Tooling: modern JS/TS workflows and component-driven development
        </li>
      </ul>
    ),
  },
  {
    id: 3,
    question: "Current role",
    answer: (
      <p>
        I’m currently with <strong>Falcon Global Services Group</strong>,
        working across Shopify and React on the frontend, and Node.js with SQL
        Server on the backend—shipping accessible, user-friendly experiences end
        to end.
      </p>
    ),
  },
  {
    id: 4,
    question: "Education & early journey",
    answer: (
      <p>
        I studied <strong>Information Technology (2019–2024)</strong> at{" "}
        <strong>Central Luzon State University</strong>. I started as a network
        engineering intern, then transitioned to full-stack development.
      </p>
    ),
  },
  {
    id: 5,
    question: "Location & availability",
    answer: (
      <p>
        <strong>Location:</strong> Tarlac City, Philippines <br />
        <strong>Availability:</strong> Open to opportunities
      </p>
    ),
  },
  {
    id: 6,
    question: "Contact",
    answer: (
      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:earlbalitcha@gmail.com"
          className="underline underline-offset-4">
          earlbalitcha@gmail.com
        </a>
      </p>
    ),
  },
];

export default function AboutMe() {
  const [openItem, setOpenItem] = useState<number | null>(1); // default open "Overview"

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section id="about" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black flex dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          About{" "}
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE] ml-2">
            Me
          </span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Full-stack developer crafting modern, responsive web apps with React,
          Next.js, Node.js, and SQL Server.
        </p>

        <div className="space-y-4">
          {aboutItems.map((item) => (
            <div
              key={item.id}
              className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(item.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === item.id}
                aria-controls={`about-answer-${item.id}`}>
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openItem === item.id ? "rotate-180 text-[#7A7FEE]" : ""
                  }`}
                />
              </button>
              {openItem === item.id && (
                <div
                  id={`about-answer-${item.id}`}
                  className="mt-2 text-gray-700 dark:text-gray-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
