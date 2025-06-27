"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const translate = useTranslations("Experience");

  const experiences = [0, 1, 2, 3].map((index) => ({
    company: translate(`items.${index}.company`),
    position: translate(`items.${index}.position`),
    period: translate(`items.${index}.period`),
    description: translate(`items.${index}.description`),
    technologies: translate(`items.${index}.technologies`).split(","),
  }));

  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">{translate("title")}</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="md:w-1/3">
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
                className={`w-full text-left p-4 mb-2 rounded transition-colors duration-200 ${activeTab === index ? "bg-[#8257E5] text-white" : "bg-[#1A1A1A] text-gray-300 hover:bg-[#252525]"}`}
              >
                {exp.company}
              </motion.button>
            ))}
          </motion.div>
          <motion.div className="md:w-2/3 bg-[#1A1A1A] p-6 rounded-lg" initial="hidden" key={activeTab} whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
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
                <span key={index} className="bg-[#252525] text-[#8257E5] px-3 py-1 rounded-full text-sm cursor-default">
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
