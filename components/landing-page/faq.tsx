"use client";

import Link from "next/link";

export default function AboutMe() {
  return (
    <section id="about" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        {/* Heading */}
        <h2 className="text-black dark:text-white mb-4 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          About <span className="text-[#7A7FEE] dark:text-[#7A7FEE]">Me</span>
        </h2>

        {/* Lead */}
        <p className="mb-8 max-w-3xl text-gray-700 dark:text-gray-300">
          I’m <strong>Earl Balitcha</strong>, a{" "}
          <span className="text-[#7A7FEE] font-medium">
            Full Stack Web Developer
          </span>{" "}
          at Falcon Global Services in Tarlac. I specialize in building modern,
          responsive, and scalable web applications that blend performance with
          clean UX and accessibility.
        </p>

        {/* Content layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Professional snapshot */}
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-white p-5">
              <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                Professional Experience
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Currently, I design and develop property management platforms,
                e-commerce sites, and enterprise tools. My daily stack includes{" "}
                <strong>React.js, Next.js, Node.js, SQL, and Shopify</strong>,
                with a focus on seamless API integrations, responsive design,
                and accessibility standards.
              </p>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-white p-5">
              <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                Education
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Bachelor of Science in Information Technology (2019–2024) <br />
                <span className="text-sm">
                  Central Luzon State University, Nueva Ecija
                </span>
              </p>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-white p-5">
              <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                Approach & Soft Skills
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Known as a <strong>hardworking, quick learner</strong>, I thrive
                under pressure and adapt fast to new technologies. I value{" "}
                <strong>clean code, teamwork, and continuous learning</strong> —
                qualities that help me deliver projects efficiently and
                effectively.
              </p>
            </section>
          </div>

          {/* Right column: Quick highlights */}
          <aside className="space-y-6">
            <section className="rounded-xl border border-gray-200 dark:border-white p-5">
              <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                Tech Stack
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>React.js, Next.js, Vue.js</li>
                <li>Node.js, TypeScript, JavaScript</li>
                <li>SQL Server, Prisma, GraphQL, REST APIs</li>
                <li>Shopify Development & Integrations</li>
                <li>UI/UX Design with Figma</li>
              </ul>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-white p-5">
              <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                Certificates
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>AWS Practitioner (2022)</li>
                <li>NDG Linux Essentials (2022)</li>
              </ul>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-white p-5">
              <h3 className="text-black dark:text-white text-xl font-semibold mb-3">
                Contact
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong>{" "}
                <Link
                  href="mailto:earlbalitcha@gmail.com"
                  className="underline underline-offset-4 hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE]">
                  earlbalitcha@gmail.com
                </Link>
              </p>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
