"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const experienceData = [
  {
    role: "Java Full Stack Development Intern",
    company: "AISECT Ltd. (in collaboration with Capgemini)",
    duration: "Dec 2025 – Apr 2026",
    location: "Coimbatore, India",
    type: "Internship",
    stack: ["Spring Boot", "MongoDB", "React.js", "REST APIs", "Agile"],
    bullets: [
      "Developed 5+ secure REST APIs following microservices design principles using Spring Boot and MongoDB.",
      "Reduced backend response time by ~20% through query optimization and indexing strategies.",
      "Participated in full Agile sprint cycles — daily standups, sprint planning, and reviews.",
      "Integrated React.js frontend with Spring Boot backend services end-to-end."
    ]
  },
  {
    role: "Frontend Development Intern",
    company: "AICTE – Edunet Foundation (IBM)",
    duration: "Aug 2025 – Sep 2025",
    location: "Remote, India",
    type: "Internship",
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"],
    bullets: [
      "Built 8+ responsive UI components and pages using React.js, HTML, CSS, and JavaScript.",
      "Integrated frontend modules with backend REST APIs, ensuring consistent data flow.",
      "Followed Agile development practices and collaborative Git workflows across concurrent team tasks.",
      "Delivered production-ready responsive designs aligned with IBM/AICTE design standards."
    ]
  },
  {
    role: "Full Stack Development Intern",
    company: "Pinnacle Labs",
    duration: "Jun 2025 – Jul 2025",
    location: "Remote, India",
    type: "Internship",
    stack: ["Java", "Spring Boot", "Git"],
    bullets: [
      "Developed backend logic for 3+ application modules in Java, independently learning new design patterns.",
      "Identified and resolved 10+ functional and performance bottlenecks during testing cycles.",
      "Supported testing, documentation, and release activities following structured workflows."
    ]
  }
];

const educationData = [
  {
    degree: "B.E. in Computer Science & Engineering",
    school: "EASA College of Engineering & Technology",
    duration: "2022 – 2026",
    location: "Coimbatore, India",
    score: "8.1 CGPA",
    details: "Focus on Core Computer Science, Software Engineering, and Full Stack Development. Served as Department Secretary (led 10+ technical events for 150+ students)."
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 pt-24 pb-24 text-white"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Experience & Education
        </h1>
        <p className="text-white/55 max-w-xl mx-auto text-sm md:text-base">
          My professional milestones and academic background.
        </p>
      </motion.div>

      {/* GRID */}
      <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
        {/* WORK EXPERIENCE */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Briefcase size={18} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Work Experience</h2>
          </div>

          <div className="space-y-6">
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: smoothEase }}
                viewport={{ once: true }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-xl"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-white/70 font-semibold">{exp.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[11px] font-medium">
                    {exp.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {exp.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {exp.location}
                  </div>
                </div>

                <ul className="space-y-2 mb-5 text-sm text-white/60 list-disc pl-4">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {exp.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* EDUCATION */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Education</h2>
          </div>

          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: smoothEase }}
                viewport={{ once: true }}
                className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-xl"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-blue-400 transition">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-white/70 font-semibold">{edu.school}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[11px] text-blue-300 font-semibold">
                    {edu.score}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {edu.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {edu.location}
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
