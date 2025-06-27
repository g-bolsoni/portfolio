"use client";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaGulp,
  FaDocker,
  FaPhp,
  FaSass,
  FaAws,
} from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import { SiMongodb } from "react-icons/si";
import { useTranslations } from "next-intl";

export default function Skills() {
  const translate = useTranslations("Skills");

  const skills = [
    { name: translate("items.0"), icon: <FaHtml5 /> },
    { name: translate("items.1"), icon: <FaCss3Alt /> },
    { name: translate("items.2"), icon: <FaJs /> },
    { name: translate("items.3"), icon: <FaPhp /> },
    { name: translate("items.4"), icon: <FaReact /> },
    { name: translate("items.5"), icon: <FaNodeJs /> },
    { name: translate("items.6"), icon: <FaDatabase /> },
    { name: translate("items.7"), icon: <GrMysql /> },
    { name: translate("items.8"), icon: <SiMongodb /> },
    { name: translate("items.9"), icon: <FaGulp /> },
    { name: translate("items.10"), icon: <FaDocker /> },
    { name: translate("items.11"), icon: <FaSass /> },
    { name: translate("items.12"), icon: <FaAws /> },
  ];

  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          {translate("title")}
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: index / 10 },
                },
              }}
              className="bg-[#1A1A1A] p-6 rounded-lg group hover:border-[#8257E5] border-2 border-transparent transition-colors duration-200 flex flex-col items-center justify-center"
            >
              <span className="text-5xl text-[#8257E5] mb-4 group-hover:scale-110 transition-transform duration-200">
                {skill.icon}
              </span>
              <h3 className="text-xl font-bold text-white">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
