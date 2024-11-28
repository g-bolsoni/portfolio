import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-square flex justify-center items-center">
              <Image
                src="/image.webp" // Replace with your illustration
                alt="Developer Illustration"
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-[#8257E5] text-xl mb-4">Quem sou</h2>
            <h3 className="text-4xl font-bold text-white mb-4">
              Giovane Bolsoni
            </h3>
            <h4 className="text-xl text-gray-400 mb-6">Full Stack Developer</h4>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Meu nome é Giovane Bolsoni, um entusiasta da tecnologia e do
              desenvolvimento web. Estou interessado em desenvolver soluções
              inovadoras e eficazes que tornam a experiência do usuário mais
              intuitiva e eficaz. Estou sempre em busca de conhecimento e
              desafios que me permitam evoluir como desenvolvedor e contribuir
              de maneira relevante.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <SocialLink
                href="https://www.instagram.com/giovane_bolsoni"
                icon={<FaInstagram />}
              />
              <SocialLink
                href="https://linkedin.com/in/giovane-bolsoni"
                icon={<FaLinkedin />}
              />
              <SocialLink
                href="https://github.com/g-bolsoni"
                icon={<FaGithub />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 flex items-center justify-center rounded-lg border border-[#8257E5]/50 text-[#8257E5] hover:bg-[#8257E5] hover:text-white transition-all duration-300"
    >
      <span className="text-xl">{icon}</span>
    </Link>
  );
}
