// biz-web-app/components/Home/TrustedPartners.jsx

"use client";

import { trustedPartners } from "@/lib/data";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

function TrustedPartners() {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "-100%",
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <div className="w-full px-4 md:px-0 md:h-[60vh] my-10 py-10 h-[30vh]">
      <motion.h2 className="text-orange-500 font-bold text-center pb-2 max-w-7xl mx-auto text-xl sm:text-2xl md:text-4xl lg:text-5xl capitalize">
        Our Trusted Partners
      </motion.h2>
      <div className="overflow-hidden mt-8 py-10">
        <motion.div
          initial={{ x: "0%" }}
          animate={controls}
          className="flex items-center gap-16 sm:gap-24 md:gap-32 lg:gap-40 w-[200%]"
        >
          {[...trustedPartners, ...trustedPartners].map((partner, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={partner.src || "/placeholder.svg"}
                alt={partner.name || `Trusted Partner ${index + 1}`}
                width={144}
                height={144}
                className="w-16 sm:w-20 md:w-24 lg:w-32 h-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default TrustedPartners;
