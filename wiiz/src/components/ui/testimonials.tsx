import { TestimonialsColumn } from "./testimonials-columns-1";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Cette équipe a transformé notre vision en réalité digitale. Leur expertise technique et leur créativité ont dépassé toutes nos attentes.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b526?w=400&h=400&fit=crop&crop=face",
    name: "Marie Dubois",
    role: "Directrice Marketing",
  },
  {
    text: "Un travail exceptionnel ! L'application développée a révolutionné notre processus interne. Communication fluide et résultats impressionnants.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    name: "Pierre Martin",
    role: "CEO",
  },
  {
    text: "Wiiz Dev a créé une plateforme web moderne et intuitive qui a considérablement amélioré l'expérience de nos clients. Bravo !",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    name: "Sophie Laurent",
    role: "Chef de Projet",
  },
  {
    text: "L'équipe est professionnelle, réactive et créative. Ils ont su comprendre nos besoins et livrer une solution parfaitement adaptée.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    name: "Thomas Bernard",
    role: "Directeur Technique",
  },
  {
    text: "Collaboration excellente du début à la fin. Le site web développé reflète parfaitement l'identité de notre marque. Très satisfaits !",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    name: "Camille Rousseau",
    role: "Responsable Communication",
  },
  {
    text: "Innovation, qualité et respect des délais. Wiiz Dev a su créer une application mobile qui dépasse nos espérances. Recommandé à 100% !",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    name: "Antoine Moreau",
    role: "Fondateur",
  },
  {
    text: "Une équipe talentueuse qui maîtrise les dernières technologies. Notre e-commerce a vu ses conversions augmenter de 150% !",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    name: "Élise Girard",
    role: "E-commerce Manager",
  },
  {
    text: "Wiiz Dev a digitalisé notre entreprise avec brio. L'interface utilisateur est intuitive et les performances sont excellentes.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
    name: "Julien Petit",
    role: "Directeur Opérationnel",
  },
  {
    text: "Résultats exceptionnels ! L'équipe a su allier design moderne et fonctionnalités avancées. Notre ROI a été multiplié par 3.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    name: "Amélie Leroy",
    role: "Directrice Générale",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="bg-gray-50 dark:bg-secondary-900 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container z-10 mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-16"
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Témoignages
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-secondary dark:text-white mb-6">
            Ce que disent nos
            <span className="block text-primary">clients</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Découvrez les retours de nos clients satisfaits qui nous font confiance.
          </p>
        </motion.div>

        <motion.div 
          className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;