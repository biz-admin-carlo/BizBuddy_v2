// biz-web-app/components/Home/KeyFeatures.jsx

"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { featureDetails } from "@/lib/data";

function KeyFeatures() {
  const [activeFeature, setActiveFeature] = useState("schedule");
  const activeDetail = featureDetails.find((f) => f.id === activeFeature);
  const images = ["/phone.png", "/tablet.png", "/tablet.png"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []); // Removed unnecessary dependency: images.length

  const imageVariants = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="w-full py-2 md:py-14 px-4 sm:px-6 lg:px-8 lg:py-28 lg:my-6 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <h2 className="text-center border-b border-gray-400 pb-2 max-w-7xl mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl capitalize ">
          Key Features
        </h2>
      </motion.div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center">
        <motion.div
          className="w-full lg:w-2/5 h-[30vh] sm:h-[40vh] lg:h-[60vh] relative overflow-hidden rounded-3xl"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`Feature Image ${currentImageIndex + 1}`}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
        </motion.div>
        <div className="w-full lg:w-3/5 flex flex-col items-start justify-center  ">
          <motion.div
            className="flex flex-wrap justify-center w-full gap-4 sm:gap-6 lg:gap-8 items-center p-2"
            variants={itemVariants}
          >
            {featureDetails.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex justify-center gap-2 sm:gap-3 items-center px-4 sm:px-6 py-2 border rounded-full transition-colors duration-300 ${
                    activeFeature === feature.id
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
                  <span className="text-sm sm:text-base lg:text-xl tracking-wide">
                    {feature.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              className="p-4 rounded-xl w-full mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm sm:text-base lg:text-2xl font-semibold">
                {activeDetail?.details}
              </p>
              {activeDetail?.moreDetails && (
                <motion.ul
                  className="mt-4 space-y-2 text-left text-xs sm:text-sm lg:text-xl"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {Object.values(activeDetail.moreDetails).map(
                    (detail, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start gap-2"
                        variants={itemVariants}
                      >
                        <Check
                          className="w-4 h-4 sm:w-5 sm:h-5 mt-1"
                          color="#f97316"
                        />
                        <span>{detail}</span>
                      </motion.li>
                    )
                  )}
                </motion.ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default KeyFeatures;
