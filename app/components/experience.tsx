"use client";

import { motion } from "motion/react";
import { useState } from "react";

const experiences = [
  {
    company: "Irroba E-commerce",
    position: "Desenvolvedor Full Stack",
    period: "Jan 2022 - Presente",
    description:
      "Criação de layouts personalizados e otimização do desempenho de e-commerces. Garantia de websites rápidos, funcionais e visualmente atrativos.",
    technologies: [
      "PHP",
      "jQuery",
      "HTML",
      "SCSS",
      "React",
      "Next.js",
      "Tailwind",
    ],
  },
  {
    company: "Irroba E-commerce",
    position: "Estagiário",
    period: "Out 2020 - Dez 2021",
    description:
      "Personalização de lojas virtuais e suporte técnico para atender às demandas específicas dos clientes. Integração com plataformas como Google Analytics e Ads.",
    technologies: ["PHP", "jQuery", "HTML", "CSS"],
  },
  {
    company: "Uni-Facef",
    position: "Estagiário",
    period: "Set 2019 - Out 2020",
    description:
      "Manutenção de computadores, incluindo limpeza e troca de peças, para garantir o pleno funcionamento dos equipamentos. Suporte ao ambiente tecnológico acadêmico.",
    technologies: ["Hardware", "Manutenção de Sistemas"],
  },
  {
    company: "Uni-Facef Jr",
    position: "Consultor",
    period: "Jul 2019 - Jun 2020",
    description:
      "Desenvolvimento e manutenção de páginas estáticas para nossos clientes, com foco em funcionalidade e criação visual, melhorando a presença online.",
    technologies: ["HTML", "CSS", "JS"],
  },
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          Experiências
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="md:w-1/3"
          >
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                variants={{
                  hidden: { opacity: 0, y: -100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, delay: index / 10 },
                  },
                }}
                onClick={() => setActiveTab(index)}
                className={`w-full text-left p-4 mb-2 rounded transition-colors duration-200 ${
                  activeTab === index
                    ? "bg-[#8257E5] text-white"
                    : "bg-[#1A1A1A] text-gray-300 hover:bg-[#252525]"
                }`}
              >
                {exp.company}
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            className="md:w-2/3 bg-[#1A1A1A] p-6 rounded-lg"
            initial="hidden"
            key={activeTab}
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h3
              className="text-2xl font-bold mb-2 text-white"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0 },
                },
              }}
            >
              {experiences[activeTab].position}
            </motion.h3>
            <motion.p
              className="text-gray-400 mb-4"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.1 },
                },
              }}
            >
              {experiences[activeTab].period}
            </motion.p>
            <motion.p
              className="text-gray-300 mb-4"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2 },
                },
              }}
            >
              {experiences[activeTab].description}
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.2 },
                },
              }}
            >
              {experiences[activeTab].technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-[#252525] text-[#8257E5] px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
