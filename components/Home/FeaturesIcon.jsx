// biz-web-app/components/Home/FeaturesIcon.jsx

"use client";

import { features } from "@/lib/data";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function FeaturesIcon() {
  return (
    <>
      <div className="w-full overflow-x-auto px-4 md:py-20 py-8 text-gray-50 scrollbar-hide md:mt-32 mt-10">
        <motion.div
          className="flex flex-nowrap md:flex-wrap justify-start md:justify-center items-center gap-6 md:gap-12 lg:gap-20 pb-4 md:pb-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.5 }}
              className="flex-shrink-0 w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 p-4 rounded-3xl bg-gradient-to-r from-orange-400 to-red-600 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 transition-colors duration-300" />
              </motion.div>
              <motion.p
                className="mt-3 text-xs md:text-sm lg:text-base font-medium text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {feature.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
