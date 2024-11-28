import Link from "next/link";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
}

async function getGithubRepos() {
  const res = await fetch(
    "https://api.github.com/users/g-bolsoni/repos?sort=updated&per_page=6",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch repos");
  }

  return res.json();
}

export default async function GithubRepos() {
  const repos = await getGithubRepos();

  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          Projetos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo: GithubRepo) => (
            <div
              key={repo.id}
              className="bg-[#1A1A1A] rounded-lg p-6 hover:border-[#8257E5] border-2 border-transparent transition-all duration-200"
            >
              <h3 className="text-xl font-bold mb-2 text-white capitalize">
                {repo.name}
              </h3>
              <p className="text-gray-400 mb-4 h-20 overflow-hidden">
                {repo.description || "Sem descrição"}
              </p>
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
            </div>
          ))}
        </div>
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
