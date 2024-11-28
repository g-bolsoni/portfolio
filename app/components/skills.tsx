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

const skills = [
  { name: "HTML5", icon: <FaHtml5 /> },
  { name: "CSS3", icon: <FaCss3Alt /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "PHP", icon: <FaPhp /> },
  { name: "React/Next.js", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "SQL", icon: <FaDatabase /> },
  { name: "MYSQL", icon: <GrMysql /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "GULP", icon: <FaGulp /> },
  { name: "DOCKER", icon: <FaDocker /> },
  { name: "SCSS", icon: <FaSass /> },
  { name: "AWS", icon: <FaAws /> },
];

export default function Skills() {
  return (
    <section className="py-16 bg-[#111111]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
          Habilidades
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
