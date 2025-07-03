import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Lead Developer",
    bio: "Full-stack wizard with 10+ years of experience building scalable applications.",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    color: "from-purple-600 to-blue-600"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    bio: "Creative designer passionate about crafting beautiful and intuitive user experiences.",
    skills: ["Figma", "Framer", "Design Systems", "User Research"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    color: "from-pink-600 to-purple-600"
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Backend Architect",
    bio: "System architect specializing in distributed systems and cloud infrastructure.",
    skills: ["Python", "Docker", "Kubernetes", "MongoDB"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    color: "from-green-600 to-teal-600"
  },
  {
    id: 4,
    name: "Emily Zhang",
    role: "Product Manager",
    bio: "Strategic thinker who bridges the gap between technology and business goals.",
    skills: ["Agile", "Strategy", "Analytics", "Leadership"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    color: "from-orange-600 to-red-600"
  },
  {
    id: 5,
    name: "David Kim",
    role: "DevOps Engineer",
    bio: "Infrastructure expert ensuring smooth deployments and optimal performance.",
    skills: ["CI/CD", "AWS", "Terraform", "Monitoring"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    color: "from-blue-600 to-cyan-600"
  }
];

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-[320px] sm:w-[360px] lg:w-[380px] h-[520px] sm:h-[560px] lg:h-[580px] mx-4 sm:mx-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="relative w-full h-full group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Glass morphism card */}
        <div className="absolute inset-0 bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl rounded-3xl border border-primary/20 dark:border-secondary-600/30 shadow-xl overflow-hidden hover:border-primary/30 transition-colors duration-300 flex flex-col">
          {/* Subtle gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Profile Image */}
          <div className="relative h-44 sm:h-48 lg:h-52 overflow-hidden rounded-t-3xl flex-shrink-0">
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Minimal overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative p-4 sm:p-5 lg:p-6 flex flex-col flex-grow min-h-0">
            <motion.div
              className="text-center mb-3 sm:mb-4 flex-shrink-0"
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg sm:text-xl font-bold text-secondary dark:text-white mb-2">
                {member.name}
              </h3>
              
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${member.color} text-white shadow-sm`}>
                {member.role}
              </div>
            </motion.div>
            
            <div className="flex-grow min-h-0 mb-3 sm:mb-4">
              <motion.p 
                className="text-secondary/70 dark:text-secondary-200 text-sm leading-relaxed text-center h-full overflow-y-auto"
                animate={{ opacity: isHovered ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {member.bio}
              </motion.p>
            </div>

            {/* Skills */}
            <motion.div 
              className="flex flex-wrap gap-1.5 sm:gap-2 justify-center flex-shrink-0 max-h-20 overflow-y-auto"
              animate={{ y: isHovered ? -4 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {member.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary/5 dark:bg-secondary-700/80 text-secondary/80 dark:text-secondary-300 rounded-full text-xs font-medium backdrop-blur-sm border border-secondary/20 dark:border-secondary-600/50 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "rgba(216, 151, 60, 0.1)",
                    borderColor: "rgba(216, 151, 60, 0.2)"
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Subtle floating indicator */}
          <motion.div
            className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const HorizontalScrollAbout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const xSpring = useSpring(x, { stiffness: 100, damping: 30 });

  // Background parallax
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgXSpring = useSpring(bgX, { stiffness: 50, damping: 20 });

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-gray-50 dark:bg-secondary-800 py-20">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ x: bgXSpring }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Header */}
      <div className="container mx-auto px-4 mb-16">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-secondary dark:text-white mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Talented individuals working together to create exceptional digital experiences.
            Scroll to explore our amazing team members.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <motion.div 
          className="flex"
          style={{ x: xSpring }}
        >
          {/* Spacer */}
          <div className="w-[100px] flex-shrink-0" />
          
          {/* Team Member Cards */}
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id} member={member} index={index} />
          ))}
          
          {/* End Message */}
          <motion.div 
            className="flex-shrink-0 w-[320px] sm:w-[360px] lg:w-[380px] h-[520px] sm:h-[560px] lg:h-[580px] mx-4 sm:mx-6 flex items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/80 dark:bg-secondary-800/80 backdrop-blur-xl rounded-3xl border border-primary/20 dark:border-secondary-600/30 shadow-xl p-6 sm:p-8 text-center h-full flex flex-col justify-center">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-3">
                Join Our Team!
              </h3>
              <p className="text-secondary/70 dark:text-secondary-200 text-sm leading-relaxed">
                We're always looking for talented individuals to join our journey.
              </p>
              <motion.button
                className="mt-4 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white text-sm font-medium rounded-full hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
          
          {/* Spacer */}
          <div className="w-[100px] flex-shrink-0" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
          <span className="text-sm font-medium">Scroll to explore</span>
        </div>
      </motion.div>
    </div>
  );
};

export default HorizontalScrollAbout;