import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    name: "Projeto A",
    description:
      "Uma aplicação web para gerenciamento de tarefas utilizando React e Firebase.",
    image: "/project-a.jpg",
    github: "https://github.com/yourusername/project-a",
    demo: "https://project-a-demo.com",
  },
  {
    name: "Projeto B",
    description:
      "Um site de e-commerce construído com Next.js e integrado com Stripe para pagamentos.",
    image: "/project-b.jpg",
    github: "https://github.com/yourusername/project-b",
    demo: "https://project-b-demo.com",
  },
];

export default function Projects() {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          Projetos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-[#1A1A1A] rounded-lg overflow-hidden relative"
            >
              <div className="absolute inset-0 border-2 border-[#8257E5] rounded-lg transform rotate-2 scale-[1.02] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <Image
                src={project.image}
                alt={project.name}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex justify-between">
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-400 hover:text-[#8257E5] transition-colors duration-200"
                  >
                    <FaGithub className="mr-2" />
                    GitHub
                  </Link>
                  <Link
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#8257E5] hover:text-[#9466FF] transition-colors duration-200"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Demo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
