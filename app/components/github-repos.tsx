"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { getRepositories } from "../api/github";
import { useEffect, useState } from "react";

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}

export default function GithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  useEffect(() => {
    async function getRepos() {
      const repositories = await getRepositories();
      setRepos(repositories);
    }
    getRepos();
  }, []);

  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          Projetos
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {repos.map((repo: GithubRepo, index) => (
            <motion.div
              key={repo.id}
              className="bg-[#1A1A1A] rounded-lg p-6 hover:border-[#8257E5] border-2 border-transparent transition-all duration-200 flex justify-between flex-col"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: index / 10 },
                },
              }}
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-white capitalize">
                  {repo.name}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {repo.description || "Sem descrição"}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <span className="flex items-center text-gray-400">
                    <FaStar className="mr-1 text-[#8257E5]" />
                    {repo.stargazers_count}
                  </span>
                  {/* <span className="flex items-center text-gray-400">
                    <FaCodeBranch className="mr-1 text-[#8257E5]" />
                    {repo.forks_count}
                  </span> */}
                </div>
                <Link
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-[#8257E5] hover:text-[#9466FF] transition-colors duration-200"
                >
                  <FaGithub className="mr-2" />
                  Ver Repo
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-8">
          <Link
            href="https://github.com/g-bolsoni?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#8257E5] text-white px-6 py-2 rounded hover:bg-[#9466FF] transition-colors duration-200"
          >
            Ver todos os repositórios
          </Link>
        </div>
      </div>
    </section>
  );
}
