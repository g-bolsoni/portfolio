import About from "./components/about";
import Experience from "./components/experience";
import Projects from "./components/projects";
import Skills from "./components/skills";
import GithubRepos from "./components/github-repos";
import BlogPosts from "./components/blog-posts";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <header className="min-h-screen flex flex-col justify-center items-center p-4 text-center animate-fade-in relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-[300px] h-[600px] border-[#8257E5] border-2 rounded-l-[300px] opacity-20" />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 purple-glow">
          Desenvolvedor
          <span className="gradient-text"> Full Stack</span>
        </h1>
        <h2 className="text-2xl md:text-3xl mb-6 text-gray-400">
          Transformando ideias em código
        </h2>
        <p className="max-w-lg mb-8 text-xl text-gray-400">
          Especializado em criar experiências digitais modernas e de alta
          qualidade
        </p>
        <div className="flex space-x-6">
          <SocialLink
            href="https://linkedin.com/in/yourprofile"
            icon={<FaLinkedin />}
            label="LinkedIn"
          />
          <SocialLink
            href="https://github.com/yourusername"
            icon={<FaGithub />}
            label="GitHub"
          />
          <SocialLink
            href="https://twitter.com/yourhandle"
            icon={<FaTwitter />}
            label="Twitter"
          />
        </div>
        <button className="mt-8 px-8 py-3 bg-gradient-to-r from-[#8257E5] to-[#9466FF] rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
          Contato
        </button>
      </header>
      <About />
      <Experience />
      <Skills />
      <GithubRepos />
      <BlogPosts />
    </div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-[#8257E5] transition-colors duration-200"
      aria-label={label}
    >
      <span className="text-3xl">{icon}</span>
    </Link>
  );
}
