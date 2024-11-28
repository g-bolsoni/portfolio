"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center gap-12 bg-[#151515] border-2 border-[#1f1f1f] rounded h-max p-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Left side - Image */}
          <motion.div
            className="w-full md:w-max"
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, delay: 0.1 },
              },
            }}
          >
            <div className="relative w-full aspect-square flex justify-center items-center md:h-[500px]">
              <Image
                src="/image.webp"
                alt="Developer Illustration"
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </motion.div>

          {/* Right side - Content */}
          <div className="w-full md:w-full">
            <motion.h2
              className="text-[#8257E5] text-xl mb-4"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0 },
                },
              }}
            >
              Quem sou
            </motion.h2>
            <motion.h3
              className="text-4xl font-bold text-white mb-4"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.1 },
                },
              }}
            >
              Giovane Bolsoni
            </motion.h3>

            <motion.h4
              className="text-xl text-gray-400 mb-6"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2 },
                },
              }}
            >
              Full Stack Developer
            </motion.h4>

            <motion.p
              className="text-gray-400 mb-8 leading-relaxed"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.3 },
                },
              }}
            >
              Meu nome é Giovane Bolsoni, um entusiasta da tecnologia e do
              desenvolvimento web. Estou interessado em desenvolver soluções
              inovadoras e eficazes que tornam a experiência do usuário mais
              intuitiva e eficaz. Estou sempre em busca de conhecimento e
              desafios que me permitam evoluir como desenvolvedor e contribuir
              de maneira relevante.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex flex-wrap gap-4"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.4 },
                },
              }}
            >
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
            </motion.div>
          </div>
        </motion.div>
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
