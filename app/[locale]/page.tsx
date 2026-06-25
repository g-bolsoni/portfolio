import { useTranslations } from "next-intl";
import About from "@/app/components/about";
import Experience from "@/app/components/experience";
import Skills from "@/app/components/skills";
import GithubRepos from "@/app/components/github-repos";
import { Analytics } from "@vercel/analytics/next";
import ParticlesBackground from "../components/ParticlesBackground";
import RotatingText from "@/app/components/RotatingText";

export default function Home() {
  const translate = useTranslations("Home");

  return (
    <main className="min-h-screen relative bg-[#111111] px-4">
      <ParticlesBackground />
      <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 purple-glow">
          {translate.rich("title", {
            span: (chunks) => <span className="gradient-text">{chunks}</span>,
          })}
        </h1>
        <h2 className="text-gray-400 text-2xl md:text-3xl mb-4">
          {translate("subTitle")}
        </h2>
        <RotatingText />
        <a
          href="https://wa.me/5516993658338?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20gostei%20bastante.%20Gostaria%20de%20conversar%20sobre%20oportunidades%20ou%20projetos.%20Podemos%20bater%20um%20papo%3F"
          target="_blank"
          className="relative overflow-hidden mt-8 px-8 py-3 bg-gradient-to-r from-[#8257E5] to-[#9466FF] rounded-lg text-white font-medium hover:opacity-90 hover:scale-105 transition-all duration-150 group"
        >
          <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-[-20deg]" />
          {translate("textContactButton")}
        </a>
      </div>

      <About />
      <Experience />
      <Skills />
      <GithubRepos />
      <Analytics />
    </main>
  );
}