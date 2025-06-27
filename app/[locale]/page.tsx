import { useTranslations } from "next-intl";
import About from "@/app/components/about";
import Experience from "@/app/components/experience";
import Skills from "@/app/components/skills";
import GithubRepos from "@/app/components/github-repos";
import { Analytics } from "@vercel/analytics/next";

export const dynamic = 'force-static';

export default function Home() {
  const translate = useTranslations("Home");

  return (
    <div className="min-h-screen bg-[#111111] px-4">
      <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-[300px] h-[600px] border-[#8257E5] border-2 rounded-l-[300px] opacity-20" />
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 purple-glow">
          {translate.rich("h1", {
            span: (chunks) => <span className="gradient-text">{chunks}</span>,
          })}
        </h1>
        <h2 className="text-2xl md:text-3xl mb-6 text-gray-400">{translate("h2")}</h2>
        <p className="max-w-lg mb-8 text-xl text-gray-400">{translate("p")}</p>
        <a href="https://wa.me/5516993658338?text=Ol%C3%A1!%20Vi%20seu%20portf%C3%B3lio%20e%20gostei%20bastante.%20Gostaria%20de%20conversar%20sobre%20oportunidades%20ou%20projetos.%20Podemos%20bater%20um%20papo%3F" target="_blank" className="mt-8 px-8 py-3 bg-gradient-to-r from-[#8257E5] to-[#9466FF] rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
          {translate("a")}
        </a>
      </div>
      <About />
      <Experience />
      <Skills />
      <GithubRepos />
      <Analytics />
    </div>
  );
}
